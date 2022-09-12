import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { CircularProgress, Grid } from "@mui/material";

const BoxStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "silver",
  color: "black",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const TypographyStyle = {
  // display:"grid",
  // bgcolor: "blue",
  // color:"red",
  // gap:20,
}

const IdComfirmationModel = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [loading, setLoading] = React.useState(false);
  const startLoading = () => {
    setOpen(false);
    setLoading(true);
  }
  const finishLoading = () => setLoading(false);

  const [register, setComplete] = React.useState(false);
  const completeRegister = () => {
    setLoading(false);
    setComplete(true);
  }
  const finishRegister = () => setComplete(false);

  return (
    <div>
      <Button onClick={handleOpen}>Open Modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
          <Box sx={BoxStyle}>
            <Typography id="modal-modal-title" variant="h6" component="h2" sx={TypographyStyle}>
              IDを発行しますか？
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
            <Button onClick={startLoading}>はい</Button>
            <Button onClick={handleClose}>いいえ</Button>
          </Box>
      </Modal>
      <Modal
        open={loading}
        onClose={finishLoading}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
          <Box sx={BoxStyle}>
          {/* <Grid
              container
              spacing={0}
              direction="column"
              alignItems="center"
              justify="center"
              style={{ minHeight: '12vh' }}
            >
              <Grid item xs={3}><CircularProgress color="secondary" /></Grid>   
            </Grid> */}
            <Typography id="a" variant="h6" component="h2">
              IDを発行中です
            </Typography>
            <CircularProgress color="secondary" />
            {/* ↓　ここでローディングの終了をブロックチェーン側から受け取る */}
            <Button onClick={completeRegister}>ローディング終わり！</Button>
          </Box>
      </Modal>
      <Modal
        open={register}
        onClose={finishRegister}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
          <Box sx={BoxStyle}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              IDの発行が完了しました
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              続けて作品の登録を行います
            </Typography>
            <Button onClick={finishRegister}>作品登録に進む</Button>
          </Box>
      </Modal>
    </div>
  )
}

export default IdComfirmationModel