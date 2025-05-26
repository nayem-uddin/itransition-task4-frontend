import { createSlice } from "@reduxjs/toolkit";

import { blockUnblockUsers, deleteUsers, getUsers } from "./handleAPI";

const userSlice = createSlice({
  name: "UI",
  initialState: {
    isLoading: false,
    usersList: {
      allUsers: [],
      selectedUsers: [],
    },
    message: null,
  },
  reducers: {
    selectUser: (state, action) => {
      const userSelected = state.usersList.allUsers.find(
        (user) => user.email === action.payload
      );
      state.usersList.selectedUsers.push(userSelected);
    },
    deselectUser: (state, action) => {
      const userIndex = state.usersList.selectedUsers.findIndex(
        (user) => user.email === action.payload
      );
      state.usersList.selectedUsers.splice(userIndex, 1);
    },
    selectAllUsers: (state) => {
      state.usersList.selectedUsers = [...state.usersList.allUsers];
    },
    deselectAllUsers: (state) => {
      state.usersList.selectedUsers = [];
    },
    clearAtLogin: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUsers.pending, (state) => {
      state.isLoading = true;
      state.message = null;
    });
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.usersList.allUsers = action.payload;
    });
    builder.addCase(getUsers.rejected, (state, action) => {
      state.isLoading = false;
      state.message = action.error.message;
    });
    builder.addCase(blockUnblockUsers.pending, (state) => {
      state.isLoading = true;
      state.message = null;
    });
    builder.addCase(blockUnblockUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.message = action.payload.message;
      state.usersList.allUsers = state.usersList.allUsers.filter((user) =>
        state.usersList.selectedUsers.includes(user)
      );
      state.usersList.allUsers = [...action.payload.users];
      state.usersList.selectedUsers = [];
    });
    builder.addCase(blockUnblockUsers.rejected, (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
    });
    builder.addCase(deleteUsers.pending, (state) => {
      state.isLoading = true;
      state.message = null;
    });
    builder.addCase(deleteUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      const selectedEmails = state.usersList.selectedUsers.map(
        (user) => user.email
      );
      state.usersList.allUsers = state.usersList.allUsers.filter(
        (user) => !selectedEmails.includes(user.email)
      );
      state.usersList.selectedUsers = [];
      state.message = action.payload;
    });
    builder.addCase(deleteUsers.rejected, (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
    });
  },
});

export const userReducer = userSlice.reducer;
export const {
  selectUser,
  deselectUser,
  selectAllUsers,
  deselectAllUsers,
  clearAtLogin,
} = userSlice.actions;
