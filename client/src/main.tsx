import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from 'store';
import { Provider } from 'react-redux';
import '@fullcalendar/react/dist/vdom';
import { createRoot } from 'react-dom/client';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
