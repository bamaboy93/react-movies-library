import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/moviesApi';

import Status from '../../services/status';

export default function Reviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .getMovieReviews(movieId)
      .then(results => {
        if (results.length === 0) {
          throw new Error("Sorry. We don't have any reviews on this movie yet");
        }
        setReviews(results);
        setStatus(Status.RESOLVED);
      })
      .catch(error => {
        setError(error);
        setStatus(Status.REJECTED);
      });
  }, [movieId]);

  return (
    <>
      {status === Status.RESOLVED && (
        <ul>
          {reviews.map(review => (
            <li key={review.id}>
              <h2>{review.author}</h2>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      )}

      {status === Status.REJECTED && <p>{error.message}</p>}
    </>
  );
}
