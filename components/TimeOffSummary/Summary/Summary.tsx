import * as React from 'react';
import { getCurrentDate } from '../../../common/utils/timeValidation';
import { IBalance } from '../../../lib/domain/timeoff/IBalance';
import { MyAllocation } from '../../Commons/AllocationTable';
import { Requests } from '../Requests';
import Styles from './Summary.module.css';

export const Summary = () =>{
  const [balance, setBalance] = React.useState<IBalance>();
  
  return(
    <div className={"col " + Styles.SummaryDiv}>
      <div className="row">
        <div className="col-5">
          <h3>Time-Off Summary</h3>

          <label htmlFor="Start">START DATE</label>
          <input type='Date' id='Start' value={ getCurrentDate() } className='form-control' />
          
        </div>
        <div className={"col-7 " + Styles.Allocation}>
          <h4>Time-Off Type Allocation</h4>
          <MyAllocation />
        </div>
      </div>
    </div>
  );
}