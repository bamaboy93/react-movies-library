import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import api from '../../services/moviesApi';
import ErrorView from '../NotFound/NotFoundView';
import Loader from '../../components/Loader/Loader';
import noImageFound from '../../Images/noimage.jpg';
import Status from '../../services/status';
import baseImageURL from '../../services/baseImg';
import styles from './CastView.module.css';

export default function Cast() {
  const { movieId } = useParams();
  const [actors, setActors] = useState(null);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);

  useEffect(() => {
    api
      .getCastInfo(movieId)
      .then(cast => {
        setActors(cast);
        setStatus(Status.RESOLVED);
      })
      .catch(error => {
        console.log(error);
        setError(error);
        setStatus(Status.REJECTED);
      });
  }, [movieId, error]);

  return (
    <>
      {status === Status.PENDING && <Loader />}

      {status === Status.REJECTED && <ErrorView />}

      {status === Status.RESOLVED && (
        <ul className={styles.cast}>
          {actors.map(actor => (
            <li key={actor.id} className={styles.item}>
              <img
                src={
                  actor.profile_path
                    ? `${baseImageURL}${actor.profile_path}`
                    : noImageFound
                }
                alt={actor.original_name}
                className={styles.photo}
              />
              <h4 className={styles.name}>{actor.original_name}</h4>
              <p className={styles.character}>{actor.character}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
