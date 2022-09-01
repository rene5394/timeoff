import * as React from 'react';
import Styles from './Summary.module.css';

export const Summary = () =>{
  return(
    <div className={"col " + Styles.SummaryDiv}>
      <div className="row">
        <div className="col-5">
          <h3>Time-Off Summary</h3>

          <form action="">
            <label htmlFor="Start">START DATE</label>
            <input type='Date' id='Start' className='form-control' />
          </form>
        </div>
        <div className={"col-7 " + Styles.Allocation}>
          <h4>Time-Off Type Allocation</h4>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Time-Off Type</th>
                <th scope="col">Allowance</th>
                <th scope="col">Balance</th>
                <th scope="col">Pending</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>Comp Day</th>
                <td>15 d</td>
                <td>0 d</td>
                <td>1 d</td>
              </tr>
              <tr>
                <th>Vacation</th>
                <td>15 d</td>
                <td>7 d</td>
                <td>0 d</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}