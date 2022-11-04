import { configureStore } from "@reduxjs/toolkit";
import textReduser from "./textSlice";
import userReduser from "./userSlice";

const store = configureStore({
  reducer: {
    text: textReduser,
    user: userReduser,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
