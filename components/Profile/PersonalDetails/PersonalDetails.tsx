import * as React from 'react';
import { InfoCard } from '../InfoCard';
import styles from './Details.module.css';
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
      <div className="row">
        <div className={styles.Personal}>
          <h2>{User?.firstname} {User?.secondname} {User?.lastname} {User?.secondlastname}</h2>
          <p>{User?.role_id} <br /> Puesto2</p>

          <h2>Personal Details</h2>
        </div>
        
        
      </div>
      <div className={'row ' + styles.info}>
        <InfoCard title={'Name'} text={String(User?.firstname+' '+User?.lastname)} borderColorClass={'border-start border-warning'}></InfoCard>
        <InfoCard title={'Gender'} text={''} borderColorClass={'border-start border-warning'}></InfoCard>
        <InfoCard title={'Email'} text={String(User?.email)} borderColorClass={'border-start border-warning'}></InfoCard>
      </div>
    </>
  );
};