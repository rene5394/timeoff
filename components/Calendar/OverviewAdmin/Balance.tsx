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

interface newRequests extends IRequest {
  day: Date;
}

export const Balance = () => {
  const [requests, setRequests] = React.useState<IEventsDetails[]>();
  const [requestsDetails, setRequestsDetails] = React.useState<newRequests[]>();
  const [pendingRequests, setPendingRequests] = React.useState<number>();
  const [employeesOffThisWeek, setEmployeesOffThisWeek] = React.useState<number>(0);

  React.useEffect(() => {
    const allPendingRequests = async() => {
      const result = await findAllRequests(-1,'pending');
      const list = result.list;
      setPendingRequests(list.length);
    };

    const callAllRequests = async() => {
      let today = new Date();
      let startThisWeek = startOfWeek(today,{weekStartsOn: 1});
      let endThisWeek = endOfWeek(today,{weekStartsOn:1});
      let nextWeek = addDays(endThisWeek,2);
      let endNextWeek = endOfWeek(nextWeek,{weekStartsOn:1});

      const result = await findRequestsByRange(startThisWeek,endNextWeek);
      const dataFilter = result.filter(value => value.requests.length > 0);
      setRequests(dataFilter);
    };

    callAllRequests();
    allPendingRequests();
  }, []);

  React.useEffect(() => {
    const employeesOffByRange = () => {
      let today = new Date();
      let startThisWeek = startOfWeek(today,{weekStartsOn: 1});
      let endThisWeek = endOfWeek(today,{weekStartsOn:1});
      let nextWeek = addDays(endThisWeek,1);
      let startNextWeek = startOfWeek(nextWeek,{weekStartsOn:1});
      let endNextWeek = endOfWeek(nextWeek,{weekStartsOn:1});
      let count = 0;
      console.log('Detalles de request', requestsDetails);
      console.log('startWeek',new Date(startThisWeek));
      
      if (requestsDetails) {
        requestsDetails.map((req) => {
          
          console.log('day',new Date(req.day));
          if (new Date(startThisWeek) <= new Date(req.day) && new Date(endThisWeek) >= new Date(req.day) ){
            console.log('detro de if', req);
            count++;
          }
        });
        console.log('contador de requests this week',count);
      }
      setEmployeesOffThisWeek(count);
    }

    const callRequestsDetails = () => {
      if (requests) {
        let requestArray = new Array();
        console.log('Call Requests Details', requests);
        requests.map((data) => {
          data.requests.map(async(request) => {
            let result = await findOneRequest(request.requestId);
            
            if (result.statusId === 2) {
              let newReq = {
                amount: result.amount,
                coachApproval: result.coachApproval,
                createdAt: result.createdAt,
                createdBy: result.createdBy,
                endDate: result.endDate,
                hrApproval: result.hrApproval,
                id: result.id,
                startDate: result.startDate,
                statusId: result.statusId,
                typeId: result.typeId,
                updatedAt: result.updatedAt,
                userId: result.userId,
                day: request.day
              }
              requestArray.push(newReq);
            }
          });
        });
        console.log('array', requestArray);
        setRequestsDetails(requestArray);
        employeesOffByRange();
      }
    };

    callRequestsDetails();
  },[requests]);

  React.useEffect(() => {
  },[requestsDetails]);

  return(
    <div className = "col-4">
      <div>
        <h3 className = {Styles.title}>Time Off Information</h3>
        <p>Quick Stats and Balances</p>
        <br />
        <p className = {Styles.balances}>Pending Requests</p>
        <p>{ pendingRequests }</p>
        <p className = {Styles.balances}>Employees Off Today</p>
        <p>{employeesOffThisWeek}</p>
        <p className = {Styles.balances}>Employees Off this Weekend</p>
        <p>{employeesOffThisWeek}</p>
        <p className = {Styles.balances}>Employees Off Next Week</p>
        <p>{employeesOffThisWeek}</p>
      </div>
      
    </div>
  );
}