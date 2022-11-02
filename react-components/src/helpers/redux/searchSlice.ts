import { createSlice } from '@reduxjs/toolkit';
import { fetchMovies } from 'api/API';
import { AsyncThunkType, ISearchState, SearchAction } from 'interfaces/stateManagement';

const initialState: ISearchState = {
  searchItems: [],
  currentPage: 1,
  sort: 'by newest',
  moviesPerPage: 1,
};

const searchSlice = createSlice({
  name: 'searchSlice',
  initialState,
  reducers: {
    addItemsSearch(state, action: SearchAction) {
      state.searchItems = action.payload.searchItems;
    },
    setCurrentPage(state, action: SearchAction) {
      state.currentPage = action.payload.currentPage;
    },
    setSort(state, action: SearchAction) {
      state.searchItems = action.payload.searchItems;
      state.sort = action.payload.sort;
    },
    setMoviesPerPage(state, action: SearchAction) {
      state.moviesPerPage = action.payload.moviesPerPage;
    },
  },
  extraReducers: {
    [fetchMovies.fulfilled.type]: (state: ISearchState, action: AsyncThunkType) => {
      state.searchItems = action.payload;
    },
  },
});

export const { addItemsSearch, setCurrentPage, setSort, setMoviesPerPage } = searchSlice.actions;

export default searchSlice.reducer;
