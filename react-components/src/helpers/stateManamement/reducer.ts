import { IState } from 'interfaces/stateManagement';
import { Taction } from './context';

export const reducer = (state: IState, action: Taction): IState => {
  const { formData, searchData, currentPage, sort, moviesPerPage } = state;
  switch (action.type) {
    case 'add_item_form':
      return {
        formData: [...formData, action.payload.form_item],
        searchData: [...searchData],
        currentPage: currentPage,
        sort: sort,
        moviesPerPage: moviesPerPage,
      };
    case 'add_items_search':
      return {
        formData: [...formData],
        searchData: [...action.payload.search_items],
        currentPage: currentPage,
        sort: sort,
        moviesPerPage: moviesPerPage,
      };
    case 'set_current_page':
      return {
        formData: [...formData],
        searchData: [...searchData],
        currentPage: action.payload.current_page,
        sort: sort,
        moviesPerPage: moviesPerPage,
      };
    case 'set_movies_per_page':
      return {
        formData: [...formData],
        searchData: [...searchData],
        currentPage: 1,
        sort: sort,
        moviesPerPage: action.payload.movies_per_page,
      };
    case 'set_sort':
      return {
        formData: [...formData],
        searchData: [...searchData],
        currentPage: currentPage,
        sort: action.payload.sort,
        moviesPerPage: moviesPerPage,
      };
    default:
      return state;
  }
};
