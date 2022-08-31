import * as React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Styles from './Balance.module.css';

export const Balance = () =>{
  return(
    <div className="col-4">
      <div>
        <h3 className={Styles.title}>Overview</h3>
        <p>Quick Stats and Balances</p>
        <br />
        <p className={Styles.balances}>Pending Requests</p>
        <p>09/02/2023</p>
        <p className={Styles.balances}>Comp Day</p>
        <p>0 d</p>
        <p className={Styles.balances}>Vacation</p>
        <p>0.5 d</p>
      </div>
      <div>
        <h3>My Pending</h3>
        <div className={Styles.CompDay}>
          <h3><FontAwesomeIcon icon={['fas','warning']} className={Styles.Comp}/>Comp Day</h3>
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