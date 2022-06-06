import { createSlice } from "@reduxjs/toolkit";
import { IUsers } from "../../InterfaceUserTypes";

const initialState: IUsers[] = [];

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    addUser: (state: IUsers[], action: { payload: IUsers }) => {
      state.push(action.payload);
    },
    editUser: (state: IUsers[], action: { payload: IUsers }) => {
      const {
        id,
        firstName,
        lastName,
        mobileNo,
        email,
        isConfirmed,
      } = action.payload;
      const existingUser: IUsers | undefined = state.find(
        (user) => user.id === id
      );
      if (existingUser) {
        existingUser.firstName = firstName;
        existingUser.lastName = lastName;
        existingUser.mobileNo = mobileNo;
        existingUser.email = email;
        existingUser.isConfirmed = isConfirmed;
      }
    },
    deleteUser: (state: IUsers[], action: { payload: string | undefined }) => {
      const id = action.payload;
      const existingUser: IUsers | undefined = state.find(
        (user) => user.id === id
      );
      if (existingUser) {
        return state.filter((user) => user.id !== id);
      }
    },
  },
});

export const { addUser, editUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;
