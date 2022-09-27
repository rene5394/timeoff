import * as React from 'react';
import { MyAllocation } from '../../Commons/AllocationTable';
import Styles from './Summary.module.css';

export const Summary = () =>{
  return(
    <div className={"col " + Styles.SummaryDiv}>
      <div className="row">
        <div className="col-5">
          <h3>Time-Off Summary</h3>

          <label htmlFor="Start">START DATE</label>
          <input type='Date' id='Start' defaultValue={ String(new Date()) } className='form-control' />
          
        </div>
        <div className={"col-7 " + Styles.Allocation}>
          <h4>Time-Off Type Allocation</h4>
          <MyAllocation />

        </div>
      </div>
    </div>
  );
}