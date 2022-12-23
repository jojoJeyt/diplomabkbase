import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isModalOpen: false,
  isEditModalOpen: false,
  modalParams: {},
  message: '',
  user: sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : null,
};

export const uiReducer = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setModalState: (state, { payload }) => {
      state.isModalOpen = payload.isModalOpen;
      state.modalParams = payload.modalParams;
    },
    setEditModalState: (state, { payload }) => {
      state.isEditModalOpen = payload.isEditModalOpen;
      state.modalParams = payload.modalParams;
    },
    resetModalState: (state) => {
      state.isModalOpen = false;
      state.isEditModalOpen = false;
      state.modalParams = {};
    },
    setMessage: (state, { payload }) => {
      state.message = payload;
    },
    setUser: (state, { payload }) => {
      state.user = payload;
    }
  },
});
export const selectUi = (state) => state.ui;

export const uiReducers =  uiReducer.reducer;
