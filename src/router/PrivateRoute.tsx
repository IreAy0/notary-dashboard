// doRefreshTokenAction,
import React, { useEffect } from 'react';
import { Redirect, Route, RouteProps, useLocation } from 'react-router-dom';
import { isAuthenticated } from 'utils';
import {  doSignOut } from 're-ducks/auth';
import { store } from '../index';

interface PrivateRouteProps extends RouteProps {
  component: any;
}

const PrivateRoute = ({ component: Component, ...rest }: PrivateRouteProps) => {
  const { pathname, search } = useLocation();
  // const refreshToken = localStorage.getItem('refreshToken');
  // const params = { type: 'notary', refresh_token: refreshToken };
  useEffect(() => {
    if (!pathname.includes('auth')) {
      localStorage.setItem('redirectTo', pathname  + search);
    }
  }, [pathname, search]);

  const getToken = localStorage.getItem("accessToken")

  const checkAuth = (props:any) => {
    if(isAuthenticated()){
      return <Component {...props} />
    }
    if(getToken === null){
      return <Redirect to={{ pathname: '/auth/sign-in/', state: { from: props.location } }} />
    }
    if (isAuthenticated() === false) {
      store.dispatch(doSignOut(() => {
        <Redirect to={{ pathname: '/auth/sign-in/', state: { from: props.location } }} />;
        window.location.reload(); 
      }));
      
      // store.dispatch(
      //   doRefreshTokenAction(
      //     { params },
      //     () => {
      //       window.location.reload();
      //     },
      //     (error: any) => {
         
      //     }
      //   )
      // )
    }

    return {};
  }

  return (
    <Route
      {...rest}
      render={(props) => checkAuth(props)}
    />
  );
};

export default PrivateRoute;

