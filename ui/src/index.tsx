import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider, Client } from 'urql';
import App from './App';
import jwt from './utils/jwt'

const client = new Client({
  url: 'http://localhost:5000/graphql',
  fetchOptions: () => {
    const jwtToken = jwt.get()
    if (jwtToken) {
      return {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          'Content-Type': 'application/json'
        }
      }
    } else {
      return {}
    }
  }
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
