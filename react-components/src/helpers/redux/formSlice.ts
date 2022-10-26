import { createSlice } from '@reduxjs/toolkit';
import { IItemToRender } from 'interfaces/delivery';
import { FormAction } from 'interfaces/stateManagement';

const initialState: { formItems: IItemToRender[] } = { formItems: [] };

const formSlice = createSlice({
  name: 'formSlice',
  initialState,
  reducers: {
    addItemForm(state, action: FormAction) {
      state.formItems.push(action.payload.formItem);
    },
  },
});

export const { addItemForm } = formSlice.actions;

export default formSlice.reducer;
