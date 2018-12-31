import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider, Client } from 'urql';
import App from './App';

const client = new Client({
  url: 'http://localhost:5000/graphql'
})

ReactDOM.render(
  (
    <Provider client={client}>
      <Router>
        <App />
      </Router>
    </Provider>
  ),
  document.getElementById('root')
 );
