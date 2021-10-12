import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from '../HomePage/HomeView.module.css';
import Status from '../../services/status';
import api from '../../services/moviesApi';

function HomePage() {
  const [movies, setMovies] = useState(null);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);

  useEffect(() => {
    setStatus(Status.PENDING);
    api
      .getPopularMovies()
      .then(results => {
        setMovies(results);
        setStatus(Status.RESOLVED);
      })
      .catch(error => {
        console.log(error);
        setError(error);
        setStatus(Status.REJECTED);
      });
  }, [error]);

  return (
    <main>
      <h1 className={styles.title}>Trending Movies Today</h1>

      {status === Status.PENDING}

      {status === Status.REJECTED}

      {status === Status.RESOLVED && (
        <>
          <ul className={styles.moviesList}>
            {movies.map(({ id, poster_path, title }) => (
              <li key={id} className={styles.moviesItem}>
                <Link
                  to={{
                    pathname: `movies/${id}`,
                  }}
                >
                  <img
                    src={
                      (poster_path = `https://image.tmdb.org/t/p/w500/${poster_path}`)
                    }
                    alt={title}
                    className={styles.poster}
                  />
                </Link>
                <div className={styles.movieCard}>
                  <p className={styles.movieTitle}>{title}</p>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </main>
  );
}

export default HomePage;
