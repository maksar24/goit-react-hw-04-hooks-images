import React from "react";
import styles from "./Button.module.css";
import PropTypes from "prop-types";

export const Button = ({ action }) => {
  return (
    <button className={styles.Button} onClick={action}>
      Load more
    </button>
  );
};

Button.propTypes = {
  action: PropTypes.func.isRequired,
};
