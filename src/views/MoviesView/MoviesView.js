import { useState, useEffect } from 'react';
import { useRouteMatch, useHistory, useLocation } from 'react-router-dom';

import { getMoviesByQuery } from '../../services/moviesApi';
// import ErrorView from '../NotFound/NotFoundView';

import Searchbar from '../../components/SearchBar/SearchBar';

import MoviesList from '../../components/MoviesList';

import Pagination from '@mui/material/Pagination';
import Box from '@mui/material/Box';

export default function MoviesPage() {
  const history = useHistory();
  const location = useLocation();
  const { url } = useRouteMatch();
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState(null);

  const [error, setError] = useState(null);
  const [pages, setPages] = useState(1);

  const page = new URLSearchParams(location.search).get('page') ?? 1;

  const handleFormSubmit = newQuery => {
    if (newQuery === query) return;

    setQuery(newQuery);
    setMovies(null);
    setError(null);
    history.push({ ...location, search: `query=${newQuery}&page=1` });
  };
  useEffect(() => {
    if (location.search === '') {
      return;
    }

    const newQuery = new URLSearchParams(location.search).get('query');
    setQuery(newQuery, page);
  }, [location.search, page]);

  const loadMore = (event, page) => {
    history.push({ ...location, search: `query=${query}&page=${page}` });
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
    const fetchMoviesBySearch = async () => {
      try {
        const { results, total_pages } = await getMoviesByQuery(query, page);
        if (results.length === 0) {
          setError(`Nothing was found for your search "${query}"`);

          return;
        }
        setMovies(results);
        setPages(total_pages);
      } catch (error) {
        console.log(error);
        setError(error);
      }
    };
    fetchMoviesBySearch();
  }, [query, page, error]);

  return (
    <>
      <Searchbar onSubmit={handleFormSubmit} />
      {movies?.length > 0 && (
        <>
          <MoviesList movies={movies} url={url} location={location} />
          {pages > 1 && (
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
          )}
        </>
      )}
    </>
  );
}
