import axios from "axios";

export const fetchPictures = async (query, page) => {
  return await axios.get(
    `https://pixabay.com/api/?q=${query}&page=${page}&key=22033849-04a58a8d7b6d53f5d68e2165a&image_type=photo&orientation=horizontal&per_page=12`
  );
};
