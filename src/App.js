import React, { Component } from "react";
import styles from "./App.module.css";
import { fetchPictures } from "./Components/API";
import { Searchbar } from "./Components/Searchbar/Searchbar";
import { ImageGallery } from "./Components/ImageGallery/ImageGallery";
import { CustomLoader } from "./Components/Loader/Loader";
import { Modal } from "./Components/Modal/Modal";

class App extends Component {
  state = {
    pictures: [],
    error: null,
    loading: false,
    currentPage: 1,
    query: "",
    openModal: false,
    modalContent: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const { currentPage, query } = this.state;

    if (prevState.currentPage !== currentPage || prevState.query !== query) {
      if (prevState.query !== query) {
        this.cleanData();
      }

      this.setState({ loading: true });
      fetchPictures(query, currentPage)
        .then((el) => {
          this.setState((prevState) => ({
            pictures: [...prevState.pictures, ...el.data.hits],
          }));
        })
        .catch(() => {
          this.setState({ error: "error" });
        })
        .finally(() => {
          this.scroll();
          this.setState({ loading: false });
        });
    }
  }

  nextPage = () => {
    this.setState({ currentPage: this.state.currentPage + 1 });
  };

  handleSubmit = (value) => {
    this.setState({ query: value });
  };

  scroll = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  cleanData = () => {
    this.setState({ pictures: [] });
  };

  toggleModal = () => {
    this.setState(({ openModal }) => ({
      openModal: !openModal,
    }));
  };

  onClickPicture = (e) => {
    this.setState({ modalContent: e.target.dataset.source });
    this.toggleModal();
  };

  render() {
    const { loading, error, pictures, query, openModal, modalContent } =
      this.state;

    return (
      <div className={styles.App}>
        <Searchbar onSubmit={this.handleSubmit} />
        {loading && <CustomLoader />}
        {error ? (
          <h2 className={styles.Title}>error (ಠ_ಠ) error</h2>
        ) : query === "" ? (
          <h2 className={styles.Title}>Try to look for something 🔍</h2>
        ) : (
          <ImageGallery
            collection={pictures}
            actionButton={this.nextPage}
            actionBackground={this.onClickPicture}
          />
        )}
        <Modal
          onClickModal={this.toggleModal}
          largeImageURL={modalContent}
          openModal={openModal}
        />
      </div>
    );
  }
}

export default App;
