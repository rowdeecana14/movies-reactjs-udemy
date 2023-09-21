import React from 'react';

import classes from './Movie.module.css';

const Movie = (props) => {
  return (
    <li className={classes.movie}>
      <h2>{props.title}</h2>
      <h3>{props.release_at}</h3>
      <p>{props.summary}</p>
    </li>
  );
};

export default Movie;
