import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  comments: [],
  loading: true,
  error: null,
};

const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    fetchStart(state) {
      state.loading = true;
    },
    fetchSuccess(state, action) {
      state.loading = false;
      state.comments = action.payload;
    },
    fetchFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    setRating(state, action) {
      const { id, rating } = action.payload;
      const index = state.comments.findIndex((c) => c.id === id);
      if (index !== -1) {
        state.comments[index].rating = rating;
      }
    },
  },
});

export const { fetchStart, fetchSuccess, fetchFailure, setRating } = commentSlice.actions;
export default commentSlice.reducer;
