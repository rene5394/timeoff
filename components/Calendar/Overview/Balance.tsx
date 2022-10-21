import * as React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Styles from './Balance.module.css';
import { IBalance } from '../../../lib/domain/timeoff/IBalance';
import { IRequest } from '../../../lib/domain/timeoff/IRequest';
import { findAllRequestByUserJWTAndStatus } from '../../../lib/api/timeoff/request';
import { findOneByUserJWT } from '../../../lib/api/timeoff/balance';
import { CountRequestsByStatus } from '../../Commons/CountRequests';
import { ShowRequests } from './Requests';
import { format } from 'date-fns';

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
    var today = new Date();
    var nearest = today;
    var dateToCompare = today;
    if (requests) {
      if (requests.length < 1) {
        return 'No approved requests';
      }
      nearest = new Date(requests[requests.length-1].startDate);
      requests.map((req,i) => { 
        if (new Date(req.startDate) > today) {
          dateToCompare = new Date(req.startDate);
          if (dateToCompare < nearest) {
            nearest = dateToCompare;
          }
        }
      });
    }
    return format(nearest,'d MMMM Y');
  }


  return(
    <div className = {`col ${Styles.overview}`}>
      <div className="row">
        <div className='col'>
          <h3 className = {Styles.title}>Overview</h3>
          <p>Quick Stats and Balances</p>
          <br />
          <p className = {Styles.balances}>Pending Requests</p>
          <p>{ CountRequestsByStatus('pending', new Date().getFullYear()) }</p>
          <p className = {Styles.balances}>Next Approved Leave</p>
          <p>{String(findNearestDate())}</p>
          <p className = {Styles.balances}>Comp Day</p>
          <p>{balance?.compDays} d</p>
          <p className = {Styles.balances}>Vacation</p>
          <p>{balance?.vacationDays} d</p>
        </div>
        <div className='col'>
          <h3>My Pending</h3>
          <div className = {Styles.compDay}>
            {ShowRequests()}
          </div>
        </div>
      </div>
      
      
    </div>
  );
}