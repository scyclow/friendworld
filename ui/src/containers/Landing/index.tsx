import * as React from 'react';
import { Link } from 'react-router-dom'

const Landing = () => (
  <div>
    <div>
    aaaaaaa this is the landing page
      <h1>Friendworld</h1>
      <h2>A Place to Meet Friends</h2>
    </div>

    <Link to="/login">Login</Link>
    <Link to="/signup">Create Account</Link>
  </div>
)

export default Landing;
