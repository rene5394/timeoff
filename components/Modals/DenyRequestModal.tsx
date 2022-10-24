import React from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { IRequestData } from '../RequestOverview/Admin/RequestTable/RequestTable';
import Moment from 'moment';

export interface DenyRequestModalProps {
  requestData: IRequestData;
  visibility: boolean;
  transactionStatus: number;
  denyRequest: (form: any) => void;
  closeModal: () => void;
}

export const DenyRequestModal: React.FC<DenyRequestModalProps> = ({ requestData, visibility, transactionStatus, denyRequest, closeModal }) => {
  return (
    <>
      <Modal show={visibility} onHide={closeModal}>
      <Modal.Header className="border-0" closeButton>
      </Modal.Header>
        <Modal.Body className="pb-4">
          <p className="text-center text-danger h2">
            <i className="bi bi-x-circle-fill"></i>
          </p>
          <h2 className="text-danger text-center mb-3">Are you sure you want to<br /> deny this request?</h2>
          <p className="mx-5"><b>User:</b> {requestData?.name}</p>
          <p className="mx-5"><b>Duration:</b> {requestData?.duration?.toString()}</p>
          <p className="mx-5"><b>From:</b> {Moment(requestData?.startDate).format('MM-DD-YYYY')}</p>
          <p className="mx-5"><b>To:</b> {Moment(requestData?.endDate).format('MM-DD-YYYY')}</p>
        </Modal.Body>
        <Modal.Footer className="border-0">
          <Button variant="secondary" className="px-4" onClick={closeModal}>No</Button>
          <Form onSubmit={denyRequest}>
          <Form.Control id="requestId" name="requestId" type="hidden" value={requestData?.id} />
            <Form.Control id="transactionStatusId" name="transactionStatusId" type="hidden" value={transactionStatus} />
            <Button variant="primary" className="px-4" type="submit">Yes</Button>
          </Form>
        </Modal.Footer>
      </Modal>
    </>
  );
}