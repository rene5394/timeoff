import { NextPage } from 'next';
import * as React from 'react';
import  Head  from 'next/head';
import { NavHeader } from '../../components/Layout/NavHeader';
import { SideBarCoach } from '../../components/Layout/Sidebars/SidebarCoach';
import { Summary } from '../../components/TimeOffSummary/SummaryAdmin';
import { Requests } from '../../components/TimeOffSummary/RequestsAdmin';
import { ITeam } from '../../lib/domain/team/ITeam';
import { findAllTeamUsersEmployeesByJWT } from '../../lib/api/team/user';
import { IUser } from '../../lib/domain/team/IUser';

const TimeOffSummary: NextPage = () => {
  const [users,setUsers] = React.useState<IUser[]>();
  const [userSelected,setUserSelected] = React.useState<number>(0);

  React.useEffect(() => {
    const callTeamMembers = async() => {
      let result  = await findAllTeamUsersEmployeesByJWT();
      let resultList = result.list;
      setUsers(resultList);
    };
    callTeamMembers();
  },[]);

  const changeUserSelected = (userId:number) => {
    setUserSelected(userId);
  };

  return(
    <div className="container">
      <Head>
      <title>Time Off Summary | Unplugged</title>
      <meta name="description" content="Show team balances and transactions" />
      <link rel="icon" href="/favicon.png" />
      </Head>
      <NavHeader/>
      <div className="body row mx-0 gx-6">
        <SideBarCoach />
        <div className="col-9 pe-0">
          <div className={"col summaryDiv"}>
            <div className="row">
              <div className="col-5">
                <h4 className="mb-3">Time-Off Summary</h4>
                <label className="light-gray-text-2 mt-3 mb-2" htmlFor="Start">TEAM MEMBERS</label>
                <select className="form-select" onChange={ 
                  (e) => { changeUserSelected(parseInt(e.target.value)) }
                }>
                  <option defaultChecked value=''>Choose an user</option> 
                {users?.map(user =>
                  <option key={user.id} value={user.id}>{`${user.firstname} ${user.secondname} ${user.lastname} ${user.secondlastname}`}</option>
                )}
                </select>
              </div>
              {Summary(userSelected)}
            </div>
          </div>
          {Requests(userSelected)}
        </div>     
      </div>
    </div>
  );
}

export default TimeOffSummary;