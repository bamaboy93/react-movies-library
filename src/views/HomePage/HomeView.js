import { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { getPopularMovies } from '../../services/moviesApi';

import MoviesList from '../../components/MoviesList';

import Pagination from '@mui/material/Pagination';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function HomePage() {
  const [movies, setMovies] = useState(null);
  const [error, setError] = useState(null);
  const [pages, setPages] = useState(1);
  const history = useHistory();
  const location = useLocation();

  const page = new URLSearchParams(location.search).get('page') ?? 1;

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const { results, total_pages } = await getPopularMovies(page);
        setMovies(results);
        setPages(total_pages);
      } catch (error) {
        setError(error);
      }
    };
    fetchMovies();
  }, [error, page]);

  const loadMore = (event, page) => {
    history.push({ ...location, search: `page=${page}` });
  };
  return (
    <main>
      <Typography
        component="h1"
        variant="h3"
        sx={{
          fontWeight: 'bold',
          textTransform: 'uppercase',
          fontSize: '2.5rem',
          mt: 4,
          mb: 6,
          textAlign: 'center',
          color: '#1976d2',
        }}
      >
        Trending Movies Today
      </Typography>

      {movies?.length > 0 && (
        <>
          <MoviesList movies={movies} url={'movies'} location={'/'} />

          {pages > 1 && (
            <>
              <Box sx={{ display: 'flex', justifyContent: 'center' }} mb={4}>
                <Pagination
                  count={pages}
                  variant="outlined"
                  color="primary"
                  onChange={loadMore}
                  page={Number(page)}
                  showFirstButton
                  showLastButton
                />
              </Box>
            </>
          )}
        </>
      )}
    </main>
  );
}

export default HomePage;
