import * as React from 'react';
import './Card.css';

// Card to be used throughout the app. Sets standard border radius and shadow
const Card = props => {
  return <div className="card">{props.children}</div>;
};

export default Card;
