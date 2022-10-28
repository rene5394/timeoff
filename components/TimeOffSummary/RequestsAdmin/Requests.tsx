import * as React from 'react';
import { findOneUser } from '../../../lib/api/team/user';
import { IUser } from '../../../lib/domain/team/IUser';
import { CountRequestsByStatusAndUserId } from '../../Commons/CountRequests';
import { RequestSummaryByStatus } from './requestByStatus/requestSummary';
import Styles from './Requests.module.css';

export const Requests = (userId: number) => {
  const year = new Date().getFullYear();
  const amountPending = CountRequestsByStatusAndUserId('pending', userId);
  const amountApproved = CountRequestsByStatusAndUserId('approved', userId);
  const amountDenied = CountRequestsByStatusAndUserId('denied', userId);
  const amountCancelled = CountRequestsByStatusAndUserId('cancelled', userId);
  const [user,setUser] = React.useState<IUser>();

  React.useEffect(() => {
    const findUser = async() => {
      let result = await findOneUser(userId);
      setUser(result);
    };
    findUser();
  },[userId]);
  
  return(
    <div className={'col ' + Styles.RequestsDiv}>
      <div className="row">
        {user ? (
          <h4>{`${user?.firstname} ${user?.lastname}'s Summary`}</h4>
        ) : (
          <h4>User's Summary</h4>
        )}
        <ul className="nav nav-tabs" id="myTab" role="tablist">
          <li className="nav-item" role="presentation">
            <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#approved" type="button" role="tab" aria-controls="home" aria-selected="true">Approved ({amountApproved})</button>
          </li>
          <li className="nav-item" role="presentation">
            <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#pending" type="button" role="tab" aria-controls="profile" aria-selected="false">Pending ({amountPending})</button>
          </li>
          <li className="nav-item" role="presentation">
            <button className="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#denied" type="button" role="tab" aria-controls="contact" aria-selected="false">Denied ({amountDenied})</button>
          </li>
          <li className="nav-item" role="presentation">
            <button className="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#cancelled" type="button" role="tab" aria-controls="contact" aria-selected="false">Cancelled ({amountCancelled})</button>
          </li>
        </ul>
        <div className="tab-content" id="myTabContent">
          <div className="tab-pane fade show active" id="approved" role="tabpanel" aria-labelledby="home-tab">
            {RequestSummaryByStatus('approved', userId)}
          </div>
          <div className="tab-pane fade" id="pending" role="tabpanel" aria-labelledby="profile-tab">
            {RequestSummaryByStatus('pending', userId)}
          </div>
          <div className="tab-pane fade" id="denied" role="tabpanel" aria-labelledby="contact-tab">
            {RequestSummaryByStatus('denied', userId)}
          </div>
          <div className="tab-pane fade" id="cancelled" role="tabpanel" aria-labelledby="contact-tab">
            {RequestSummaryByStatus('cancelled', userId)}
          </div>
        </div>
      </div>
    </div>
  );
  
  
}