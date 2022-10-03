import * as React from 'react';
import { findAllTeamUsersEmployeesByJWT } from '../../../lib/api/team/user';
import { createBalance, findBalances, findOneBalanceByUserId, updateBalance } from '../../../lib/api/timeoff/balance';
import { findOneTeamByUserJWT } from '../../../lib/api/team/team';
import { findEmployees } from '../../../lib/api/team/employee';
import { findMembers } from '../../../lib/api/team/member';
import { IBalance } from '../../../lib/domain/timeoff/IBalance';
import { IUser } from '../../../lib/domain/team/IUser';
import { IEmployee } from '../../../lib/domain/team/IEmployee';
import { ITeam } from '../../../lib/domain/team/ITeam';
import { SearchForm } from '../SearchForm';
import { EditBalanceModal } from '../../Modals/EditBalanceModal';
import { SuccessModalTextProps } from '../../Modals/SucessModal';
import { ErrorModalTextProps } from '../../Modals/ErrorModal';
import { AdvancedPagination } from '../../Commons/AdvancedPagination';
import Moment from 'moment';

interface IUserData extends IUser {
  compDays?: number;
  vacationDays?: number;
  teamName?: string;
};

export interface Balance {
  id?: number;
  userId?: number;
  compDays?: string;
  vacationDays?: string;
}

interface TeamTableProps {
  openSuccessModal: (textProps: SuccessModalTextProps) => void;
  openErrorModal: (textProps: ErrorModalTextProps) => void;
}

export const TeamTable: React.FC<TeamTableProps> = ({ openSuccessModal, openErrorModal }) => {
  const [usersData, setUsersData] = React.useState<any[]>();
  const [numberOfPages, setNumberOfPages] = React.useState<number>(1);
  const [activePage, setActivePage] = React.useState<number>(1);
  const [team, setTeam] = React.useState<ITeam>();
  const [searchText, setSearchText] = React.useState<string>('');
  const [editBalanceModalVisibility, setEditBalanceModalVisibility] = React.useState<boolean>(false);
  const [balance, setBalance] = React.useState<Balance>();

  React.useEffect(() => {
    fillUserData(1);
  }, [searchText])

  const fillUserData = async(page: number = 1) => {
    let users: IUser[];
    let pages: number;
    const userIds: any = [];
    const employeesIds: any = [];
    const objs: IUserData[] = [];

    const team = await findOneTeamByUserJWT();
    setTeam(team);

    const data = await findAllTeamUsersEmployeesByJWT(searchText, page);
    
    users = data.list;
    pages = Math.ceil(data.count/10);

    users.map((user: IUser) => userIds.push(user.id));
    const balances = await findBalances(userIds);
    const employees = await findEmployees(userIds);
    
    employees.map((employee) => employeesIds.push(employee.id));
    const members = await findMembers(employeesIds);

    users.map((user: IUser) => {
      const obj: IUserData = { ...user };

      balances.map((balance: IBalance) => {
        if (user.id === balance.userId) {
          obj.compDays = balance.compDays;
          obj.vacationDays = balance.vacationDays;
        }
      });

      objs.push(obj);
    });
    
    setUsersData(objs);
    setNumberOfPages(pages);
  };

  const changePage = (page: number) => {
    setActivePage(page);
    fillUserData(page);
  }

  const changeText = (e: any) => {
    const text = e.target.value;
    setSearchText(text);
    setActivePage(1);
  }

  const closeEditBalanceModal = () => {
    setEditBalanceModalVisibility(false);
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
      <SearchForm changeText={changeText} />
      <div className="row px-5 pt-4">
        <table className="table align-middle mb-4 bg-white">
          <thead className="bg-light">
            <tr>
              <th>Employee</th>
              <th>Comp days</th>
              <th>Vacations</th>
              <th>Hire date</th>
            </tr>
          </thead>
          <tbody>
            { usersData?.map((userData) => 
                <tr key={userData.id.toString()}>
                  <td>
                    <div className="d-flex align-items-center">
                      <img
                          src="https://mdbootstrap.com/img/new/avatars/8.jpg"
                          alt=""
                          className="rounded-circle avatar-table"
                          />
                      <div className="ms-3">
                        <p className="fw-bold mb-1">{userData.firstname} {userData.secondname} {userData.lastname}</p>
                        <p className="text-muted mb-0">{userData.email}</p>
                      </div>
                    </div>
                  </td>
                  <td>{userData.compDays?.toString()}</td>
                  <td>{userData.vacationDays?.toString()}</td>
                  <td>{Moment(userData.hiredate).format('MM-DD-YYYY')}</td>
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