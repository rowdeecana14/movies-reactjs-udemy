import React, { useEffect, useState, useCallback } from "react";

import MoviesList from "./components/MoviesList";
import AddMovie from "./components/AddMovie";
import "./App.css";

function App() {
  console.log("mounted app")
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getMovies = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch("http://127.0.0.1:1010/api/v1/movies");

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();
      const filtered = data.data.rows.map((movie) => {
        return {
          id: movie._id,
          title: movie.title,
          summary: movie.summary,
          release_at: movie.release_at,
        };
      });

      setMovies(filtered);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  }, []);

  let content = <p>Found no movies.</p>;

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  async function addMovieHandler(movie) {
    const response = await fetch("http://127.0.0.1:1010/api/v1/movies", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(movie)
    })
    return response;
  }

  useEffect(() => {
    getMovies();
  }, [getMovies]);

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} getMovies={getMovies} />
      </section>
      <section>
        <button onClick={getMovies}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
