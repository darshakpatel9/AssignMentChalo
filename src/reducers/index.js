import { combineReducers } from 'redux';

export const addRouteReducer = (routeData = [], action) => {
  if (action.type === 'ADD_ROUTE') {
    return action.payload;
  }
  return routeData;
};
export const selectedRoutesCordReducer = (selectedRoutesPath = [], action) => {
  if (action.type === 'SET_SELECTED_ROUTES_FOR_POLYLINE') {
    return action.payload;
  }
  return selectedRoutesPath;
};

export default combineReducers({
  routes: addRouteReducer,
  selectedRoutesCord: selectedRoutesCordReducer,
});
