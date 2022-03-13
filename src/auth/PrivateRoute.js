import React from 'react'
import { Outlet, Navigate, useLocation } from 'react-router-dom'
import auth from './auth-helper'

const PrivateRoute = () => {
  let location = useLocation();

  if (auth.isAuthenticated()) {
    return <Outlet />;
  }

  return <Navigate to="/signin" state={{ from: location }} />;
}

// const PrivateRoute = ({ component: Component, ...rest }) => (
//   <Route {...rest} render={props => (
//     auth.isAuthenticated() ? (
//       <Component {...props}/>
//     ) : (
//       <Navigate to={{
//         pathname: '/signin',
//         state: { from: props.location }
//       }}/>
//     )
//   )}/>
// )

export default PrivateRoute
