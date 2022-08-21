import React from 'react';
import { useRoutes } from 'react-router-dom';
import { RouteName, RoutePath } from '$src/constants';
import Dashboard from '$src/containers/Dashboard';
import List from '$src/containers/List';
import Setting from '$src/containers/Setting';
import Doc from '$src/containers/Doc';
import NotMatch from '$src/containers/NotMatch';

const routes = [
  {
    path: '/',
    element: <Dashboard />,
    children: [
      { index: true, element: <NotMatch /> },
      {
        path: RouteName.Setting,
        element: <Setting />,
      },

      {
        path: RouteName.List,
        element: <List />,
      },
      {
        path: RoutePath.doc(':id'),
        element: <Doc />,
      },
    ],
  },
  {
    path: '*',
    element: <NotMatch />,
  },
];

function Routes() {
  const element = useRoutes(routes);
  return element;
}

export default Routes;
