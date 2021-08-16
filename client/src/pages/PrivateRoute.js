import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router';
import Loading from '../components/Loading';

function PrivateRoute({ component: Component, ...rest }) {
  const { user, isLoading } = useSelector((state) => state.app.auth);
  console.log(rest);
  if (isLoading) return <Loading />;
  if (user) {
    return <Route {...rest} render={(props) => <Component {...props} />} />;
  }
  return <Redirect to='/login' />
}

export default PrivateRoute;
