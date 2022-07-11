import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import { legacy_createStore as createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { GoogleOAuthProvider } from '@react-oauth/google';

import reducers from './reducers';

import App from './App';

const store = createStore(reducers, compose(applyMiddleware(thunk)));

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId="1012552873951-ul6qmrc7hn4ncotupipgvk5cb1uembik.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  </Provider>
)
