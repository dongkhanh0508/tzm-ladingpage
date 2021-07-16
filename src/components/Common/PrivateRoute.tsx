import * as React from 'react';
import { Redirect, RouteProps, Route } from 'react-router-dom';

export function PrivateRoute(props: RouteProps) {
  //check user is login
  const isLogIn = Boolean(localStorage.getItem('access_token'));
  if (!isLogIn) return <Redirect to="/login" />;

  return <Route {...props} />;
}
