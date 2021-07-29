import React from "react";
import { ImageGalleryItem } from "../ImageGalleryItem/ImageGalleryItem";
import { Button } from "../Button/Button";
import styles from "./ImageGallery.module.css";
import PropTypes from "prop-types";

export const ImageGallery = ({
  collection,
  actionButton,
  actionBackground,
}) => {
  return (
    <div className={styles.Container}>
      <ul className={styles.ImageGallery}>
        <ImageGalleryItem
          collection={collection}
          actionBackground={actionBackground}
        />
      </ul>
      {collection.length > 11 && <Button action={actionButton} />}
    </div>
  );
};

ImageGallery.propTypes = {
  collection: PropTypes.array.isRequired,
  actionButton: PropTypes.func.isRequired,
  actionBackground: PropTypes.func.isRequired,
};
