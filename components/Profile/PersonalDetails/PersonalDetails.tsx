import * as React from 'react';
import { InfoCard } from '../InfoCard';
import styles from './Details.module.css';

export const PersonalDetails = () => {
  return (
    <>
      <div className="row">
        <div className={styles.Personal}>
          <h2>Nombre</h2>
          <p>Puesto <br /> Puesto2</p>

          <h2>Personal Details</h2>
        </div>
        
        
      </div>
      <div className={'row ' + styles.info}>
        <InfoCard title={'Name'} text={''} borderColorClass={'border-start border-warning'}></InfoCard>
        <InfoCard title={'Gender'} text={''} borderColorClass={'border-start border-warning'}></InfoCard>
        <InfoCard title={'Email'} text={''} borderColorClass={'border-start border-warning'}></InfoCard>
      </div>
    </>
  );
};