import * as React from 'react';
import { InfoCard } from '../InfoCard';
import { IUser } from '../../../lib/domain/team/IUser';
import { findOneUserByJWT } from '../../../lib/api/team/user';

export const PersonalDetails = () => {
  const [User, setUser]=React.useState<IUser>();

  React.useEffect(()=>{
    const FillUser = async()=>{
      const Result = await findOneUserByJWT();
      setUser(Result);
    };
    FillUser();
  });

  return (
    <>
      <div className='row ps-5'>
        <h3 className='ps-0 mt-4'>{User?.firstname} {User?.secondname} {User?.lastname} {User?.secondlastname}</h3>
        <p className='ps-0'>{User?.role_id} <br /> Puesto2</p>

        <h5 className='ps-0 pb-2 mt-3'><b>Personal</b> Details</h5>
      </div>
      <div className='row ps-5'>
        <InfoCard title={'Name'} text={String(User?.firstname+' '+User?.lastname)} borderColorClass={'border-start border-3 border-warning'}></InfoCard>
        <InfoCard title={'Gender'} text={''} borderColorClass={'border-start border-3 border-warning'}></InfoCard>
        <InfoCard title={'Email'} text={String(User?.email)} borderColorClass={'border-start border-3 border-warning'}></InfoCard>
      </div>
    </>
  );
};