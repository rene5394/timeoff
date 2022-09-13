import * as React from 'react';
import Styles from './Balance.module.css';
import { MyAllocation } from '../../Commons/AllocationTable';

export const MyBalance = () => {
  return(
    <div className={`col-5 ${Styles.balance}`}>
      <h3>Your current allowance/balance</h3>
      <MyAllocation />
    </div>
  );
}