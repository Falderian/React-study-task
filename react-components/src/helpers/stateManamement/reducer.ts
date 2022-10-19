import { IState } from 'interfaces/stateManagement';
import { Taction } from './context';

export const reducer = (state: IState, action: Taction): IState => {
  const { formData, searchData } = state;
  switch (action.type) {
    case 'add_item_form':
      return { formData: [...formData, action.payload.form_item], searchData: [...searchData] };
    case 'add_items_search':
      return { formData: [...formData], searchData: [...action.payload.search_items] };
    default:
      return state;
  }
};
