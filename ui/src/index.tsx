import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App'
import jwt from './utils/jwt'

jwt.setTrackingToken()


const hours = new Date().getHours();
if (hours < 5 || hours >= 22) document.body.className = 'nightmode';

ReactDOM.render(
  (
    <Router>
      <App />
    </Router>
  ),
  document.getElementById('root')
 );
