import React from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { findAllAdminTypes } from '../../lib/api/timeoff/type';
import { IType } from '../../lib/domain/timeoff/IType';

export interface CreateRequestPopupProps {
  userId?: number;
  visibility: boolean;
  closeModal: () => void;
  createNewRequest: (form: any) => void;
}

export const CreateRequestCoachModal: React.FC<CreateRequestPopupProps> = ({ userId, visibility, closeModal, createNewRequest }) => {
  const [types, setTypes] = React.useState<IType[]>();
  
  React.useEffect(() => {
    const fillTypes = async() => {
      const result = await findAllAdminTypes();
      setTypes(result);
    };
    fillTypes();
  }, [])

  return (
    <>
      <Modal show={visibility} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Create Request</Modal.Title>
      </Modal.Header>
        <Modal.Body className="pb-4">
          <Form id="createRequestForm" onSubmit={createNewRequest}>
            <Form.Group>
              <Form.Control id="userId" name="userId" type="hidden" value={userId} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label className="mb-2">Time-off type</Form.Label>
              <Form.Select id="type" name="type" required>
                <option value="">Select option</option>
                { types?.map((type) => <option value={type.id}>{type.name}</option>) }
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label htmlFor="start" className="mt-3 mb-2">Start date</Form.Label>
              <Form.Control id="start" name="start" type="date" required />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label htmlFor="end" className="light-gray-text-2 mt-3 mb-2">End date</Form.Label>
              <Form.Control id="end" name="end" type="date" required />
            </Form.Group>
            <Form.Group className="mb-1">
              <Form.Label htmlFor="end" className="light-gray-text-2 mt-3 mb-2">Comment</Form.Label>
              <Form.Control as="textarea" id="comment" name="comment" required />
              <Form.Text muted>Comment limit 300 characters</Form.Text>
            </Form.Group>
            <Button className="mt-4" variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}