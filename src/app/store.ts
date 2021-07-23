import { Action, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import adminLevelReducer from 'features/admin-level/adminLevelSlice';
import authReducer from 'features/auth/authSlice';
import poiBrandReducer from 'features/poi/poiBrandSlice';
import poiReducer from 'features/poi/poiSlice';
import storeReducer from 'features/store-management/storeSlice';
import templateReducer from 'features/template/templateSlice';
import createSagaMiddleware from 'redux-saga';
import { history } from 'utils';
import rootSaga from './rootSaga';

const rootReducer = combineReducers({
  router: connectRouter(history),
  auth: authReducer,
  template: templateReducer,
  stores: storeReducer,
  poi: poiReducer,
  adminLevel: adminLevelReducer,
  poiBrands: poiBrandReducer,
})

const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
    }).concat(sagaMiddleware, routerMiddleware(history)),
});
sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
