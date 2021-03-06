import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import BasicDatePicker from './DateTimePicker';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [successModal, setSuccessModal] = React.useState(false);

  const onSuccessModal = () => {
    setSuccessModal(true);
  }

  return (
    <div>
      <Button onClick={handleOpen}>Book now</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <BasicDatePicker onBooking={handleClose} onSuccessBooking={onSuccessModal} />
        </Box>
      </Modal>
      {/* {successModal && 
        <Modal
          open={open}
          onClose={handleClose}>
            Booked successfully.
        </Modal>
      } */}
    </div>
  );
}

