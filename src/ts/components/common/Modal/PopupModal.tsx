import { Modal } from '@mui/material';
import { ModalProps } from '@mui/material/Modal';

import classes from './styles.module.scss';

export interface PopupModalProps extends ModalProps {}

export const PopupModal = ({ className, children, ...props }: PopupModalProps) => {
  return (
    <Modal {...props}>
      <div className={classes.root}>{children}</div>
    </Modal>
  );
};
