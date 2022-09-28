import * as React from 'react';
import { findAllUsersEmployees, findAllUsersEmployeesByTeam } from '../../../lib/api/team/user';
import { findBalances, findOneBalanceByUserId } from '../../../lib/api/timeoff/balance';
import { findAllActiveTeams } from '../../../lib/api/team/team';
import { findEmployees } from '../../../lib/api/team/employee';
import { findMembers } from '../../../lib/api/team/member';
import { SearchForm } from '../SearchForm';
import { IBalance } from '../../../lib/domain/timeoff/IBalance';
import { IUser } from '../../../lib/domain/team/IUser';
import { IEmployee } from '../../../lib/domain/team/IEmployee';
import { ITeam } from '../../../lib/domain/team/ITeam';
import { Team } from '../../../common/enums/team.enum';
import AdvancedPagination from '../../Commons/AdvancedPagination';
import Moment from 'moment';

interface StaffTableProperties {
  openEditBalanceModal: (userId: number, balance: IBalance) => void;
}

interface IUserData extends IUser {
  compDays?: number;
  vacationDays?: number;
  teamName?: string;
};

export const StaffTable: React.FC<StaffTableProperties> = ({ openEditBalanceModal }) => {
  const [usersData, setUsersData] = React.useState<any[]>();
  const [numberOfPages, setNumberOfPages] = React.useState<number>(1);
  const [activePage, setActivePage] = React.useState<number>(1);
  const [teams, setTeams] = React.useState<ITeam[]>();
  const [teamSelected, setTeamSelected] = React.useState<number>(0);
  const [searchText, setSearchText] = React.useState<string>('');

  React.useEffect(() => {
    fillUserData(1);
  }, [teamSelected, searchText])

  const fillUserData = async(page: number = 1) => {
    let users: IUser[];
    let pages: number;
    const userIds: any = [];
    const employeesIds: any = [];
    const objs: IUserData[] = [];

    const teams = await findAllActiveTeams();
    setTeams(teams);

    if (teamSelected === Team.allTeams) {
      const data = await findAllUsersEmployees(searchText, page);
      users = data.list;
      pages = Math.ceil(data.count/10);
    } else {
      const data = await findAllUsersEmployeesByTeam(teamSelected, searchText, page);
      users = data.list;
      pages = Math.ceil(data.count/10);
    }

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

      employees.map((employee: IEmployee) => {
        if (user.id === employee.user_id) {
          members.map((member) => {
            if (member.employee_id === employee.id) {                
              const team = teams.find(team => team.id === member.team_id);
              obj.teamName = (team) ? team.name : '';
            }
          });
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

  const editBalance = async(userId: number) => {
    const balance = await findOneBalanceByUserId(userId);
    openEditBalanceModal(userId, balance);
  }

  return(
    <>
      <SearchForm teams={teams} setTeams={setTeams} changeTeam={changeTeam} changeText={changeText} />
      <div className="row px-5 pt-4">
        <table className="table align-middle mb-4 bg-white">
          <thead className="bg-light">
            <tr>
              <th>Employee</th>
              <th>Team</th>
              <th>Comp days</th>
              <th>Vacations</th>
              <th>Hire date</th>
              <th>Actions</th>
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
                  <td>{userData.teamName}</td>
                  <td>{userData.compDays?.toString()}</td>
                  <td>{userData.vacationDays?.toString()}</td>
                  <td>{Moment(userData.hiredate).format('MM-DD-YYYY')}</td>
                  <td>
                    <button onClick={() => editBalance(userData.id)} type="button" className="btn btn-link btn-sm btn-rounded">
                      Edit
                    </button>
                  </td>
                </tr>
              )}
          </tbody>
        </table>
        <AdvancedPagination activePage={activePage} numberOfPages={numberOfPages} changePage={changePage} />
      </div>
    </>
  );
}