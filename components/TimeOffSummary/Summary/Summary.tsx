import * as React from 'react';
import { AllocationByUser, MyAllocation } from '../../Commons/AllocationTable';
import Styles from './Summary.module.css';

export const Summary = (userId:number) => {
  return(
    <div className={"col-7 " + Styles.Allocation}>
      <h4>Time-Off Type Allocation</h4>
      {AllocationByUser(userId)}
    </div>
  );
}