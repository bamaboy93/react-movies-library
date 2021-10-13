import MoviesListItem from './MovieListItem';
import PropTypes from 'prop-types';

import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

const MoviesList = ({ movies, url, location }) => {
  return (
    <>
      <Box sx={{ width: '100%' }} mb={4}>
        <Grid container spacing={2}>
          {movies.map(({ title, name, poster_path, id, release_date }) => (
            <Grid item md={2} key={id}>
              <MoviesListItem
                key={id}
                title={title}
                name={name}
                releaseDate={release_date}
                id={id}
                poster={poster_path}
                url={url}
                location={location}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

MoviesList.propTypes = {
  movies: PropTypes.array.isRequired,
};

export default MoviesList;
