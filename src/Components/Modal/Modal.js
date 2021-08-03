import React, { useEffect, useRef } from "react";
import styles from "./Modal.module.css";
import PropTypes from "prop-types";

export default function Modal({ onClickModal, largeImageURL }) {
  const handleKeyESC = useRef(null);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyESC.current);

    return () => {
      window.removeEventListener("keydown", handleKeyESC.current);
    };
  }, []);

  const handleModal = (e) => {
    if (e.currentTarget === e.target) {
      onClickModal();
    }
  };

  handleKeyESC.current = (e) => {
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
