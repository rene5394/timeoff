import * as React from 'react';
import { InfoCard } from '../InfoCard';
import { IUser } from '../../../lib/domain/team/IUser';
import { findOneUserByJWT } from '../../../lib/api/team/user';
import { findOneTeamByUserJWT } from '../../../lib/api/team/team';
import { ITeam } from '../../../lib/domain/team/ITeam';

export const PersonalDetails = () => {
  const [user, setUser] = React.useState<IUser>();
  const [team, setTeam] = React.useState<ITeam>();

  React.useEffect(() => {
    const FillUser = async() => {
      const result = await findOneUserByJWT();
      setUser(result);
    };
    FillUser();
  }, []);

  React.useEffect(() => {
    const FillTeam = async() => {
      const result = await findOneTeamByUserJWT();
      setTeam(result);
    };
    FillTeam();
  }, []);

  return (
    <>
      <div className='row ps-5'>
        <h3 className='ps-0 my-4'>{user?.firstname} {user?.secondname} {user?.lastname} {user?.secondlastname}</h3>

        <h5 className='ps-0 pb-2 mt-3'><b>Personal</b> Details</h5>
      </div>
      <div className='row ps-5'>
        <InfoCard title={'Name'} text={String(user?.firstname + ' ' + user?.lastname)} borderColorClass={'border-start border-3 border-warning'}></InfoCard>
        <InfoCard title={'Team'} text={String(team?.name)} borderColorClass={'border-start border-3 border-warning'}></InfoCard>
        <InfoCard title={'Email'} text={String(user?.email)} borderColorClass={'border-start border-3 border-warning'}></InfoCard>
      </div>
    </>
  );
};