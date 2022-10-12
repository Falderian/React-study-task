import axios from 'axios';

const apiKey = `0e655211503a99e2b6a8909e76f606a6`;
const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`;
const apiImg = `https://image.tmdb.org/t/p/w500/pHkKbIRoCe7zIFvqan9LFSaQAde.jpg`;
const apiSearch = `https://api.themoviedb.org/3/search/company?api_key=${apiKey}&query`;

export const baseApi = async (url: string) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
