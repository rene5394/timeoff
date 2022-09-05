import * as React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Styles from './Balance.module.css';
import { IBalance } from '../../../lib/domain/timeoff/IBalance';
import { IRequest } from '../../../lib/domain/timeoff/IRequest';
import { findAllRequestByUserJWT } from '../../../lib/api/timeoff/request';
import { findOneByUserJWT } from '../../../lib/api/timeoff/balance';

export const Balance = () =>{
  React.useEffect(()=>{
    const CountRequests = async() =>{
      const result = await findAllRequestByUserJWT();
      return Object.keys(result).length;
    }
    CountRequests()
  });

  const [balance, setBalance] = React.useState<IBalance>();

  React.useEffect(() => {
    const fillBalanceCards = async() => {
      const result = await findOneByUserJWT();
      setBalance(result);
    };
    fillBalanceCards();
  }, [])

  return(
    <div className="col-4">
      <div>
        <h3 className={Styles.title}>Overview</h3>
        <p>Quick Stats and Balances</p>
        <br />
        <p className={Styles.balances}>Pending Requests</p>
        <p>0</p>
        <p className={Styles.balances}>Pending Requests</p>
        <p>09/02/2023</p>
        <p className={Styles.balances}>Comp Day</p>
        <p>{balance?.compDays} d</p>
        <p className={Styles.balances}>Vacation</p>
        <p>{balance?.vacationDays} d</p>
      </div>
      <div>
        <h3>My Pending</h3>
        <div className={Styles.compDay}>
          <h3><FontAwesomeIcon icon={['fas','warning']} className={Styles.comp}/>Comp Day</h3>
          <p>1 d</p>
          <p>09/02/2023</p>
        </div>

        <div>
          <form action="">
            <div className="input-group mb-3">
              <span className='input-group-text' ><FontAwesomeIcon icon={['fas', 'envelope']} /></span>
              <input type="text" className='form-control' placeholder='Inbox my manager' />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}