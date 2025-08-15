import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    checkOrCreateUserRequest: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    checkOrCreateUserSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    checkOrCreateUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logoutUser: (state) => {
      state.user = null;
    }
  }
});

export const {
  checkOrCreateUserRequest,
  checkOrCreateUserSuccess,
  checkOrCreateUserFailure,
  logoutUser
} = userSlice.actions;

export default userSlice.reducer;
