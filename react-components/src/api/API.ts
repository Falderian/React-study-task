import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const apiKey = `0e655211503a99e2b6a8909e76f606a6`;
export const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`;
export const apiSearch = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query`;

export const baseApi = async (url: string) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const getMovieInfo = async (id: string) => {
  try {
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`;
    const data = await axios.get(url);
    return data.data;
  } catch (error) {
    console.log(error);
  }
};

export const getMovieTrailer = async (id: string) => {
  try {
    const url = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}&language=en-US`;
    const data = await axios.get(url);
    const videoUrl = data.data.results.find((el: { key: string; type: string | string[] }) => {
      el.type.includes('Trailer');
      return el.key;
    });
    return videoUrl.key;
  } catch (error) {
    console.log(error);
  }
};

export const requestWithUrl = async (url: string) => {
  try {
    const result = await axios.get(url);
    return result.data.results;
  } catch (error) {
    console.log(error);
  }
};
export const fetchMovies = createAsyncThunk('searchData/searchItems', async function (url: string) {
  try {
    const result = (await axios.get(url)).data.results;
    return result;
  } catch (error) {
    console.log(error);
  }
});
