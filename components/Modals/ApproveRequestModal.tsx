import React from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { IRequestData } from '../RequestOverview/Admin/RequestTable/RequestTable';
import Moment from 'moment';

export interface BalancePopupProps {
  requestData: IRequestData;
  visibility: boolean;
  closeModal: () => void;
}

export const ApproveRequestModal: React.FC<BalancePopupProps> = ({ requestData, visibility, closeModal }) => {
  return (
    <>
      <Modal show={visibility} onHide={closeModal}>
      <Modal.Header className="border-0" closeButton>
      </Modal.Header>
        <Modal.Body className="pb-4">
          <p className="text-center text-success h2">
            <i className="bi bi-check-circle-fill"></i>
          </p>
          <h2 className="text-success text-center mb-3">Are you sure you want to<br /> approve this request?</h2>
          <p className="mx-5"><b>User:</b> {requestData?.name}</p>
          <p className="mx-5"><b>Duration:</b> {`${requestData?.duration?.toString()} day(s)`}</p>
          <p className="mx-5"><b>From:</b> {Moment(requestData?.startDate).format('MM-DD-YYYY')}</p>
          <p className="mx-5"><b>To:</b> {Moment(requestData?.endDate).format('MM-DD-YYYY')}</p>
        </Modal.Body>
        <Modal.Footer className="border-0">
          <Button variant="secondary" className="px-4" onClick={closeModal}>No</Button>
          <Button variant="primary" className="px-4">Yes</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}