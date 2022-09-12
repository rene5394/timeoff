interface ModalTextProps {
    title: string;
    body: string;
  }

export interface IModalProps {
    text?: ModalTextProps;
    visibility: boolean;
    closeModal: () => void;
  }
  