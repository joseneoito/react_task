import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AlertDialog({open, handleClose, title, description, handleProceed = null}) {

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {title}
        </DialogTitle>
        <DialogContent>
            <DialogContentText id="alert-dialog-description">
            {description}
            </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{handleProceed? "Cancel" :"Ok"}</Button>
        </DialogActions>
       {handleProceed &&
        <DialogActions>
          <Button onClick={handleProceed}>Delete</Button>
        </DialogActions>}
      </Dialog>
    </div>
  );
}

