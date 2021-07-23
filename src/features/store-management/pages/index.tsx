import { Box } from '@material-ui/core';
import { useAppDispatch } from 'app/hooks';
import * as React from 'react';
import { useEffect } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import AddEditStorePage from './AddEditStorePage';
import { storeActions } from '../storeSlice';
import ListStore from './ListStores';
import '@sweetalert2/theme-material-ui/material-ui.css';

export default function StoreFeatures() {
  const match = useRouteMatch();
  const dispatch = useAppDispatch();
  const ref = React.createRef();
  useEffect(() => {
    dispatch(storeActions.fetchStoreType());
  }, [dispatch]);
  return (
    <Box>
      <Switch>
        <Route path={match.path} exact>
          <ListStore />
        </Route>
        <Route path={`${match.path}/add`}>
          <AddEditStorePage ref={ref} />
        </Route>
        <Route path={`${match.path}/:storeId`}>
          <AddEditStorePage ref={ref} />
        </Route>
      </Switch>
    </Box>
  );
}
