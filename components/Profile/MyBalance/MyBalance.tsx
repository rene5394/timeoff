import axios from 'axios';
import * as React from 'react';
import { Api } from '../../../common/constants/api';
import { findOneBalance } from '../../../lib/api/timeoff/balance';
import { IBalance } from '../../../lib/domain/timeoff/IBalance';
import { InfoCard } from '../InfoCard';
import styles from './BalanceTable.module.css';

export const MyBalance = () => {
  const [balances, setBalances] = React.useState<IBalance[]>([]);

  React.useEffect(() => {
    const fillBalanceCards = async() => {
      const result = await findOneBalance(1);
      setBalances(result);
    };
    fillBalanceCards();
  }, [])
  
  return (
    <div className="row">
      {balances.length === 0 && <span>Loading...</span>}
      {balances.map((balance) => {
        return (
          <div className="row">
            <InfoCard title={'Comp days'} text={String(balance.compDays)} borderColorClass={'border-start border-success'}></InfoCard>
            <InfoCard title={'Vacations'} text={String(balance.vacationDays)} borderColorClass={'border-start border-success'}></InfoCard>
          </div>
        )
      })}
    </div>
  );
};