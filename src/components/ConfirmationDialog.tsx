import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect } from "react";

interface AlertDialogProp {
  openModal: boolean;
  title: string;
  text?: string | null;
  falseText: string;
  trueText: string;
  action: () => void;
  onClose: () => void;
}

export default function AlertDialog({
  openModal,
  title,
  text = null,
  falseText,
  trueText,
  action,
  onClose,
}: AlertDialogProp) {
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  useEffect(() => {
    setOpen(openModal);
  }, [openModal]);

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        {text && (
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {text}
            </DialogContentText>
          </DialogContent>
        )}
        <DialogActions>
          <Button onClick={handleClose}>{falseText}</Button>
          <Button
            onClick={() => {
              action();
              onClose();
            }}
            autoFocus
          >
            {trueText}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
