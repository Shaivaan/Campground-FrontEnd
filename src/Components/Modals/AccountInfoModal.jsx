import { useState } from "react";
import { Button, Modal, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { TbInfoHexagon } from "react-icons/tb";

export const AccountInfoModal = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "white",
    padding: "20px",
    borderRadius: "10px",
    // boxShadow: 24,
    // p: 4,
  };

  return (
    <>
      <TbInfoHexagon style={{ cursor: "pointer" }} onClick={handleOpen} />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Account Type
          </Typography>
          <ul>
            <li>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Choose account <b>User</b> if you are exploring for a camp.
              </Typography>
            </li>
            <li>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Choose account <b>Admin</b> if you owns a campground and make
                some business.
              </Typography>
            </li>
          </ul>
        </Box>
      </Modal>
    </>
  );
};
