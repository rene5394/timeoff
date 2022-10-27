import * as React from 'react';
import { CountRequestsByStatus } from '../../Commons/CountRequests';
import { RequestSummaryByStatus } from './requestByStatus/requestSummary';
import Styles from './Requests.module.css';

export const Requests = (year: number | any) => {
  const amountPending = CountRequestsByStatus('pending', year);
  const amountApproved = CountRequestsByStatus('approved', year);
  const amountDenied = CountRequestsByStatus('denied', year);
  const amountCancelled = CountRequestsByStatus('cancelled', year);

  return(
    <div className={'col ' + Styles.RequestsDiv}>
      <div className="row">
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
          {RequestSummaryByStatus('approved', year)}
        </div>
        <div className="tab-pane fade" id="pending" role="tabpanel" aria-labelledby="profile-tab">
          {RequestSummaryByStatus('pending', year)}
        </div>
        <div className="tab-pane fade" id="denied" role="tabpanel" aria-labelledby="contact-tab">
          {RequestSummaryByStatus('denied', year)}
        </div>
        <div className="tab-pane fade" id="cancelled" role="tabpanel" aria-labelledby="contact-tab">
          {RequestSummaryByStatus('cancelled', year)}
        </div>
      </div>
      </div>
    </div>
  );
}