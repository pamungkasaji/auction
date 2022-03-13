import React, {useState} from 'react'
import PropTypes from 'prop-types'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Home';
import auth from '../auth/auth-helper'
import {remove} from './api-auction.js'

export default function DeleteAuction(props) {
  const [open, setOpen] = useState(false)
  
  const jwt = auth.isAuthenticated()
  const clickButton = () => {
    setOpen(true)
  }
  const deleteAuction = () => {
    remove({
      auctionId: props.auction._id
    }, {t: jwt.token}).then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        setOpen(false)
        props.onRemove(props.auction)
      }
    })
  }
  const handleRequestClose = () => {
    setOpen(false)
  }
    return (<span>
      <IconButton aria-label="Delete" onClick={clickButton} color="secondary">
        <DeleteIcon/>
      </IconButton>

      <Dialog open={open} onClose={handleRequestClose}>
        <DialogTitle>{"Delete "+props.auction.itemName}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Confirm to delete your auction {props.auction.itemName}.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRequestClose} color="primary">
            Cancel
          </Button>
          <Button onClick={deleteAuction} color="secondary" autoFocus="autoFocus">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </span>)
}
DeleteAuction.propTypes = {
  auction: PropTypes.object.isRequired,
  onRemove: PropTypes.func.isRequired
}