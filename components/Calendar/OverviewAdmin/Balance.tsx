import * as React from 'react';
import Styles from './Balance.module.css';
import { IRequest } from '../../../lib/domain/timeoff/IRequest';
import { findAllRequests, findOneRequest, findRequestsByRange } from '../../../lib/api/timeoff/request';
import { endOfWeek, startOfWeek } from 'date-fns';
import { addDays } from 'date-fns';
import { IEventsDetails } from '../../../lib/domain/timeoff/IEvents';

export const Balance = () => {
  const [requests, setRequests] = React.useState<IEventsDetails[]>();
  const [pendingRequests, setPendingRequests] = React.useState<number>();
  const [employeesOffThisWeek, setEmployeesOffThisWeek] = React.useState<number>(0);
  const [employeesOffNextWeek, setEmployeesOffNextWeek] = React.useState<number>(0);
  const [employeesOffToday, setEmployeesOffToday] = React.useState<number>(0);

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
    const callRequestsDetails = async() => {
      if (requests) {
        let newRequests: any[] = [];
        requests.map(result => {
          result.requests.map(data => {
            newRequests.push(data);
          })
        });

        let newRequestsDetails = await Promise.all(
          newRequests.map(async(req) => {
          let result = await findOneRequest(req.requestId);
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
            day: req.day
          }

          return newReq;  
        }));

        let today = new Date();
        let startThisWeek = startOfWeek(today,{weekStartsOn: 1});
        let endThisWeek = endOfWeek(today,{weekStartsOn:1});
        let nextWeek = addDays(endThisWeek,1);
        let startNextWeek = startOfWeek(nextWeek,{weekStartsOn:1});
        let endNextWeek = endOfWeek(nextWeek,{weekStartsOn:1});
        let countThisWeek = 0;
        let countNextWeek = 0;
        let countToday = 0;
        let usersRepetidosThisWeek: any[] = [];
        let usersRepetidosNextWeek: any[] = [];
        let usersRepetidosToday: any[] = [];

        newRequestsDetails.map(req => {
          if (req.statusId === 2) {
            //This week
            if (new Date(startThisWeek) <= new Date(req.day) && new Date(endThisWeek) >= new Date(req.day)) {
              if (!usersRepetidosThisWeek.includes(req.userId)) {
                countThisWeek++;
                usersRepetidosThisWeek.push(req.userId);
              }
            }
            //Next week
            if (new Date(startNextWeek) <= new Date(req.day) && new Date(endNextWeek) >= new Date(req.day)) {
              if (!usersRepetidosNextWeek.includes(req.userId)) {
                countNextWeek++;
                usersRepetidosNextWeek.push(req.userId);
              }
            }
            //Today
            if (today === new Date(req.day)) {
              if (!usersRepetidosToday.includes(req.userId)) {
                countToday++;
                usersRepetidosToday.push(req.userId);
              }
            }
          }
        });

        setEmployeesOffThisWeek(countThisWeek);
        setEmployeesOffNextWeek(countNextWeek);
        setEmployeesOffToday(countToday);
      }
    };

    callRequestsDetails();
  },[requests]);

  return(
    <div className = "col-4">
      <div>
        <h3 className = {Styles.title}>Time Off Information</h3>
        <p>Quick Stats and Balances</p>
        <br />
        <p className = {Styles.balances}>Pending Requests</p>
        <p>{ pendingRequests }</p>
        <p className = {Styles.balances}>Employees Off Today</p>
        <p>{employeesOffToday}</p>
        <p className = {Styles.balances}>Employees Off this Week</p>
        <p>{employeesOffThisWeek}</p>
        <p className = {Styles.balances}>Employees Off Next Week</p>
        <p>{employeesOffNextWeek}</p>
      </div>
      
    </div>
  );
}