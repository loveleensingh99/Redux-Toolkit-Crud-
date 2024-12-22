import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface TUserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  dob: string;
}

const initialState: TUserProfile[] = [
 
];

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.push(action.payload);
    },

    updateUser: (state, action) => {
      const { id, name, email, phone, dob } = action.payload;
      const existingUser = state.find((item) => item.id === id);
      if (existingUser) {
        existingUser.name = name;
        existingUser.email = email;
        existingUser.phone = phone;
        existingUser.dob = dob;
      }
      
    },
    deleteUser: (state, action) => {
      const id = action.payload;
      const existingUser = state.find((item) => item.id === id);
      if (existingUser) {
        const filteredItems = state.filter((item) => item.id !== id);
        return filteredItems;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { addUser, deleteUser, updateUser } = userSlice.actions;

export default userSlice.reducer;
