import * as React from 'react';
import Styles from './Balance.module.css';

export const MyBalance = () =>{
  return(
    <div className={`col-5 ${Styles.balance}`}>
      <h3>Your current allowance/balance</h3>
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
  );
}