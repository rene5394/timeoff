import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export interface ErrorModalTextProps {
  title: string;
  body: string[];
}

export interface ErrorModalProps {
  text?: ErrorModalTextProps;
  visibility: boolean;
  closeModal: () => void;
}

export const ErrorModal: React.FC<ErrorModalProps> = ({ text, visibility, closeModal }) => {
  return (
    <>
      <Modal show={visibility} onHide={closeModal}>
        <Modal.Body className="pt-5 pb-0">
          <p className="text-center text-danger h2">
            <i className="bi bi-x-circle-fill"></i>
          </p>
          <h2 className="text-danger text-center mb-3">{text?.title}</h2>
          <ul>
            { text?.body.map((bodyText) => <li key={text.title}>{bodyText}</li>)}
          </ul>
        </Modal.Body>
        <Modal.Footer className="pt-0 border-0">
          <Button variant="danger" className="d-block m-auto mb-4" onClick={closeModal}>
            TRY AGAIN
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}