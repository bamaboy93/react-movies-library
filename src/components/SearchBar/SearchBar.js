import { useState } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import styles from './SearchBar.module.css';

export default function Searchbar({ onSubmit }) {
  const [query, setQuery] = useState('');

  const handelQueryChange = e => {
    setQuery(e.target.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (query.trim() === '') {
      toast.warn('Please, enter your query !');
      return;
    }
    onSubmit(query);
    setQuery('');
  };

  return (
    <form className={styles.searchForm} onSubmit={handleSubmit}>
      <button type="submit" className={styles.searchFormButton}>
        <span className={styles.searchFormButtonLabel}>Search</span>
      </button>

      <input
        className={styles.searchFormInput}
        type="text"
        value={query}
        autoComplete="off"
        autoFocus
        placeholder="Search ..."
        onChange={handelQueryChange}
      />
    </form>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
