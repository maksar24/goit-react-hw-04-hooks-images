import React, { useEffect } from "react";
import styles from "./Modal.module.css";
import PropTypes from "prop-types";

export default function Modal({ onClickModal, largeImageURL }) {
  useEffect(() => {
    window.addEventListener("keydown", handleKeyESC);

    return () => {
      window.removeEventListener("keydown", handleKeyESC);
    };
  });

  const handleModal = (e) => {
    if (e.currentTarget === e.target) {
      onClickModal();
    }
  };

  const handleKeyESC = (e) => {
    if (e.code === "Escape") {
      onClickModal();
    }
  };

  return (
    <div className={styles.Overlay} onClick={handleModal}>
      <div className={styles.Modal}>
        <img src={largeImageURL} alt="" />
      </div>
    </div>
  );
}

Modal.propTypes = {
  onClickModal: PropTypes.func.isRequired,
};
