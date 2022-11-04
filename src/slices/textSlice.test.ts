import { Text } from "../typesAndInterfaces";
import textReducer, {
  setTextData,
  setIsModalOpen,
  createText,
  deleteText,
  editText,
  clearTextData,
} from "./textSlice";

describe("testing the text slice", () => {
  const initialState: Text = {
    textData: null,
    coordText: [
      {
        position: {
          lat: 100,
          lng: 100,
        },
        type: "text",
        size: "20",
        id: "123abc",
        title: "title1",
        body: "body1",
      },
    ],
    isModalOpen: false,
  };

  it("should handle the modal window", () => {
    const actual = textReducer(initialState, setIsModalOpen(true));
    expect(actual.isModalOpen).toBe(true);
  });

  it("should set the text data", () => {
    const actual = textReducer(
      initialState,
      setTextData({
        position: {
          lat: 100,
          lng: 100,
        },
        type: "text",
        size: "20",
        id: "123",
      }),
    );
    expect(actual.textData).toEqual({
      position: {
        lat: 100,
        lng: 100,
      },
      type: "text",
      size: "20",
      id: "123",
    });
  });

  it("should create text", () => {
    const actual = textReducer(
      initialState,
      createText({
        position: {
          lat: 100,
          lng: 100,
        },
        type: "text",
        size: "20",
        id: "123a",
        title: "title1",
        body: "body1",
      }),
    );
    expect(actual.coordText).toHaveLength(2);
  });

  it("should edit text", () => {
    const actual = textReducer(
      initialState,
      editText({ size: "15", id: "123abc" }),
    );
    expect(actual.coordText[0]).toEqual({
      ...initialState.coordText[0],
      size: "15",
    });
  });

  it("should delete text", () => {
    const actual = textReducer(initialState, deleteText("123abc"));
    expect(actual.coordText).toHaveLength(0);
  });

  it("should clear text data", () => {
    expect(textReducer(initialState, clearTextData()).coordText).toHaveLength(
      0,
    );
  });
});
