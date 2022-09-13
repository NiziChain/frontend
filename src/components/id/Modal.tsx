import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { CircularProgress, Grid } from '@mui/material'
import { useState } from 'react'

const BoxStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'silver',
  color: 'black',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

const TypographyStyle = {
  // display:"grid",
  // bgcolor: "blue",
  // color:"red",
  // gap:20,
}

export const useModal = () => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return {
    open,
    setOpen,
    handleOpen,
    handleClose,
  }
}

//@ts-ignore
const Model = ({open,className,children}) => {
  //const [open, setOpen] = useState(false)
  const {setOpen,handleClose} = useModal();
  //const handleOpen = () => setOpen(true)
  //const handleClose = () => setOpen(false)

  const [loading, setLoading] = useState(false)
  const startLoading = () => {
    setOpen(false)
    setLoading(true)
  }
  const finishLoading = () => setLoading(false)

  const [register, setComplete] = useState(false)
  const completeRegister = () => {
    setLoading(false)
    setComplete(true)
  }
  const finishRegister = () => setComplete(false)

  return (
    <div>
      {/* <Button onClick={handleOpen}>Open Modal</Button> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <div>{children}</div>
      </Modal>

    </div>
  )
}

export default Model
