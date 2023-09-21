import React from 'react';

import Movie from './Movie';
import classes from './MoviesList.module.css';

const MovieList = (props) => {
  return (
    <ul className={classes['movies-list']}>
      {props.movies.map((movie) => (
        <Movie
          key={movie.id}
          title={movie.title}
          release_at={movie.release_at}
          summary={movie.summary}
        />
      ))}
    </ul>
  );
};

export default MovieList;
