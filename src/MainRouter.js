import React from 'react'
import {Route, Routes} from 'react-router-dom'
import Home from './core/Home'
import Users from './user/Users'
import Signup from './user/Signup'
import Signin from './auth/Signin'
import EditProfile from './user/EditProfile'
import Profile from './user/Profile'
import PrivateRoute from './auth/PrivateRoute'
import Menu from './core/Menu'
// import NewShop from './shop/NewShop'
// import Shops from './shop/Shops'
// import MyShops from './shop/MyShops'
// import Shop from './shop/Shop'
// import EditShop from './shop/EditShop'
import NewProduct from './product/NewProduct'
import EditProduct from './product/EditProduct'
import Product from './product/Product'
// import Cart from './cart/Cart'
// import StripeConnect from './user/StripeConnect'
// import ShopOrders from './order/ShopOrders'
// import Order from './order/Order'
// import MyAuctions from './auction/MyAuctions'
import OpenAuctions from './auction/OpenAuctions'
// import NewAuction from './auction/NewAuction'
// import EditAuction from './auction/EditAuction'
import Auction from './auction/Auction'

const MainRouter = () => {
  return (<div>
      <Menu/>
      <Routes>
        <Route exact path="/" element={<Home />}/>
        <Route path="/users" element={<Users />}/>
        <Route path="/signup" element={<Signup />}/>
        <Route path="/signin" element={<Signin />}/>
        <Route element={<PrivateRoute />}>
          <Route path="/user/edit/:userId" element={<EditProfile />} />
        </Route>
        <Route path="/user/:userId" element={<Profile />}/>

        {/* <Route path="/cart" element={Cart}/> */}
        <Route path="/product/:productId" element={<Product />}/>

        {/* <Route path="/shops/all" element={Shops}/>
        <Route path="/shops/:shopId" element={Shop}/>

        <Route path="/order/:orderId" element={Order}/>
        <PrivateRoute path="/seller/orders/:shop/:shopId" element={ShopOrders}/>

        <PrivateRoute path="/seller/shops" element={MyShops}/>
        <PrivateRoute path="/seller/shop/new" element={NewShop}/>
        <PrivateRoute path="/seller/shop/edit/:shopId" element={EditShop}/> */}

        <Route element={<PrivateRoute />}>
          <Route path="/seller/:shopId/products/new" element={<NewProduct />}/>
          <Route path="/seller/:shopId/:productId/edit" element={<EditProduct />}/>
        </Route>

        {/* <Route path="/seller/stripe/connect" element={StripeConnect}/>
        <PrivateRoute path="/myauctions" element={MyAuctions}/>
        <PrivateRoute path="/auction/new" element={NewAuction}/>
        <PrivateRoute path="/auction/edit/:auctionId" element={EditAuction}/> */}
        <Route path="/auction/:auctionId" element={<Auction />}/>
        <Route path="/auctions/all" element={<OpenAuctions />}/>
      </Routes>
    </div>)
}

export default MainRouter
