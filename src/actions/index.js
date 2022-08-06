export const addRoute = (routeData = {}) => {
  return (dispatch, getState) => {
    const state = getState();
    dispatch({
      type: 'ADD_ROUTE',
      payload: [...state.routes, routeData],
    });
  };
};

export const deleteRoute = index => {
  return (dispatch, getState) => {
    const state = getState();
    let newRoutes = state.routes;
    newRoutes.splice(index, 1);
    dispatch({
      type: 'ADD_ROUTE',
      payload: newRoutes,
    });
  };
};

export const setSelectedRoutes = (selectedRoutes = []) => {
  return (dispatch, getState) => {
    const state = getState();
    const routes = state.routes;
    let selectedRoutesPath = [];
    //
    selectedRoutes.forEach(value => {
      const selectedRoute = routes[value];
      let path = [
        {
          lat: parseFloat(selectedRoute.routStartLat),
          lng: parseFloat(selectedRoute.routStartLong),
        },
      ];
      selectedRoute.stops &&
        selectedRoute.stops.forEach(stop => {
          path.push({ lat: parseFloat(stop.lat), lng: parseFloat(stop.long) });
        });
      path.push({
        lat: parseFloat(selectedRoute.routeEndLat),
        lng: parseFloat(selectedRoute.routeEndLong),
      });
      selectedRoutesPath.push(path);
    });

    dispatch({
      type: 'SET_SELECTED_ROUTES_FOR_POLYLINE',
      payload: selectedRoutesPath,
    });
  };
};
