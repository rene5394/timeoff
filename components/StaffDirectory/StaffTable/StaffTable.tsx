import * as React from 'react';
import { findAllUsersEmployees } from '../../../lib/api/team/user';
import { findBalances } from '../../../lib/api/timeoff/balance';
import { findAllTeams } from '../../../lib/api/team/team';
import { findEmployees } from '../../../lib/api/team/employee';
import { findMembers } from '../../../lib/api/team/member';
import { IUser } from '../../../lib/domain/team/IUser';
import Moment from 'moment';

interface IUserData extends IUser {
  compDays?: number;
  vacationDays?: number;
  teamName?: string;
};

export const StaffTable = () => {
  const [usersData, setUsersData] = React.useState<any[]>();

  React.useEffect(() => {
    const fillUserData = async() => {
      let userIds: any = [];
      let employeesIds: any = [];

      const teams = await findAllTeams();
      const users = await findAllUsersEmployees();      

      users.map((user) => userIds.push(user.id));
      const balances = await findBalances(userIds);
      const employees = await findEmployees(userIds);
      
      employees.map((employee) => employeesIds.push(employee.id));
      const members = await findMembers(employeesIds);

      const objs: IUserData[] = [];

      users.map(user => {
        const obj: IUserData = { ...user };

        balances.map(balance => {
          if (user.id === balance.userId) {
            obj.compDays = balance.compDays;
            obj.vacationDays = balance.vacationDays;
          }
        });

        employees.map(employee => {
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
    };
    fillUserData();
  }, [])

  return(
    <div className="row px-5 pt-4">
      <table className="table align-middle mb-5 bg-white">
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
                  <button type="button" className="btn btn-link btn-sm btn-rounded">
                    Edit
                  </button>
                </td>
              </tr>
            )}
        </tbody>
      </table>
    </div>
  );
}