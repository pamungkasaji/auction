import React from 'react'
import {Link} from 'react-router-dom'
import { AppBar, Badge, Button, IconButton, Toolbar, Typography } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import auth from './../auth/auth-helper'
// import cart from './../cart/cart-helper'

const isActive = (history, path) => {
  if (history?.location?.pathname == path)
    return {color: '#bef67a'}
  else
    return {color: '#ffffff'}
}
const isPartActive = (history, path) => {
  if (history?.location?.pathname.includes(path))
    return {color: '#bef67a'}
  else
    return {color: '#ffffff'}
}
const Menu = (({history}) => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="h6" color="inherit">
        MERN Marketplace
      </Typography>
      <div>
        <Link to="/">
          <IconButton aria-label="Home" style={isActive(history, "/")}>
            <HomeIcon/>
          </IconButton>
        </Link>
        <Link to="/shops/all">
          <Button style={isActive(history, "/shops/all")}>All Shops</Button>
        </Link>
        <Link to="/auctions/all">
          <Button style={isActive(history, "/auctions/all")}>All Auctions</Button>
        </Link>
        {/* <Link to="/cart">
          <Button style={isActive(history, "/cart")}>
            Cart
            <Badge invisible={false} color="secondary" badgeContent={cart.itemTotal()} style={{'marginLeft': '7px'}}>
              <ShoppingCartIcon />
            </Badge>
          </Button>
        </Link>       */}
      </div>
      <div style={{'position':'absolute', 'right': '10px'}}><span style={{'float': 'right'}}>
      {
        !auth.isAuthenticated() && (<span>
          <Link to="/signup">
            <Button style={isActive(history, "/signup")}>Sign up
            </Button>
          </Link>
          <Link to="/signin">
            <Button style={isActive(history, "/signin")}>Sign In
            </Button>
          </Link>
        </span>)
      }
      {
        auth.isAuthenticated() && (<span>
          {auth.isAuthenticated().user.seller && (<>
            <Link to="/seller/shops"><Button style={isPartActive(history, "/seller/")}>My Shops</Button></Link>
            <Link to="/myauctions"><Button style={isPartActive(history, "/myauctions")}>My Auctions</Button></Link>
            </>
          )}
          <Link to={"/user/" + auth.isAuthenticated().user._id}>
            <Button style={isActive(history, "/user/" + auth.isAuthenticated().user._id)}>My Profile</Button>
          </Link>
          <Button color="inherit" onClick={() => {
              auth.clearJWT(() => history.push('/'))
            }}>Sign out</Button>
        </span>)
      }
      </span></div>
    </Toolbar>
  </AppBar>
))

export default Menu
