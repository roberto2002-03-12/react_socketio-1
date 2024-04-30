import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    authState: 'not-authenticated', // authenticated | checking | not-authenticated
    user: {},
  },
  reducers: {
    onCheckingAuth: (state) => {
      state.authState = 'checking';
    },
    onLoginAuth: (state, { payload }) => {
      state.authState = 'authenticated';
      state.user = payload;
    },
    onLogout: (state) => {
      state.authState = 'not-authenticated';
      state.user = {}
    },
    onCheckedRegister: (state) => {
      state.authState = 'not-authenticated';
    }
  }
});

export const {
  onCheckingAuth,
  onLoginAuth,
  onLogout,
  onCheckedRegister
} = authSlice.actions;