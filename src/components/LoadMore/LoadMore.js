import PropTypes from 'prop-types';

export default function LoadMore({ onClick, children }) {
  const handleClick = () => {
    onClick();
  };

  return (
    <button type="button" onClick={handleClick}>
      <span>{children}</span>
    </button>
  );
}

LoadMore.propTypes = {
  onClick: PropTypes.func.isRequired,

  children: PropTypes.node.isRequired,
};
