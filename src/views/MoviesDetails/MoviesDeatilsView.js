import { useState, useEffect, Suspense, lazy } from 'react';
import {
  NavLink,
  useParams,
  useRouteMatch,
  Route,
  useHistory,
  useLocation,
} from 'react-router-dom';

import api from '../../services/moviesApi';
import Status from '../../services/status';
import baseImageURL from '../../services/baseImg';
import ErrorView from '../NotFound/NotFoundView';
import Loader from '../../components/Loader/Loader';
import noImageFound from '../../Images/noimage.jpg';
import styles from '../MoviesDetails/MoviesDetailsView.module.css';

const Cast = lazy(() => import('../CastView/CastView'));
const Reviews = lazy(() => import('../ReviewsView/RevView'));

export default function MovieDetailsPage() {
  const history = useHistory();
  const location = useLocation();
  const [movie, setMovie] = useState(null);
  const { movieId } = useParams();
  const { url, path } = useRouteMatch();
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);

  useEffect(() => {
    setStatus(Status.PENDING);
    api
      .getMovieById(movieId)
      .then(({ poster_path, original_title, popularity, overview, genres }) => {
        setMovie({
          src: poster_path
            ? `${baseImageURL}${poster_path}`
            : `${noImageFound}`,
          title: original_title,
          score: popularity.toFixed(1),
          overview,
          genres,
        });
        setStatus(Status.RESOLVED);
      })
      .catch(error => {
        console.log(error);
        setError(error);
        setStatus(Status.REJECTED);
      });
  }, [movieId, error]);

  const goBack = () => {
    history.push(location?.state?.from ?? '/');
  };

  return (
    <main>
      <button onClick={goBack} type="button" className={styles.btn}>
        &#171;
      </button>

      {status === Status.PENDING && <Loader />}

      {status === Status.REJECTED && <ErrorView />}

      {status === Status.RESOLVED && (
        <>
          <div className={styles.wrapper}>
            <img className={styles.image} src={movie.src} alt={movie.title} />
            <div className={styles.description}>
              <h2 className={styles.movieTitle}>{movie.title}</h2>
              <h3 className={styles.title}>Score</h3>
              <p className={styles.info}>{movie.score}</p>
              <h3 className={styles.title}>About</h3>
              <p className={styles.info}>{movie.overview}</p>
              <h3 className={styles.title}>Genres</h3>
              <ul className={styles.genre}>
                {movie.genres.map(genre => (
                  <li key={genre.id}>{genre.name}</li>
                ))}
              </ul>
            </div>
          </div>
          <ul className={styles.submenu}>
            <li>
              <NavLink
                to={{
                  pathname: `${url}/cast`,
                  state: {
                    from: location.state ? location.state.from : '/',
                  },
                }}
                className={styles.submenuItem}
                activeClassName={styles.activeSubmenuItem}
              >
                Cast
              </NavLink>
            </li>
            <li>
              <NavLink
                to={{
                  pathname: `${url}/reviews`,
                  state: {
                    from: location.state ? location.state.from : '/',
                  },
                }}
                className={styles.submenuItem}
                activeClassName={styles.activeSubmenuItem}
              >
                Reviews
              </NavLink>
            </li>
          </ul>

          {
            <Suspense fallback={<Loader />}>
              <Route path={`${path}/cast`}>
                {status === Status.RESOLVED && <Cast />}
              </Route>

              <Route path={`${path}/reviews`}>
                {status === Status.RESOLVED && <Reviews />}
              </Route>
            </Suspense>
          }
        </>
      )}
    </main>
  );
}
