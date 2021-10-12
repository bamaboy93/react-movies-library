import { useState, useEffect } from 'react';
import { Link, useRouteMatch, useHistory, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

import api from '../../services/moviesApi';
import ErrorView from '../NotFound/NotFoundView';
import Loader from '../../components/Loader/Loader';
import Searchbar from '../../components/SearchBar/SearchBar';

import noImageFound from '../../Images/noimage.jpg';
import styles from '../HomePage/HomeView.module.css';
import Status from '../../services/status';

export default function MoviesPage() {
  const history = useHistory();
  const location = useLocation();
  const { url } = useRouteMatch();
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);
  const [error, setError] = useState(null);

  const handleFormSubmit = newQuery => {
    if (newQuery === query) return;

    setQuery(newQuery);
    setMovies(null);
    setStatus(Status.IDLE);
    history.push({ ...location, search: `query=${newQuery}` });
  };

  useEffect(() => {
    if (location.search === '') {
      return;
    }

    const newSearch = new URLSearchParams(location.search).get('query');
    setQuery(newSearch);
  }, [location.search]);

  useEffect(() => {
    if (!query) return;

    setStatus(Status.PENDING);

    api
      .getMoviesByQuery(query)
      .then(results => {
        if (results.length === 0) {
          toast.error(`No movies found on ${query}.`);
          setStatus(Status.REJECTED);
          return;
        }

        setMovies(results);
        setStatus(Status.RESOLVED);
      })
      .catch(error => {
        console.log(error);
        setError(error);
        setStatus(Status.REJECTED);
      });
  }, [query, error]);

  return (
    <>
      <Searchbar onSubmit={handleFormSubmit} />

      {status === Status.PENDING && <Loader />}

      {status === Status.REJECTED && <ErrorView />}

      {status === Status.RESOLVED && (
        <>
          <ul className={styles.moviesList}>
            {movies.map(movie => (
              <li key={movie.id} className={styles.moviesItem}>
                <Link
                  to={{
                    pathname: `${url}/${movie.id}`,
                    state: { from: location },
                  }}
                >
                  <img
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                        : noImageFound
                    }
                    alt={movie.title}
                    className={styles.poster}
                  />
                </Link>
                <div className={styles.movieCard}>
                  <p className={styles.movieTitle}>{movie.title}</p>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}
