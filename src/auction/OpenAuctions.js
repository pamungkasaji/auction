import React, {useState, useEffect} from 'react'
import { makeStyles } from '@mui/styles'
import { Paper, Typography } from '@mui/material'
import {listOpen} from './api-auction.js'
import Auctions from './Auctions'

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 600,
    margin: 'auto',
    padding: theme.spacing(3),
    marginTop: theme.spacing(5)
  },
  title: {
    margin: `${theme.spacing(1)}px 0 4px ${theme.spacing(1)}px` ,
    color: theme.palette.protectedTitle,
    fontSize: '1.2em'
  },
  addButton:{
    float:'right'
  },
  leftIcon: {
    marginRight: "8px"
  }
}))
export default function OpenAuctions(){
  const classes = useStyles()
  const [auctions, setAuctions] = useState([])
  const [redirectToSignin, setRedirectToSignin] = useState(false)

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal
    listOpen(signal).then((data) => {
      if (data.error) {
        setRedirectToSignin(true)
      } else {
        setAuctions(data)
      }
    })
    return function cleanup(){
      abortController.abort()
    }
  }, [])

  const removeAuction = (auction) => {
    const updatedAuctions = [...auctions]
    const index = updatedAuctions.indexOf(auction)
    updatedAuctions.splice(index, 1)
    setAuctions(updatedAuctions)
  }
    return (
    <div>
      <Paper className={classes.root} elevation={4}>
        <Typography type="title" className={classes.title}>
          All Auctions
        </Typography>
        <Auctions auctions={auctions} removeAuction={removeAuction}/>
      </Paper>
    </div>)
}