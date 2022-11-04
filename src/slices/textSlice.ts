import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TextDataType, Text } from "../typesAndInterfaces";

const initialState: Text = {
  textData: null,
  coordText: [],
  isModalOpen: false,
};

const textSlice = createSlice({
  name: "text",
  initialState,
  reducers: {
    setTextData(state, { payload }: PayloadAction<TextDataType>) {
      state.textData = payload;
    },
    setIsModalOpen(state, { payload }: PayloadAction<boolean>) {
      state.isModalOpen = payload;
    },
    createText(state, { payload }) {
      state.coordText.push(payload);
    },
    deleteText(state, { payload }: PayloadAction<string>) {
      state.coordText = state.coordText.filter((text) => text.id !== payload);
    },
    editText(state, { payload }) {
      state.coordText.forEach((item) => {
        if (item.id === payload.id) {
          item.size = payload.size;
        }
      });
    },
    clearTextData(state) {
      state.coordText = [];
    },
  },
});

export const {
  setTextData,
  setIsModalOpen,
  createText,
  deleteText,
  editText,
  clearTextData,
} = textSlice.actions;
export default textSlice.reducer;
