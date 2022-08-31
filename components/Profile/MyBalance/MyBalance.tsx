import axios from 'axios';
import { log } from 'console';
import * as React from 'react';
import { Api } from '../../../common/constants/api';
import { findOneBalance } from '../../../lib/api/timeoff/balance';
import { IBalance } from '../../../lib/domain/timeoff/IBalance';
import { InfoCard } from '../InfoCard';
import styles from './Balance.module.css';

export const MyBalance = () => {
  const [balance, setBalance] = React.useState<IBalance>();

  React.useEffect(() => {
    const fillBalanceCards = async() => {
      const result = await findOneBalance(1);
      setBalance(result);
    };
    fillBalanceCards();
  }, [])

  if (balance) {
    return (
      <div className={'row '+ styles.balances}>
        <InfoCard title={'Comp days'} text={String(balance.comp_Days)} borderColorClass={'border-start border-success'}></InfoCard>
        <InfoCard title={'Vacations'} text={String(balance.vacation_Days)} borderColorClass={'border-start border-success'}></InfoCard>
      </div>
    );
  }

  return (
    <div className={'row '+ styles.balances}>
      <span>Loading...</span>
    </div>
  );
};