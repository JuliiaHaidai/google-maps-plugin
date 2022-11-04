import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import { Provider } from "react-redux";

import store from "../../slices/store";
import Modal from "./Modal";

const renderModal = () =>
  render(
    <Provider store={store}>
      <Modal />
    </Provider>,
  );

describe("testing Modal component", () => {
  it("renders the modal", () => {
    renderModal();
    expect(screen.getByPlaceholderText(/title/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/description/i)).toBeInTheDocument();
  });
  it("click the cancel button", () => {
    renderModal();
    expect(screen.getByText(/cancel/i)).toBeInTheDocument();
    fireEvent.click(screen.getByText(/cancel/i));
  });
  it("click the save button", () => {
    renderModal();
    expect(screen.getByText(/save/i)).toBeInTheDocument();
    fireEvent.click(screen.getByText(/save/i));
  });
  it("enter text to the title input", () => {
    renderModal();
    expect(screen.getByPlaceholderText(/title/i)).toBeInTheDocument();
    fireEvent.change(screen.getByPlaceholderText(/title/i), {
      target: { value: "title 1" },
    });
  });
  it("enter text to the description input", () => {
    renderModal();
    expect(screen.getByPlaceholderText(/description/i)).toBeInTheDocument();
    fireEvent.change(screen.getByPlaceholderText(/description/i), {
      target: { value: "description 1" },
    });
  });
});
