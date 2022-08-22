import axios from 'axios';
import { log } from 'console';
import * as React from 'react';
import { Api } from '../../../common/constants/api';
import { findOneBalance } from '../../../lib/api/timeoff/balance';
import { IBalance } from '../../../lib/domain/timeoff/IBalance';
import { InfoCard } from '../InfoCard';
import styles from './BalanceTable.module.css';

export const MyBalance = () => {
  const [balance, setBalance] = React.useState<IBalance>();

  React.useEffect(() => {
    const fillBalanceCards = async() => {
      const result = await findOneBalance(1);
      setBalance(result);
    };
    fillBalanceCards();
  }, [])

  if (!balance) {
    return (
      <div className="row">
        <span>Loading...</span>
      </div>
    );
  }

  return (
      <div className="row">
        <InfoCard title={'Comp days'} text={String(balance?.compDays)} borderColorClass={'border-start border-success'}></InfoCard>
        <InfoCard title={'Vacations'} text={String(balance?.vacationDays)} borderColorClass={'border-start border-success'}></InfoCard>
      </div>
  );
};