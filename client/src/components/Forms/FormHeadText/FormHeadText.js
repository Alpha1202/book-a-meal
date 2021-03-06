import React from 'react';

const formHeadText = props => (
  <h3>
    <span className="Red">B</span>ook <span className="Red">A</span> Mea<span className="Red">l</span> {props.user.charAt(0).toUpperCase() + props.user.slice(1)}{' '}
    <span className="Red">{props.type.charAt(0).toUpperCase() + props.type.slice(1)}</span>
  </h3>
);

export default formHeadText;
