import * as React from 'react';
import { findAllUsersEmployees, findAllUsersEmployeesByTeam, findUsers } from '../../../../lib/api/team/user';
import { findAllActiveTeams } from '../../../../lib/api/team/team';
import { IUser } from '../../../../lib/domain/team/IUser';
import { ITeam } from '../../../../lib/domain/team/ITeam';
import { Team } from '../../../../common/enums/team.enum';
import { SearchForm } from '../SearchForm';
import { SuccessModalTextProps } from '../../../Modals/SucessModal';
import { ErrorModalTextProps } from '../../../Modals/ErrorModal';
import { AdvancedPagination } from '../../../Commons/AdvancedPagination';
import { IRequest } from '../../../../lib/domain/timeoff/IRequest';
import { findAllRequests, findAllRequestsByUsers } from '../../../../lib/api/timeoff/request';
import { findAllRequestStatuses } from '../../../../lib/api/timeoff/requestStatus';
import { findAllTypes } from '../../../../lib/api/timeoff/type';
import { RequestType } from '../../../../common/enums/request-type.enum';
import { daysBetweenDates, daysBetweenDatesNoWeekends } from '../../../../common/utils/timeValidation';
import { ApproveRequestModal } from '../../../Modals/ApproveRequestModal';
import { CancelRequestModal } from '../../../Modals/CancelRequestModal';
import Moment from 'moment';

export interface IRequestData extends IRequest {
  name?: string;
  status?: string;
  type?: string;
  duration?: number;
};

interface RequestTableProps {
  openSuccessModal: (textProps: SuccessModalTextProps) => void;
  openErrorModal: (textProps: ErrorModalTextProps) => void;
}

export const RequestTable: React.FC<RequestTableProps> = ({ openSuccessModal, openErrorModal }) => {
  const [requestData, setRequestData] = React.useState<any>();
  const [requestsData, setRequestsData] = React.useState<any[]>();
  const [numberOfPages, setNumberOfPages] = React.useState<number>(1);
  const [activePage, setActivePage] = React.useState<number>(1);
  const [teams, setTeams] = React.useState<ITeam[]>();
  const [teamSelected, setTeamSelected] = React.useState<number>(0);
  const [searchText, setSearchText] = React.useState<string>('');
  const [startDate, setStartDate] = React.useState<string>('');
  const [endDate, setEndDate] = React.useState<string>('');
  const [approveRequestModalVisibility, setApproveRequestModalVisibility] = React.useState<boolean>(false);
  const [cancelRequestModalVisibility, setCancelRequestModalVisibility] = React.useState<boolean>(false);

  React.useEffect(() => {
    fillUserData(1);
  }, [teamSelected, searchText, startDate, endDate])

  const fillUserData = async(page: number = 1) => {
    let requests: IRequest[];
    let users: IUser[];
    let pages: number;
    const userIds: any = [];
    const objs: IRequestData[] = [];

    const teams = await findAllActiveTeams();
    setTeams(teams);

    const requestTypes = await findAllTypes();
    const requestStatuses = await findAllRequestStatuses();

    if (teamSelected === Team.allTeams && searchText === '') {
      const requestsData = await findAllRequests(page, '', startDate, endDate);
      requests = requestsData.list;
      requests.map((request: IRequest) => userIds.push(request.userId));
      pages = Math.ceil(requestsData.count / 10);
      
      const userData = await findUsers(userIds);
      users = userData.list;
    } else if (teamSelected === Team.allTeams && searchText !== '') {
      const data = await findAllUsersEmployees(searchText);
      users = data.list;
      users.map((user: IUser) => userIds.push(user.id));

      if (users.length > 0) {
        const requestsData = await findAllRequestsByUsers(userIds);
        requests = requestsData.list;
        pages = Math.ceil(requestsData.count / 10);
      } else {
        requests = [];
        pages = 1;
      }
    } else {
      const data = await findAllUsersEmployeesByTeam(teamSelected, searchText);
      users = data.list;
      users.map((user: IUser) => userIds.push(user.id));

      const requestsData = await findAllRequestsByUsers(userIds);
      requests = requestsData.list;
      pages = Math.ceil(requestsData.count / 10);
    }

    requests.map((request: IRequest) => {
      const obj: IRequestData = { ...request };
      const user = users.find((user) => user.id === request.userId);
      obj.name = (user) ? `${user.firstname} ${user.secondname} ${user.lastname}` : '';
      const status = requestStatuses.find((requestStatus) => requestStatus.id === request.statusId);
      obj.status = (status) ? status.name : '';
      const type = requestTypes.find((requestType) => requestType.id === request.typeId);
      obj.type = (type) ? type.name : '';
      const dates = (request.typeId === RequestType.compDay) ?
      daysBetweenDatesNoWeekends(request.startDate, request.endDate) :
      daysBetweenDates(request.startDate, request.endDate);
      obj.duration = dates.length;

      objs.push(obj);
    });
    
    setRequestsData(objs);
    setNumberOfPages(pages);
  };

  const changePage = (page: number) => {
    setActivePage(page);
    fillUserData(page);
  }

  const changeTeam = (e: any) => {
    const teamId = (e.target.value !== '') ? parseInt(e.target.value) : 0;
    setTeamSelected(teamId);
    setActivePage(1);
  }

  const changeText = (e: any) => {
    const text = e.target.value;
    setSearchText(text);
    setActivePage(1);
  }

  const changeDate = (e: any) => {
    const inputId = e.target.id;
    if (inputId === 'startDate') {
      setStartDate(e.target.value);  

      if (e.target.value > endDate && endDate !== '') {
        openErrorModal({
          title: 'Error',
          body: ['Start date can\'t be lower than start date']
        });
      }
    } if (inputId === 'endDate') {
      setEndDate(e.target.value);

      if (e.target.value < startDate) {
        openErrorModal({
          title: 'Error',
          body: ['End date can\'t be lower than start date']
        });
      }
    }
  }

  const openApproveRequestModal = (requestData: IRequestData) => {
    setRequestData(requestData);
    setApproveRequestModalVisibility(true);
  }

  const openCancelRequestModal = (requestData: IRequestData) => {
    setRequestData(requestData);
    setCancelRequestModalVisibility(true);
  }

  const closeApproveRequestModal = () => {
    setApproveRequestModalVisibility(false);
  }

  const closeCancelRequestModal = () => {
    setCancelRequestModalVisibility(false);
  }

  return(
    <>
      <SearchForm
        teams={teams}
        setTeams={setTeams}
        changeTeam={changeTeam}
        changeText={changeText}
        changeDate={changeDate}
      />
      <div className="row px-5 pt-4">
        <table className="table align-middle mb-4 bg-white">
          <thead className="bg-light">
            <tr>
              <th>Employee</th>
              <th>Type</th>
              <th>Start date</th>
              <th>End date</th>
              <th>Duration</th>
              <th>Submit date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { requestsData?.map((requestData) => 
                <tr key={requestData.id.toString()}>
                  <td>{requestData.name}</td>
                  <td>{requestData.type.toString()}</td>
                  <td>{Moment(requestData.startDate).format('MM-DD-YYYY')}</td>
                  <td>{Moment(requestData.endDate).format('MM-DD-YYYY')}</td>
                  <td>{requestData.duration.toString()}</td>
                  <td>{Moment(requestData.createdAt).format('MM-DD-YYYY')}</td>
                  <td>{requestData.status.toString()}</td>
                  <td>
                    <button onClick={() => openApproveRequestModal(requestData)} type="button" className="btn text-success btn-link btn-sm btn-rounded">
                    <i className="bi bi-check"></i>Approve
                    </button>
                    <button onClick={() => openCancelRequestModal(requestData)} type="button" className="btn text-danger btn-link btn-sm btn-rounded">
                    <i className="bi bi-x"></i>Cancel
                    </button>
                  </td>
                </tr>
              )}
          </tbody>
        </table>
        <AdvancedPagination activePage={activePage} numberOfPages={numberOfPages} changePage={changePage} />
        <ApproveRequestModal
          requestData =  {requestData}
          visibility = {approveRequestModalVisibility}
          closeModal = {closeApproveRequestModal}
        />
        <CancelRequestModal
          requestData =  {requestData}
          visibility = {cancelRequestModalVisibility}
          closeModal = {closeCancelRequestModal}
        />
      </div>
    </>
  );
}