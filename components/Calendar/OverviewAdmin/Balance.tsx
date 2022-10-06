import * as React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Styles from './Balance.module.css';
import { IBalance } from '../../../lib/domain/timeoff/IBalance';
import { IRequest } from '../../../lib/domain/timeoff/IRequest';
import { findAllRequestByUserJWTAndStatus, findAllRequests } from '../../../lib/api/timeoff/request';
import { findOneByUserJWT } from '../../../lib/api/timeoff/balance';
import { CountRequestsByStatus } from '../../Commons/CountRequests';
import { showRequests } from './Requests';
import { endOfWeek, format, startOfWeek } from 'date-fns';
import { addDays, nextSunday } from 'date-fns/esm';

export const Balance = () => {
  const [requests, setRequests] = React.useState<IRequest[]>();
  const [balance, setBalance] = React.useState<IBalance>();
  const [pendingRequests, setPendingRequests] = React.useState<number>();

  React.useEffect(() => {
    const fillBalanceCards = async() => {
      const result = await findOneByUserJWT();
      setBalance(result);
    };
    const allPendingRequests = async() => {
      const result = await findAllRequests(-1,'pending');
      setPendingRequests(result.length);
    };
    allPendingRequests();
    fillBalanceCards();

  }, []);

  React.useEffect(() => {
    const fillRequests = async() => {
      const result = await findAllRequestByUserJWTAndStatus('approved');
      setRequests(result);
    }
    fillRequests();
  },[]);

  const employeesOffByRange = async(range: string) => {
    let today = new Date();
    let startThisWeek = startOfWeek(today,{weekStartsOn: 1});
    let endThisWeek = endOfWeek(today,{weekStartsOn:1});
    let nextWeek = addDays(endThisWeek,2);
    let startNextWeek = startOfWeek(nextWeek,{weekStartsOn:1});
    let endNextWeek = endOfWeek(nextWeek,{weekStartsOn:1});

    if (range === 'thisWeek'){
      
    }
  }

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
    <div className = "col-4">
      <div>
        <h3 className = {Styles.title}>Time Off Information</h3>
        <p>Quick Stats and Balances</p>
        <br />
        <p className = {Styles.balances}>Pending Requests</p>
        <p>{ CountRequestsByStatus('pending', new Date().getFullYear()) }</p>
        <p className = {Styles.balances}>Employees Off Today</p>
        <p>{String(findNearestDate())}</p>
        <p className = {Styles.balances}>Employees Off this Weekend</p>
        <p>{balance?.compDays} d</p>
        <p className = {Styles.balances}>Employees Off Next Week</p>
        <p>{balance?.vacationDays} d</p>
      </div>
      <div>
        <h3>My Pending</h3>
        <div className = {Styles.compDay}>
          {showRequests()}
        </div>

        <div>
          <form action="">
            <div className = "input-group mb-3">
              <span className ='input-group-text' ><FontAwesomeIcon icon = {['fas', 'envelope']} /></span>
              <input type = "text" className = 'form-control' placeholder = 'Inbox my manager' />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}