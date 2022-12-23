import { configureStore } from '@reduxjs/toolkit';
import { uiReducers } from './ui.reducer';
import { adminReducers } from './admin';

export const store = configureStore({
  reducer: {
    ui: uiReducers,
    admin: adminReducers,
  },
});
