import * as React from 'react';
import Styles from './Balance.module.css';
import { IBalance } from '../../../lib/domain/timeoff/IBalance';
import { IRequest } from '../../../lib/domain/timeoff/IRequest';
import { findAllRequestByUserJWTAndStatus } from '../../../lib/api/timeoff/request';
import { findOneByUserJWT } from '../../../lib/api/timeoff/balance';
import { CountRequestsByStatus } from '../../Commons/CountRequests';
import { ShowRequests } from './Requests';
import { formatInTimeZone } from 'date-fns-tz';

export const Balance = () => {
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
      const result = await findAllRequestByUserJWTAndStatus('approved');
      setRequests(result);
    }

    fillRequests();
  },[]);

  const findNearestDate = () => {
    const today = new Date();
    let nearest = today;
    let dateToCompare = today;

    if (requests) {
      if (requests.length < 1) {
        return 'No approved requests';
      }

      nearest = new Date(requests[requests.length-1].startDate);

      requests.map((req, i) => { 
        if (new Date(req.startDate) > today) {
          dateToCompare = new Date(req.startDate);
          if (dateToCompare < nearest) {
            nearest = dateToCompare;
          }
        }
      });
    }

    return formatInTimeZone(nearest, 'America/El_Salvador', 'd MMMM yyyy');
  }


  return(
    <div className="col">
      <div className="row">
        <div className="col-7">
          <h3 className = {Styles.title}>Overview</h3>
          <p>Quick Stats and Balances</p>
          <div className='row'>
            <div className="col-6">
              <p className = {Styles.balances}>Pending Requests</p>
              <p>{ CountRequestsByStatus('pending', new Date().getFullYear()) }</p>
              <p className = {Styles.balances}>Next Approved Leave</p>
              <p>{String(findNearestDate())}</p>
            </div>
            <div className="col-6">
              <p className = {Styles.balances}>Comp Day</p>
              <p>{balance?.compDays} d</p>
              <p className = {Styles.balances}>Vacation</p>
              <p>{balance?.vacationDays} d</p>
            </div>
          </div>
        </div>
        <div className='col-5'>
          <h4>My Pending</h4>
          <div className = {Styles.compDay}>
            {ShowRequests()}
          </div>
        </div>
      </div>
    </div>
  );
}