import { createAsyncThunk } from "@reduxjs/toolkit";
export const getUsers = createAsyncThunk("UI/getUsers", async () => {
  const res = await fetch(
    "https://itransition-task4-backend-gxbs.onrender.com/"
  );
  const data = await res.json();
  return data.users;
});

export const blockUnblockUsers = createAsyncThunk(
  "UI/blockUnblockUsers",
  async ({ userEmail, selectedUsers, newStatus }, { rejectWithValue }) => {
    try {
      const res = await fetch(
        "https://itransition-task4-backend-gxbs.onrender.com/",
        {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ userEmail, selectedUsers, newStatus }),
        }
      );
      const updatedData = await res.json();
      if (!res.ok) {
        return rejectWithValue(updatedData.message || "Invalid request");
      }
      return updatedData;
    } catch (error) {
      return rejectWithValue("Network error");
    }
  }
);

export const deleteUsers = createAsyncThunk(
  "UI/deleteUsers",
  async ({ userEmail, selectedUsers }, { rejectWithValue }) => {
    try {
      const res = await fetch(
        "https://itransition-task4-backend-gxbs.onrender.com/",
        {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ userEmail, selectedUsers }),
        }
      );
      const confirmation = await res.json();
      if (!res.ok) {
        return rejectWithValue(confirmation.message || "Invalid request");
      }
      return confirmation.message;
    } catch (error) {
      return rejectWithValue("Network error");
    }
  }
);
