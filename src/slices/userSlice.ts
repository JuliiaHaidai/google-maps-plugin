import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { InitialStateUser } from "../typesAndInterfaces";

export const logoutUser = createAsyncThunk("user/logoutUser", async () => {
  await fetch("/api/user/logoutUser", { method: "POST" });
});

export const registrationUser = createAsyncThunk(
  "user/registrationUser",
  async (values: { email: string; password: string }) => {
    const response = await fetch("/api/user/registrationUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
      credentials: "include",
    });
    const data = await response.json();
    if (response.ok) {
      return data;
    }
    throw new Error(`${data.errors}`);
  },
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (values: { email: string; password: string }) => {
    const response = await fetch("/api/user/loginUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
      credentials: "include",
    });
    const data = await response.json();
    if (response.ok) {
      return data;
    }
    throw new Error(`${data.errors}`);
  },
);

const initialState: InitialStateUser = {
  user: {},
  isLogged: false,
  error: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearError(state) {
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registrationUser.fulfilled, (state, { payload }) => {
      state.user = payload.users;
      state.isLogged = true;
      state.error = "";
    });
    builder.addCase(registrationUser.rejected, (state, { error }) => {
      state.error = error.message;
    });
    builder.addCase(loginUser.fulfilled, (state, { payload }) => {
      state.user = payload.users;
      state.isLogged = true;
      state.error = "";
    });
    builder.addCase(loginUser.rejected, (state, { error }) => {
      state.error = error.message;
    });
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.isLogged = false;
      state.user = {};
    });
  },
});

export const { clearError } = userSlice.actions;
export default userSlice.reducer;
