import React from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export interface BalancePopupProps {
  balance?: Balance;
  setBalance(balance: Balance): void;
  visibility: boolean;
  closeModal: () => void;
  createNewBalance: (form: any) => void;
  updateCurrentBalance: (form: any) => void;
}

export interface Balance {
  id?: number;
  userId?: number;
  compDays?: string;
  vacationDays?: string;
}

export const EditBalanceModal: React.FC<BalancePopupProps> = ({ balance, setBalance, visibility, closeModal, createNewBalance, updateCurrentBalance }) => {
  const inputChange = () => {
    const balanceId: number = parseInt((document.getElementById('balanceId') as HTMLInputElement).value);
    const userId: number = parseInt((document.getElementById('userId') as HTMLInputElement).value);
    const compDays: string = (document.getElementById('compDays') as HTMLInputElement).value;
    const vacationDays: string = (document.getElementById('vacationDays') as HTMLInputElement).value;

    setBalance({
      id: balanceId,
      userId: userId,
      compDays: compDays,
      vacationDays: vacationDays
    });
  }

  return (
    <>
      <Modal show={visibility} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Balance</Modal.Title>
      </Modal.Header>
        <Modal.Body className="pb-4">
          <Form id="editBalanceForm" onSubmit={balance?.id ? updateCurrentBalance : createNewBalance }>
            <Form.Group>
              <Form.Control id="balanceId" name="balanceId" type="hidden" value={balance?.id} />
            </Form.Group>
            <Form.Group>
              <Form.Control id="userId" name="userId" type="hidden" value={balance?.userId} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Comp Days</Form.Label>
              <Form.Control id="compDays" name="compDays" type="text" pattern="[0-9]{1,2}" value={balance?.compDays} onChange={inputChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Vacations</Form.Label>
              <Form.Control id="vacationDays" name="vacationDays" type="text" pattern="[0-9]{1,2}" value={balance?.vacationDays} onChange={inputChange} required />
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