import React from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export interface BalancePopupProps {
  balance?: UpdateBalance;
  setBalance(balance: UpdateBalance): void;
  visibility: boolean;
  closeModal: () => void;
  updateCurrentBalance: (form: any) => void;
}

export interface UpdateBalance {
  id?: number;
  userId?: number;
  compDays?: string;
  vacationDays?: string;
  comment?: string;
}

export const EditBalanceModal: React.FC<BalancePopupProps> = ({ balance, setBalance, visibility, closeModal, updateCurrentBalance }) => {
  const inputChange = () => {
    const balanceId: number = parseInt((document.getElementById('balanceId') as HTMLInputElement).value);
    const userId: number = parseInt((document.getElementById('userId') as HTMLInputElement).value);
    const compDays: string = (document.getElementById('compDays') as HTMLInputElement).value;
    const vacationDays: string = (document.getElementById('vacationDays') as HTMLInputElement).value;
    const comment: string = (document.getElementById('comment') as HTMLInputElement).value;

    setBalance({
      id: balanceId,
      userId: userId,
      compDays: compDays,
      vacationDays: vacationDays,
      comment: comment
    });
  }

  return (
    <>
      <Modal show={visibility} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Balance</Modal.Title>
      </Modal.Header>
        <Modal.Body className="pb-4">
          <Form id="editBalanceForm" onSubmit={updateCurrentBalance}>
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
            <Form.Group className="mb-0">
              <Form.Label>Vacations</Form.Label>
              <Form.Control id="vacationDays" name="vacationDays" type="text" pattern="[0-9]{1,2}" value={balance?.vacationDays} onChange={inputChange} required />
            </Form.Group>
            <Form.Group className="mb-1">
              <Form.Label htmlFor="end" className="light-gray-text-2 mt-3 mb-2">Comment</Form.Label>
              <Form.Control as="textarea" id="comment" name="comment" required />
              <Form.Text muted>Comment limit 300 characters</Form.Text>
            </Form.Group>
            <Button className="mt-3" variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}