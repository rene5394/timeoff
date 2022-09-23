import * as React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Styles from './Balance.module.css';
import { IBalance } from '../../../lib/domain/timeoff/IBalance';
import { IRequest } from '../../../lib/domain/timeoff/IRequest';
import { findAllRequestByUserJWT } from '../../../lib/api/timeoff/request';
import { findOneByUserJWT } from '../../../lib/api/timeoff/balance';
import { CountRequestsByStatus } from '../../Commons/CountRequests';
import { showRequests } from './Requests';

export const Balance = () =>{

  const [requests, setRequests] = React.useState<IRequest[]>();
  const [balance, setBalance] = React.useState<IBalance>();

  React.useEffect(() => {
    const fillBalanceCards = async() => {
      const result = await findOneByUserJWT();
      setBalance(result);
    };
    fillBalanceCards();
  }, [])

  React.useEffect(() => {
    const fillRequests = async() => {
      const result = await findAllRequestByUserJWT();
      setRequests(result);
    }
    fillRequests();
  },[]);
/*
  const findNearestDate = () => {
    var nearest = require('nearest-date')
    var today = new Date();
    var request = requests?.filter(val => val.startDate >= today);
    var dates = request?.map(req => { return req.startDate});
    var nearestId = nearest(dates,today);
    var dateChoosen = dates?.at(nearestId);
    return dateChoosen;
  }
*/

  return(
    <div className="col-4">
      <div>
        <h3 className={Styles.title}>Overview</h3>
        <p>Quick Stats and Balances</p>
        <br />
        <p className={Styles.balances}>Pending Requests</p>
        <p>{ CountRequestsByStatus(1) }</p>
        <p className={Styles.balances}>Next Approved Leave</p>
        <p></p>
        <p className={Styles.balances}>Comp Day</p>
        <p>{balance?.compDays} d</p>
        <p className={Styles.balances}>Vacation</p>
        <p>{balance?.vacationDays} d</p>
      </div>
      <div>
        <h3>My Pending</h3>
        <div className={Styles.compDay}>
          {showRequests()}
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