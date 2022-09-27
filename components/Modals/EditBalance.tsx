import React from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export interface BalanceProps {
  compDays: number;
  vacationDays: number;
  visibility: boolean;
  closeModal: () => void;
  updateBalance: () => void;
}

export const EditBalance: React.FC<BalanceProps> = ({ compDays, vacationDays, visibility, closeModal, updateBalance }) => {
  return (
    <>
      <Modal show={visibility} onHide={closeModal}>
        <Modal.Body className="pt-5 pb-0">
          <Form onSubmit={updateBalance}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Comp Days</Form.Label>
              <Form.Control type="text" />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Vacations</Form.Label>
              <Form.Control type="text" />
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