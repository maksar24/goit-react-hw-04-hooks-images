import React, { useState } from "react";
import styles from "./SearchBar.module.css";
import PropTypes from "prop-types";

export default function Searchbar({ onSubmit }) {
  const [query, setQuery] = useState("");

  const getQuery = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(query);
  };

  return (
    <header className={styles.Searchbar}>
      <form className={styles.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={styles.SearchForm_button}>
          <span className={styles.SearchForm_button_label}>Search</span>
        </button>

        <input
          className={styles.SearchForm_input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={getQuery}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
