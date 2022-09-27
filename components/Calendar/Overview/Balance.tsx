import * as React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Styles from './Balance.module.css';
import { IBalance } from '../../../lib/domain/timeoff/IBalance';
import { IRequest } from '../../../lib/domain/timeoff/IRequest';
import { findAllRequestByUserJWTAndStatus } from '../../../lib/api/timeoff/request';
import { findOneByUserJWT } from '../../../lib/api/timeoff/balance';
import { CountRequestsByStatus } from '../../Commons/CountRequests';
import { showRequests } from './Requests';
import { format } from 'date-fns';
import { isEmpty } from 'rxjs';

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
      console.log('existen',requests);
      requests.map((req,i) => { 
        console.log('realmente funciono?',req.startDate);
        if (new Date(req.startDate) > today) {
          dateToCompare = new Date(req.startDate);
          console.log('dateToCompare',dateToCompare);
          if (dateToCompare < nearest) {
            nearest = dateToCompare;
            console.log('nearest',nearest);
          }
        }
      });
    }
    return format(nearest,'d MMMM Y');
  }


  return(
    <div className="col-4">
      <div>
        <h3 className={Styles.title}>Overview</h3>
        <p>Quick Stats and Balances</p>
        <br />
        <p className={Styles.balances}>Pending Requests</p>
        <p>{ CountRequestsByStatus(1) }</p>
        <p className={Styles.balances}>Next Approved Leave</p>
        <p>{String(findNearestDate())}</p>
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