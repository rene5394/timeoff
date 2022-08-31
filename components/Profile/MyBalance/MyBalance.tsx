import axios from 'axios';
import { log } from 'console';
import * as React from 'react';
import { Api } from '../../../common/constants/api';
import { findOneBalance } from '../../../lib/api/timeoff/balance';
import { IBalance } from '../../../lib/domain/timeoff/IBalance';
import { InfoCard } from '../InfoCard';
<<<<<<< HEAD
import styles from './Balance.module.css';
=======
import styles from './BalanceTable.module.css';
>>>>>>> origin/dev

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
<<<<<<< HEAD
      <div className={'row '+ styles.balances}>
=======
      <div className="row">
>>>>>>> origin/dev
        <InfoCard title={'Comp days'} text={String(balance.comp_Days)} borderColorClass={'border-start border-success'}></InfoCard>
        <InfoCard title={'Vacations'} text={String(balance.vacation_Days)} borderColorClass={'border-start border-success'}></InfoCard>
      </div>
    );
  }

  return (
<<<<<<< HEAD
    <div className={'row '+ styles.balances}>
=======
    <div className="row">
>>>>>>> origin/dev
      <span>Loading...</span>
    </div>
  );
};