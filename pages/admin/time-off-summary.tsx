import { NextPage } from 'next';
import * as React from 'react';
import  Head  from 'next/head';
import { NavHeader } from '../../components/Layout/NavHeader';
import { SideBarAdmin } from '../../components/Layout/Sidebars/SidebarAdmin';
import { Summary } from '../../components/TimeOffSummary/SummaryAdmin';
import { Requests } from '../../components/TimeOffSummary/RequestsAdmin';
import { ITeam } from '../../lib/domain/team/ITeam';
import { findAllActiveTeams } from '../../lib/api/team/team';
import { findAllUsersEmployeesByTeam } from '../../lib/api/team/user';
import { IUser } from '../../lib/domain/team/IUser';

const TimeOffSummary: NextPage = () => {
  const [teams, setTeams] = React.useState<ITeam[]>();
  const [users, setUsers] = React.useState<IUser[]>();
  const [disabled, setDisabled] = React.useState<boolean>(true);
  const [userSelected, setUserSelected] = React.useState<number>(0);

  React.useEffect(() => {
    const callAllTeams = async() => {
      const result = await findAllActiveTeams();

      setTeams(result);
    };
    callAllTeams();
  },[]);

  const callTeamMembers = async(id:number) => {
    if (disabled) {
      setDisabled(false);
    }

    const result  = await findAllUsersEmployeesByTeam(id);
    const resultList = result.list;
    setUsers(resultList);
  };

  const changeUserSelected = (userId:number) => {
    setUserSelected(userId);
  };

  return(
    <div className="container">
      <Head>
      <title>Time Off Summary | Unplugged</title>
      <meta name="description" content="Show employees balances and transactions" />
      <link rel="icon" href="/favicon.png" />
      </Head>
      <NavHeader/>
      <div className="body row mx-0 gx-6">
        <SideBarAdmin />
        <div className="col-9 pe-0">
          <div className={"col summaryDiv"}>
            <div className="row">
              <div className="col-5">
                <h4 className="mb-3">Time-Off Summary</h4>
                <label className="light-gray-text-2 mb-2" htmlFor="Start">TEAM</label>
                 
                <select className="form-select" onChange={ (e) => {callTeamMembers(parseInt(e.target.value));}}>
                  <option defaultChecked value=''>Choose a team</option>
                  {teams?.map(team =>
                    <option key={team.id} value={team.id}>{team.name}</option>
                  )}
                </select>

                <label className="light-gray-text-2 mt-3 mb-2" htmlFor="Start">TEAM MEMBERS</label>
                 
                <select className="form-select" disabled={disabled} onChange={ 
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