import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null, // will store loginUser data
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
    updateUser: (state, action) => {
      if (state.user) {
        state.user.user = { ...state.user.user, ...action.payload }; 
      }
    },
  },
});

export const { setUser, clearUser, updateUser } = userSlice.actions;
export default userSlice.reducer;
