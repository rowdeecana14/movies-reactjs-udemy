import React, { useEffect, useRef, useState } from 'react';

import classes from './AddMovie.module.css';

function AddMovie(props) {
  // const title_ref = useRef('');
  // const url_ref = useRef('');
  // const summary_ref = useRef('');
  // const release_at = useRef('');

  console.log("mounted movie")

  const [errors, setErrors] = useState(null);
  const form_ref = {
    title:  useRef(''),
    url:  useRef(''),
    summary:  useRef(''),
    release_at:  useRef('')
  };

  async function submitHandler(event) {
    event.preventDefault();
    const movie = {};

    Object.keys(form_ref).forEach((key) => {
      const ref = form_ref[key];
      movie[key] = ref.current.value;
    });

    const response = await props.onAddMovie(movie);

    if(response.status === 422 && !response.ok) {
      const data = await response.json();
      let response_errors = {};

      data.errors.forEach(error => {
        Object.keys(error).forEach((key) => {
          response_errors[key] = error[key];
        });
      });

      return setErrors(response_errors);
    }

    await props.getMovies()

    setErrors(null);
    resetForm();
  }

  function resetForm() {
    Object.keys(form_ref).forEach((key) => {
      const ref = form_ref[key];
      ref.current.value = '';
    });
  }

  return (
    <form onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='title'>Title</label>
        <input type='text' id='title' ref={form_ref.title} />
        { errors && errors.title && <div className={classes.error}>{errors.title}</div> }
      </div>
      <div className={classes.control}>
        <label htmlFor='url'>URL</label>
        <input type='url' id='url' ref={form_ref.url} />
        { errors && errors.url && <div className={classes.error}>{errors.url}</div> }
      </div>
      <div className={classes.control}>
        <label htmlFor='opening-text'>Summary</label>
        <textarea rows='5' id='opening-text' ref={form_ref.summary}></textarea>
        { errors && errors.summary && <div className={classes.error}>{errors.summary}</div> }
      </div>
      <div className={classes.control}>
        <label htmlFor='date'>Release Date</label>
        <input type='date' id='date' ref={form_ref.release_at} />
        { errors && errors.release_at && <div className={classes.error}>{errors.release_at}</div> }
      </div>
      <button>Add Movie</button>
    </form>
  );
}

export default AddMovie;