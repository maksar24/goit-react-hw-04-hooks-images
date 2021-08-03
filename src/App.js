import React, { useState, useEffect } from "react";
import styles from "./App.module.css";
import { fetchPictures } from "./Components/API";
import Searchbar from "./Components/Searchbar/Searchbar";
import { ImageGallery } from "./Components/ImageGallery/ImageGallery";
import { CustomLoader } from "./Components/Loader/Loader";
import Modal from "./Components/Modal/Modal";

export default function App() {
  const [pictures, setPictures] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const [modalContent, setModalContent] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchPictures(query, currentPage)
      .then((prevPictures) => {
        setPictures((pictures) => [...pictures, ...prevPictures]);
      })
      .finally(() => {
        scroll();
        setLoading(false);
      });
  }, [query, currentPage]);

  const nextPage = () => setCurrentPage(currentPage + 1);

  const handleSubmit = (value) => {
    if (value !== query) {
      setPictures([]);
      setQuery(value);
      setCurrentPage(1);
      setError(null);
    }
  };

  const onClickPicture = (e) => {
    setModalContent(e.target.dataset.source);
    toggleModal();
  };

  const toggleModal = () => setOpenModal(!openModal);

  const scroll = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <div className={styles.App}>
      <Searchbar onSubmit={handleSubmit} />
      {loading && <CustomLoader />}
      {error ? (
        <h2 className={styles.Title}>error (ಠ_ಠ) error</h2>
      ) : query === "" ? (
        <h2 className={styles.Title}>Try to look for something 🔍</h2>
      ) : (
        <ImageGallery
          collection={pictures}
          actionButton={nextPage}
          actionBackground={onClickPicture}
        />
      )}
      {openModal && (
        <Modal onClickModal={toggleModal} largeImageURL={modalContent} />
      )}
    </div>
  );
}
