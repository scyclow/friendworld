import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider, createClient } from 'urql';
import App from './App';
import jwt from './utils/jwt'

jwt.setTrackingToken()

const isProd = process.env.NODE_ENV === 'production'
const client = createClient({
  url: isProd
    ? 'https://friendworld.appspot.com/graphql'
    : 'http://localhost:5000/graphql',
  fetchOptions: () => {
    const jwtToken = jwt.get()
    if (jwtToken) {
      return {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          trackingToken: jwt.getTrackingToken() || ''
        }
      }
    } else {
      return {
        headers: {
          Authorization: '',
          trackingToken: jwt.getTrackingToken() || ''
        }
      }
    }
  }
})

const hours = new Date().getHours();
if (hours < 5 || hours >= 22) document.body.className = 'nightmode';

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
