export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export interface ModalDeleteProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string
}