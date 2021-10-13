import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import noImg from '../../Images/noimage.jpg';

import { makeStyles } from '@mui/styles';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

const useStyles = makeStyles(() => ({
  actionArea: {
    transition: '0.3s',
    '&:hover': {
      transform: 'scale(1.03)',
    },
  },

  card: {
    textAlign: 'center',
    borderRadius: 10,
    height: 400,
    boxShadow: '0 6px 12px 0 #7B68EE',
  },
  title: {
    fontFamily: 'Curlz MT',
    padding: 8,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: '1rem',
    color: '#black',
  },
}));

const MoviesListItem = ({
  poster,
  id,
  title,
  name,
  releaseDate,
  url,
  location,
}) => {
  const styles = useStyles();
  return (
    <Link to={{ pathname: `${url}/${id}`, state: { from: location } }}>
      <CardActionArea className={styles.actionArea}>
        <Card className={styles.card}>
          <CardMedia
            component="img"
            image={poster ? `https://image.tmdb.org/t/p/w500/${poster}` : noImg}
            alt={title || name}
          />
          <Typography className={styles.title} component="h5" variant="h5">
            {title || name}
            {releaseDate && <span> ({releaseDate.slice(0, 4)})</span>}
          </Typography>
        </Card>
      </CardActionArea>
    </Link>
  );
};

MoviesListItem.propTypes = {
  poster: PropTypes.string,
  id: PropTypes.number.isRequired,
  title: PropTypes.string,
};

export default MoviesListItem;
