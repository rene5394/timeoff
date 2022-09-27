import React from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export interface BalanceDays {
  compDays: number;
  vacationDays: number;
}

export interface BalanceProps {
  balance: BalanceDays;
  visibility: boolean;
  closeModal: () => void;
}

export const EditBalanceModal: React.FC<BalanceProps> = ({ balance, visibility, closeModal }) => {
  return (
    <>
      <Modal show={visibility} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Balance</Modal.Title>
      </Modal.Header>
        <Modal.Body className="py-4">
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Comp Days</Form.Label>
              <Form.Control type="text" value={balance.compDays} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Vacations</Form.Label>
              <Form.Control type="text" value={balance.vacationDays} />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}