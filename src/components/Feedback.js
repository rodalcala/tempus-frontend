import React from 'react';
import { Link } from 'react-router-dom';
import './Feedback.css';

const Feedback = ({ location }) => (
  <div>
    <h1>Feedback page for {location.state.box.name}</h1>
    <Link to="/">Done with the feedback</Link>
  </div>
)

export default Feedback;
