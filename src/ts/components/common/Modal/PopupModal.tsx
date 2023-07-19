import { Modal } from '@mui/material';
import { ModalProps } from '@mui/material/Modal';

import classes from './styles.module.scss';

type PopupModalProps = ModalProps;

export const PopupModal = (props: PopupModalProps) => {
  const { children } = props;
  return (
    <Modal {...props}>
      <div className={classes.root}>{children}</div>
    </Modal>
  );
};
