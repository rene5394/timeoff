import * as React from 'react';
import { findAllUsersEmployees, findAllUsersEmployeesByTeam, findOneUserByJWT, findUsers } from '../../../../lib/api/team/user';
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
import { daysBetweenDates, daysBetweenDatesNoWeekends, getFirstDayOfMonth, getLastDayOfMonth } from '../../../../common/utils/timeValidation';
import { ApproveRequestModal } from '../../../Modals/ApproveRequestModal';
import { DenyRequestModal } from '../../../Modals/DenyRequestModal';
import { createTransaction } from '../../../../lib/api/timeoff/transaction';
import { TransactionStatus } from '../../../../common/enums/transaction-status.enum';
import { findAllTransactionStatuses } from '../../../../lib/api/timeoff/transactionStatus';
import { RequestStatus } from '../../../../common/enums/request-status.enum';
import { CancelRequestModal } from '../../../Modals/CancelRequestModal';
import { ITransactionStatus } from '../../../../lib/domain/timeoff/ITransactionStatus';
import { formatInTimeZone } from 'date-fns-tz';

export interface IRequestData extends IRequest {
  name?: string;
  status?: string;
  type?: string;
  duration?: number;
  lastTransaction?: string;
  lastTransactionId?: number;
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
  const [startDate, setStartDate] = React.useState<string>(getFirstDayOfMonth());
  const [endDate, setEndDate] = React.useState<string>(getLastDayOfMonth());
  const [approveRequestModalVisibility, setApproveRequestModalVisibility] = React.useState<boolean>(false);
  const [denyRequestModalVisibility, setDenyRequestModalVisibility] = React.useState<boolean>(false);
  const [cancelRequestModalVisibility, setCancelRequestModalVisibility] = React.useState<boolean>(false);
  const [transactionStatuses, setTransactionStatuses] = React.useState<ITransactionStatus[]>();
  const [transactionStatusSelected, setTransactionStatusSelected] = React.useState<number>(0);
  const [hr, setHr] = React.useState<number>();

  React.useEffect(() => {
    fillUserData(1);
  }, [teamSelected, transactionStatusSelected, searchText, startDate, endDate])

  React.useEffect(() => {
    const getUserRoleId = async() => {
      const user = await findOneUserByJWT();
      setHr(user.hr);
    }
    getUserRoleId();
  }, [])

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
    const transactionStatuses = await findAllTransactionStatuses();

    setTransactionStatuses(transactionStatuses);

    const transactionKeys = Object.values(TransactionStatus);
    let transactionStatus = '';

    Object.values(TransactionStatus).forEach(key => {
      if (key === transactionStatusSelected) {
        transactionStatus = transactionKeys[key].toString();
      }
    });

    if (teamSelected === Team.allTeams && searchText === '') {
      const requestsData = await findAllRequests(page, '', transactionStatus, startDate, endDate);
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
        const requestsData = await findAllRequestsByUsers(page, userIds, '', transactionStatus, startDate, endDate);
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

      const requestsData = await findAllRequestsByUsers(page, userIds, '', transactionStatus, startDate, endDate);
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

      const transactions = request.transactions;
      const numberOfTransactions = transactions.length;
      const transactionStatus = transactionStatuses.find(transactionStatus =>
        transactionStatus.id === transactions[numberOfTransactions - 1].transactionStatusId);

      obj.lastTransactionId = transactionStatus?.id;
      obj.lastTransaction = transactionStatus?.name;

      if (transactionStatusSelected !== TransactionStatus.allTransactionStatuses) {
        if (transactionStatusSelected === obj.lastTransactionId) {
          objs.push(obj);
        }
      } else {
        objs.push(obj);
      }
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

  const changeTransactionStatus = (e: any) => {
    const transactionStatusId = (e.target.value !== '') ? parseInt(e.target.value) : 0;
    setTransactionStatusSelected(transactionStatusId);
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

  const openDenyRequestModal = (requestData: IRequestData) => {
    setRequestData(requestData);
    setDenyRequestModalVisibility(true);
  }

  const openCancelRequestModal = (requestData: IRequestData) => {
    setRequestData(requestData);
    setCancelRequestModalVisibility(true);
  }

  const closeApproveRequestModal = () => {
    setApproveRequestModalVisibility(false);
  }

  const closeDenyRequestModal = () => {
    setDenyRequestModalVisibility(false);
  }

  const closeCancelRequestModal = () => {
    setCancelRequestModalVisibility(false);
  }

  const approveRequest = async(form: any) => {
    form.preventDefault();
    const result = await createTransaction(form);

    if (result.status === 201) {
      fillUserData(activePage);
      closeApproveRequestModal();
      openSuccessModal({
        title: 'Success',
        body: 'Request approved successfully'
      });
    } if (result.status === 400) {
      const messages = result.data.message;
      openErrorModal({
        title: 'Error',
        body: messages
      });
    }
  }

  const denyRequest = async(form: any) => {
    form.preventDefault();
    const result = await createTransaction(form);

    if (result.status === 201) {
      fillUserData(activePage);
      closeDenyRequestModal();
      openSuccessModal({
        title: 'Success',
        body: 'Request denied successfully'
      });
    } if (result.status === 400) {
      const messages = result.data.message;
      openErrorModal({
        title: 'Error',
        body: messages
      });
    }
  }

  const cancelRequest = async(form: any) => {
    form.preventDefault();
    const result = await createTransaction(form);

    if (result.status === 201) {
      fillUserData(activePage);
      closeCancelRequestModal();
      openSuccessModal({
        title: 'Success',
        body: 'Request cancelled successfully'
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
      <SearchForm
        startDate={startDate}
        endDate={endDate}
        teams={teams}
        transactionStatuses={transactionStatuses}
        setTeams={setTeams}
        setTransactionStatuses={setTransactionStatuses}
        changeTransactionStatus={changeTransactionStatus}
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
              {(hr === 1) &&
                <th>Actions</th>
              }
            </tr>
          </thead>
          <tbody>
            { requestsData?.map((requestData) => 
                <tr key={requestData.id.toString()}>
                  <td>{requestData.name}</td>
                  <td>{requestData.type.toString()}</td>
                  <td>{formatInTimeZone(new Date(requestData.startDate), 'America/El_Salvador', 'd MMMM yyyy')}</td>
                  <td>{formatInTimeZone(new Date(requestData.endDate), 'America/El_Salvador', 'd MMMM yyyy')}</td>
                  <td>{requestData.duration.toString()}</td>
                  <td>{formatInTimeZone(new Date(requestData.createdAt), 'America/El_Salvador', 'd MMMM yyyy')}</td>
                  <td>
                    {requestData.statusId === RequestStatus.approved &&
                      <button className="btn btn-success">{requestData.lastTransaction}</button>
                    } {requestData.statusId === RequestStatus.pending &&
                      <button className="btn btn-warning">{requestData.lastTransaction}</button>
                    } {(requestData.statusId === RequestStatus.denied || requestData.statusId === RequestStatus.cancelled) &&
                      <button className="btn btn-danger">{requestData.lastTransaction}</button>
                    }
                  </td>
                  {(hr === 1) &&
                    <td>
                    {(requestData.coachApproval === 1 && requestData.hrApproval === 0
                    && requestData.lastTransactionId !== TransactionStatus.deniedByHR) &&
                      <>
                        <button onClick={() => openApproveRequestModal(requestData)} type="button" className="btn text-success btn-link btn-sm btn-rounded">
                        <i className="bi bi-check"></i>Approve
                        </button>
                        <button onClick={() => openDenyRequestModal(requestData)} type="button" className="btn text-danger btn-link btn-sm btn-rounded">
                        <i className="bi bi-x"></i>Deny
                        </button>
                      </>
                    }
                    {(requestData.hrApproval === 1 && (requestData.lastTransactionId !== TransactionStatus.cancelledByBP
                    && requestData.lastTransactionId !== TransactionStatus.cancelledByHR)) && 
                      <button onClick={() => openCancelRequestModal(requestData)} type="button" className="btn text-danger btn-link btn-sm btn-rounded">
                      <i className="bi bi-x"></i>Cancel
                      </button>
                    }
                    </td>
                  }
                </tr>
              )}
          </tbody>
        </table>
        <AdvancedPagination activePage={activePage} numberOfPages={numberOfPages} changePage={changePage} />
        <ApproveRequestModal
          requestData =  {requestData}
          visibility = {approveRequestModalVisibility}
          transactionStatus = {TransactionStatus.approvedByHR}
          approveRequest = {approveRequest}
          closeModal = {closeApproveRequestModal}
        />
        <DenyRequestModal
          requestData =  {requestData}
          visibility = {denyRequestModalVisibility}
          transactionStatus = {TransactionStatus.deniedByHR}
          denyRequest = {denyRequest}
          closeModal = {closeDenyRequestModal}
        />
        <CancelRequestModal
          requestData =  {requestData}
          visibility = {cancelRequestModalVisibility}
          transactionStatus = {TransactionStatus.cancelledByHR}
          cancelRequest = {cancelRequest}
          closeModal = {closeCancelRequestModal}
        />
      </div>
    </>
  );
}