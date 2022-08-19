import * as React from 'react';
import { InfoCard } from '../InfoCard';
import styles from './BalanceTable.module.css';

export const PersonalDetails = () => {
  return (
    <div className="row">
      <InfoCard title={'Name'} text={''} borderColorClass={'border-start border-warning'}></InfoCard>
      <InfoCard title={'Gender'} text={''} borderColorClass={'border-start border-warning'}></InfoCard>
      <InfoCard title={'Email'} text={''} borderColorClass={'border-start border-warning'}></InfoCard>
    </div>
  );
};