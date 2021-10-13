// import { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// // import api from '../../services/moviesApi';

// import Status from '../../services/status';

// export default function Videos() {
//   const { movieId } = useParams();
//   const [videos, setVideos] = useState(null);
//   const [status, setStatus] = useState(Status.IDLE);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     api
//       .getMovieVideo(movieId)
//       .then(results => {
//         if (results.length === 0) {
//           throw new Error("Sorry. We don't have any videos for this movie yet");
//         }
//         setVideos(results);
//         setStatus(Status.RESOLVED);
//       })
//       .catch(error => {
//         setError(error);
//         setStatus(Status.REJECTED);
//       });
//   }, [movieId]);

//   return (
//     <>
//       {status === Status.RESOLVED && (
//         <ul>
//           {videos.map(video => (
//             <li key={video.id}>
//               <h2>{video.name}</h2>
//               <iframe
//                 title="Youtube player"
//                 src={`https://www.youtube.com/embed/${video.key}`}
//                 width="468"
//                 height="350"
//                 frameBorder="0"
//                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
//               ></iframe>
//             </li>
//           ))}
//         </ul>
//       )}

//       {status === Status.REJECTED && <p>{error.message}</p>}
//     </>
//   );
// }
