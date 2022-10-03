import * as React from 'react';
import { CountRequestsByStatus } from '../../Commons/CountRequests';
import { RequestSummaryByStatus } from './requestByStatus/requestSummary';
import Styles from './Requests.module.css';

export const Requests = (year: number | any) => {
  const amountPending = CountRequestsByStatus('pending', year);
  const amountApproved = CountRequestsByStatus('approved', year);
  const amountDenied = CountRequestsByStatus('denied', year);
  const amountCancelled = CountRequestsByStatus('canceled', year);

  return(
    <div className={'col ' + Styles.RequestsDiv}>
      <div className="row">
      <ul className="nav nav-tabs" id="myTab" role="tablist">
        <li className="nav-item" role="presentation">
          <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#Approved" type="button" role="tab" aria-controls="home" aria-selected="true">Approved ({amountApproved})</button>
        </li>
        <li className="nav-item" role="presentation">
          <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#Pending" type="button" role="tab" aria-controls="profile" aria-selected="false">Pending ({amountPending})</button>
        </li>
        <li className="nav-item" role="presentation">
          <button className="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#Rejected" type="button" role="tab" aria-controls="contact" aria-selected="false">Rejected ({amountDenied})</button>
        </li>
        <li className="nav-item" role="presentation">
          <button className="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#Cancelled" type="button" role="tab" aria-controls="contact" aria-selected="false">Cancelled ({amountCancelled})</button>
        </li>
      </ul>
      <div className="tab-content" id="myTabContent">
        <div className="tab-pane fade show active" id="Approved" role="tabpanel" aria-labelledby="home-tab">
          {RequestSummaryByStatus('approved', year)}
        </div>
        <div className="tab-pane fade" id="Pending" role="tabpanel" aria-labelledby="profile-tab">
          {RequestSummaryByStatus('pending', year)}
        </div>
        <div className="tab-pane fade" id="Rejected" role="tabpanel" aria-labelledby="contact-tab">
          {RequestSummaryByStatus('denied', year)}
        </div>
        <div className="tab-pane fade" id="Cancelled" role="tabpanel" aria-labelledby="contact-tab">
          {RequestSummaryByStatus('canceled', year)}
        </div>
      </div>
      </div>
    </div>
  );
}