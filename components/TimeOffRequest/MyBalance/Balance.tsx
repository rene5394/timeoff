import * as React from 'react';
import { IBalance } from '../../../lib/domain/timeoff/IBalance';
import { findOneByUserJWT } from '../../../lib/api/timeoff/balance';
import Styles from './Balance.module.css';

export const MyBalance = () => {
  const [balance, setBalance] = React.useState<IBalance>();

  React.useEffect(() => {
    const fillBalanceCards = async() => {
      const result = await findOneByUserJWT();
      setBalance(result);
    };
    fillBalanceCards();
  }, [])

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
            <td>{String(balance?.compDays)}</td>
            <td>1 d</td>
          </tr>
          <tr>
            <th>Vacation</th>
            <td>15 d</td>
            <td>{String(balance?.vacationDays)}</td>
            <td>0 d</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}