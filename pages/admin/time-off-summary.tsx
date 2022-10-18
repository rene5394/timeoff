import { NextPage } from 'next';
import * as React from 'react';
import  Head  from 'next/head';
import { NavHeader } from '../../components/Layout/NavHeader';
import { SideBarAdmin } from '../../components/Layout/Sidebars/SidebarAdmin';
import { Summary } from '../../components/TimeOffSummary/Summary';
import { Requests } from '../../components/TimeOffSummary/Requests';
import { ITeam } from '../../lib/domain/team/ITeam';
import { findAllActiveTeams } from '../../lib/api/team/team';
import { findAllUsersEmployeesByTeam } from '../../lib/api/team/user';
import { IUser } from '../../lib/domain/team/IUser';

const TimeOffSummary: NextPage = () => {
  const [year,setYear] = React.useState<number>();
  const [teams,setTeams] = React.useState<ITeam[]>();
  const [users,setUsers] = React.useState<IUser[]>();
  React.useEffect(() => {
    var thisYear = new Date().getFullYear();
    setYear(thisYear);

    const callAllTeams = async() => {
      const result = await findAllActiveTeams();

      setTeams(result);
    };
    callAllTeams();
  },[]);

  const callTeamMembers = async(id:number) => {
    users?.splice(0);
    let result  = await findAllUsersEmployeesByTeam(id);
    let resultList = result.list;
    console.log('resultado ya solo lista',resultList);
    setUsers(resultList);
  };
  return(
    <div className="container">
      <Head>
      <title>Summary | Time Off App</title>
      <meta name="description" content="Generated by create next app" />
      <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavHeader/>
      <div className="body row mx-0">
        <SideBarAdmin />
        <div className="col-8">
          <div className={"col summaryDiv"}>
            <div className="row">
              <div className="col-5">
                <h3>Time-Off Summary</h3>
                <label htmlFor="Start">TEAM</label>
                 
                <select className="form-select" onChange={ (e) => {callTeamMembers(parseInt(e.target.value));}}>
                {teams?.map(team =>
                  <option selected value={team.id}>{team.name}</option>
                )}
                </select>

                <label htmlFor="Start">TEAM MEMBERS</label>
                 
                <select className="form-select" onChange={ (e) => { }}>
                {users?.map(user =>
                  <option selected value={user.id}>{`${user.firstname} ${user.secondname} ${user.lastname} ${user.secondlastname}`}</option>
                )}
                </select>
              </div>
              <Summary />
            </div>
          </div>
          {Requests(year)}
        </div>     
      </div>
    </div>
  );
}

export default TimeOffSummary;