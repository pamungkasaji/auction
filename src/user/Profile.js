import React, { useState, useEffect } from 'react'
import { Avatar, Button, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Paper, Typography } from '@mui/material'
import { Edit, Person } from '@mui/icons-material'
import { makeStyles } from '@mui/styles'
import {Navigate, Link} from 'react-router-dom'
import DeleteUser from './DeleteUser'
import auth from './../auth/auth-helper'
import {read} from './api-user.js'
// import config from './../../config/config'
// import stripeButton from './../assets/images/stripeButton.png'
// import MyOrders from './../order/MyOrders'
import Auctions from './../auction/Auctions'
import {listByBidder} from './../auction/api-auction.js'

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 600,
    margin: 'auto',
    padding: theme.spacing(3),
    marginTop: theme.spacing(5)
  },
  title: {
    margin: `${theme.spacing(3)}px 0 ${theme.spacing(2)}px`,
    color: theme.palette.protectedTitle
  },
  stripe_connect: {
    marginRight: '10px',
  },
  stripe_connected: {
    verticalAlign: 'super',
    marginRight: '10px'
  },
  auctions: {
    maxWidth: 600,
    margin: '24px',
    padding: theme.spacing(3),
    backgroundColor: '#3f3f3f0d'
  }
}))

export default function Profile({ match }) {
  const classes = useStyles()
  const [user, setUser] = useState({})
  const [redirectToSignin, setRedirectToSignin] = useState(false)
  const jwt = auth.isAuthenticated()

  const [auctions, setAuctions] = useState([])

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal
    listByBidder({
      userId: match.params.userId
    }, {t: jwt.token}, signal).then((data) => {
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

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal
    read({
      userId: match.params.userId
    }, {t: jwt.token}, signal).then((data) => {
      if (data && data.error) {
        setRedirectToSignin(true)
      } else {
        setUser(data)
      }
    })

    return function cleanup(){
      abortController.abort()
    }

  }, [match.params.userId])

  if (redirectToSignin) {
    return <Navigate to='/signin'/>
  }
  return (
      <Paper className={classes.root} elevation={4}>
        <Typography variant="h6" className={classes.title}>
          Profile
        </Typography>
        <List dense>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <Person/>
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={user.name} secondary={user.email}/> 
            {
             auth.isAuthenticated().user && auth.isAuthenticated().user._id == user._id &&
             (<ListItemSecondaryAction>
               {/* {user.seller &&
                 (user.stripe_seller
                   ? (<Button variant="contained" disabled className={classes.stripe_connected}>
                       Stripe connected
                      </Button>)
                   : (<a href={"https://connect.stripe.com/oauth/authorize?response_type=code&client_id="+config.stripe_connect_test_client_id+"&scope=read_write"} className={classes.stripe_connect}>
                       <img src={stripeButton}/>
                      </a>)
                  )
                } */}
               <Link to={"/user/edit/" + user._id}>
                 <IconButton aria-label="Edit" color="primary">
                   <Edit/>
                 </IconButton>
               </Link>
               <DeleteUser userId={user._id}/>
             </ListItemSecondaryAction>)
            }
          </ListItem>
          <Divider/>
          <ListItem>
            <ListItemText primary={"Joined: " + (
              new Date(user.created)).toDateString()}/>
          </ListItem>
        </List>
        {/* <MyOrders/> */}
        <Paper className={classes.auctions} elevation={4}>
          <Typography type="title" color="primary">
              Auctions you bid in
          </Typography>
          <Auctions  auctions={auctions} removeAuction={removeAuction} />
        </Paper>
      </Paper>
    )
}
