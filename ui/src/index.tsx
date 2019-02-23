import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider, createClient } from 'urql';
import App from './App';
import jwt from './utils/jwt'

const client = createClient({
  url: 'http://localhost:5000/graphql',
  fetchOptions: () => {
    const jwtToken = jwt.get()
    if (jwtToken) {
      return {
        headers: {
          Authorization: `Bearer ${jwtToken}`
        }
      }
    } else {
      return {}
    }
  }
})

ReactDOM.render(
  (
    <Provider value={client}>
      <Router>
        <App />
      </Router>
    </Provider>
  ),
  document.getElementById('root')
 );
