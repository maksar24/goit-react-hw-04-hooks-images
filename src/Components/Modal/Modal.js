import React, { Component } from "react";
import styles from "./Modal.module.css";
import PropTypes from "prop-types";

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyESC);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyESC);
  }

  handleKeyESC = (e) => {
    if (e.code === "Escape") {
      this.props.onClickModal();
    }
  };

  handleModal = (e) => {
    if (e.currentTarget === e.target) {
      this.props.onClickModal();
    }
  };

  render() {
    const { largeImageURL, openModal } = this.props;

    return openModal ? (
      <div className={styles.Overlay} onClick={this.handleModal}>
        <div className={styles.Modal}>
          <img src={largeImageURL} alt="" />
        </div>
      </div>
    ) : null;
  }
}

Modal.propTypes = {
  onClickModal: PropTypes.func.isRequired,
};
