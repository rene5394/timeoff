import * as React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Styles from './Balance.module.css';
import { IBalance } from '../../../lib/domain/timeoff/IBalance';
import { IRequest } from '../../../lib/domain/timeoff/IRequest';
import { findAllRequests, findOneRequest, findRequestsByRange } from '../../../lib/api/timeoff/request';
import { showRequests } from './Requests';
import { endOfWeek, format, startOfWeek } from 'date-fns';
import { addDays } from 'date-fns';
import { IEventsDetails } from '../../../lib/domain/timeoff/IEvents';

export const Balance = () => {
  const [requests, setRequests] = React.useState<IRequest[]>();
  const [balance, setBalance] = React.useState<IBalance>();
  const [pendingRequests, setPendingRequests] = React.useState<number>();

  React.useEffect(() => {
    const allPendingRequests = async() => {
      const result = await findAllRequests(-1,'pending');
      console.log('requests pending',result.list);
      setPendingRequests(result.length);
    };
    allPendingRequests();
  }, []);

  const employeesOffByRange = async(range: string) => {
    let today = new Date();
    let startThisWeek = startOfWeek(today,{weekStartsOn: 1});
    let endThisWeek = endOfWeek(today,{weekStartsOn:1});
    let nextWeek = addDays(endThisWeek,2);
    let startNextWeek = startOfWeek(nextWeek,{weekStartsOn:1});
    let endNextWeek = endOfWeek(nextWeek,{weekStartsOn:1});

    if (range === 'thisWeek'){
      let result = await findRequestsByRange(new Date(startThisWeek),new Date(endThisWeek));
      let count=0;
      if(result){
        count = countEmployeesOff(result);
      }
      return count;
    }
    if (range === 'today') {
      let result = await findRequestsByRange(today,today);
      let count=0;
      if(result){
        count = countEmployeesOff(result);
      }
      return count;
    }
    if (range === 'nextWeek') {
      let result = await findRequestsByRange(new Date(startNextWeek), new Date(endNextWeek));
      let count=0;
      if(result){
        count = countEmployeesOff(result);
      }
      return count;
    }
  }

  const countEmployeesOff = (request:IEventsDetails[]) => {
    let count = 0;
    request.map(req => {
      let result;
      req.requests.map(async reqs => {
        result = await findOneRequest(reqs.requestId);
        if (result.statusId === 2) {
          count++;
        }
      });
    });

    return count;
  }

  return(
    <div className = "col-4">
      <div>
        <h3 className = {Styles.title}>Time Off Information</h3>
        <p>Quick Stats and Balances</p>
        <br />
        <p className = {Styles.balances}>Pending Requests</p>
        <p>{ pendingRequests }</p>
        <p className = {Styles.balances}>Employees Off Today</p>
        <p>{String(employeesOffByRange('today'))}</p>
        <p className = {Styles.balances}>Employees Off this Weekend</p>
        <p>{String(employeesOffByRange('thisWeek'))}</p>
        <p className = {Styles.balances}>Employees Off Next Week</p>
        <p>{String(employeesOffByRange('nextWeek'))}</p>
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