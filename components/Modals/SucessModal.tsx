import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export interface SuccessModalTextProps {
  title: string;
  body: string;
}

export interface SuccessModalProps {
  text?: SuccessModalTextProps;
  visibility: boolean;
  closeModal: () => void;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({ text, visibility, closeModal }) => {
  return (
    <>
      <Modal show={visibility} onHide={closeModal}>
        <Modal.Body className="pt-5 pb-0">
          <p className="text-center text-success h2">
            <i className="bi bi-check-circle-fill"></i>
          </p>
          <h2 className="text-success text-center mb-3">{text?.title}</h2>
          <p className="text-center">{text?.body}</p>  
        </Modal.Body>
        <Modal.Footer className="pt-0 border-0">
          <Button variant="success" className="d-block m-auto mb-4" onClick={closeModal}>
            OKAY
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}