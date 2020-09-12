import React from 'react';
import { Route, Switch } from 'react-router';
import { App as CalendarApp } from 'app/containers/App';
import { hot } from 'react-hot-loader';

export const App = hot(module)(() => (
  <Switch>
    <Route path="/" component={CalendarApp} />
  </Switch>
));
