export type ModalProps = {
  title: string;
  isOpen: boolean;
  size?: 'small' | 'xsmall' | 'medium' | 'large';
  children: React.ReactNode;
  onRequestClose: () => void;
};