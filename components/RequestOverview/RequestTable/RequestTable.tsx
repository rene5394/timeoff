import * as React from 'react';
import { findAllUsersEmployees, findAllUsersEmployeesByTeam, findUsers } from '../../../lib/api/team/user';
import { createBalance, findOneBalanceByUserId, updateBalance } from '../../../lib/api/timeoff/balance';
import { findAllActiveTeams } from '../../../lib/api/team/team';
import { IBalance } from '../../../lib/domain/timeoff/IBalance';
import { IUser } from '../../../lib/domain/team/IUser';
import { ITeam } from '../../../lib/domain/team/ITeam';
import { Team } from '../../../common/enums/team.enum';
import { SearchForm } from '../SearchForm';
import { EditBalanceModal } from '../../Modals/EditBalanceModal';
import { SuccessModalTextProps } from '../../Modals/SucessModal';
import { ErrorModalTextProps } from '../../Modals/ErrorModal';
import { AdvancedPagination } from '../../Commons/AdvancedPagination';
import Moment from 'moment';
import { IRequest } from '../../../lib/domain/timeoff/IRequest';
import { IType } from '../../../lib/domain/timeoff/IType';
import { findAllRequests } from '../../../lib/api/timeoff/request';
import { findAllRequestStatuses } from '../../../lib/api/timeoff/requestStatus';
import { IRequestStatus } from '../../../lib/domain/timeoff/IRequestStatus';
import { findAllTypes } from '../../../lib/api/timeoff/type';
import { RequestType } from '../../../common/enums/request-type.enum';
import { daysBetweenDates, daysBetweenDatesNoWeekends } from '../../../common/utils/timeValidation';

interface IRequestData extends IRequest {
  name?: string;
  status?: string;
  type?: string;
  duration?: number;
};

export interface Balance {
  id?: number;
  userId?: number;
  compDays?: string;
  vacationDays?: string;
}

interface RequestTableProps {
  openSuccessModal: (textProps: SuccessModalTextProps) => void;
  openErrorModal: (textProps: ErrorModalTextProps) => void;
}

export const RequestTable: React.FC<RequestTableProps> = ({ openSuccessModal, openErrorModal }) => {
  const [requestsData, setRequestsData] = React.useState<any[]>();
  const [numberOfPages, setNumberOfPages] = React.useState<number>(1);
  const [activePage, setActivePage] = React.useState<number>(1);
  const [teams, setTeams] = React.useState<ITeam[]>();
  const [teamSelected, setTeamSelected] = React.useState<number>(0);
  const [requestStatuses, setRequestStatuses] = React.useState<IRequestStatus[]>();
  const [requestTypes, setRequestTypes] = React.useState<IType[]>();
  const [searchText, setSearchText] = React.useState<string>('');
  const [editBalanceModalVisibility, setEditBalanceModalVisibility] = React.useState<boolean>(false);
  const [balance, setBalance] = React.useState<Balance>();

  React.useEffect(() => {
    fillUserData(1);
  }, [teamSelected, searchText])

  const fillUserData = async(page: number = 1) => {
    let requests: IRequest[];
    let users: IUser[];
    let pages: number;
    const userIds: any = [];
    const objs: IRequestData[] = [];

    const teams = await findAllActiveTeams();
    setTeams(teams);

    const requestTypes = await findAllTypes();
    setRequestTypes(requestTypes);

    const requestStatuses = await findAllRequestStatuses();
    setRequestStatuses(requestStatuses);

    if (teamSelected === Team.allTeams) {
      const requestsData = await findAllRequests(page);
      requests = requestsData.list;
      console.log('count requests', requestsData.count, requestsData.count / 10);
      
      pages = Math.ceil(requestsData.count / 10);

      requests.map((request: IRequest) => userIds.push(request.userId));
      const userData = await findUsers(userIds);
      
      users = userData.list;
    } else {
      const data = await findAllUsersEmployeesByTeam(teamSelected, searchText, page);
      users = data.list;

      const requestsData = await findAllRequests(page);
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

  const openEditBalanceModal = (userId: number, balance: IBalance) => {
    setBalance({
      id: balance?.id,
      userId: userId,
      compDays: (balance?.compDays) ? balance.compDays.toString() : '0',
      vacationDays: (balance?.vacationDays) ? balance.vacationDays.toString() : '0'
    });

    setEditBalanceModalVisibility(true);
  }

  const closeEditBalanceModal = () => {
    setEditBalanceModalVisibility(false);
  }

  const editBalance = async(userId: number) => {
    const balance = await findOneBalanceByUserId(userId);
    openEditBalanceModal(userId, balance);
  }

  const createNewBalance = async(form: any) => {
    form.preventDefault();
    const result = await createBalance(form);
    
    if (result.status === 201) {
      fillUserData(activePage);
      closeEditBalanceModal();
      openSuccessModal({
        title: 'Success',
        body: 'Balance created successfully'
      });
    } if (result.status === 400) {
      const messages = result.data.message;
      openErrorModal({
        title: 'Error',
        body: messages
      });
    }
  }
  
  const updateCurrentBalance = async(form: any) => {
    form.preventDefault();
    const result = await updateBalance(form);

    if (result.status === 200) {
      fillUserData(activePage);
      closeEditBalanceModal();
      openSuccessModal({
        title: 'Success',
        body: 'Balance updated successfully'
      });
    } if (result.status === 400) {
      const messages = result.data.message;
      openErrorModal({
        title: 'Error',
        body: messages
      });
    }
  }

  return(
    <>
      <SearchForm teams={teams} setTeams={setTeams} changeTeam={changeTeam} changeText={changeText} />
      <div className="row px-5 pt-4">
        <table className="table align-middle mb-4 bg-white">
          <thead className="bg-light">
            <tr>
              <th>Employee</th>
              <th>Type</th>
              <th>Start Date</th>
              <th>End Date</th>
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
                    <button onClick={() => editBalance(requestData.id)} type="button" className="btn text-success btn-link btn-sm btn-rounded">
                    <i className="bi bi-check"></i>Approve
                    </button>
                    <button onClick={() => editBalance(requestData.id)} type="button" className="btn text-danger btn-link btn-sm btn-rounded">
                    <i className="bi bi-x"></i>Cancel
                    </button>
                  </td>
                </tr>
              )}
          </tbody>
        </table>
        <AdvancedPagination activePage={activePage} numberOfPages={numberOfPages} changePage={changePage} />
        <EditBalanceModal
          balance = {balance}
          setBalance = {setBalance}
          visibility = {editBalanceModalVisibility}
          closeModal = {closeEditBalanceModal}
          createNewBalance = {createNewBalance}
          updateCurrentBalance = {updateCurrentBalance}
        />
      </div>
    </>
  );
}