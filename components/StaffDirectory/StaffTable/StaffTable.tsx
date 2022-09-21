import * as React from 'react';
import { findAllUsersEmployees } from '../../../lib/api/team/user';
import { findBalances } from '../../../lib/api/timeoff/balance';
import { IUser } from '../../../lib/domain/team/IUser';
import Moment from 'moment';
import { findAllTeams } from '../../../lib/api/team/team';

interface IUserData extends IUser {
  compDays?: number;
  vacationDays?: number;
  teamName?: string;
};

export const StaffTable = () => {
  const [usersData, setUsersData] = React.useState<any[]>();

  React.useEffect(() => {
    const fillUserData = async() => {
      const teams = await findAllTeams();
      const users = await findAllUsersEmployees();
      const balances = await fillBalances(users);

      const objs: any = [];

      users.map(user => {
        const obj: IUserData = { ...user };
        balances.map(balance => {
          if (user.id === balance.userId) {
            obj.compDays = balance.compDays;
            obj.vacationDays = balance.vacationDays;
          }
        });
        objs.push(obj);
      });
      
      setUsersData(objs);
    };
    fillUserData();
  }, [])

  const fillBalances = async(users: IUser[] | undefined) => {
    let userIds: any = [];

    users?.map((user) => {
      userIds.push(user.id);
    });
    
    return await findBalances(userIds);
  };

  return(
    <div className="row px-5 pt-4">
      <table className="table align-middle mb-0 bg-white">
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
              <tr id={userData.id.toString()} key={userData.id.toString()}>
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
                <td>
                  <p className="fw-normal mb-1">Software engineer</p>
                  <p className="text-muted mb-0">IT department</p>
                </td>
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