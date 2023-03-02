import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import configureStore from './store/index';
import csrfFetch, { restoreCSRF } from './store/csrf';
import * as sessionActions from './store/session';
import * as trailActions from './store/trails'
import * as parkActions from './store/parks'

const store = configureStore();

if (process.env.NODE_ENV !== 'production') {
  window.store = store;
  window.csrfFetch = csrfFetch;
  window.sessionActions = sessionActions;
  window.trailActions = trailActions;
  window.parkActions = parkActions;
}

function Root() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
}

const renderApplication = () => {
  ReactDOM.render(
    <React.StrictMode>
      <Root />
    </React.StrictMode>,
    document.getElementById('root')
  );
}


if (
  sessionStorage.getItem("X-CSRF-Token") === null ||
  sessionStorage.getItem("curretUser") === null) {
  // restoreCSRF().then(renderApplication);
  store.dispatch(sessionActions.restoreSession()).then(renderApplication);
  // store.dispatch(trailActions.restoreTrails()).then(renderApplication);
} else {
  renderApplication();
}