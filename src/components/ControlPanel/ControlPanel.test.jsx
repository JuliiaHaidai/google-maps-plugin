import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import { Provider } from "react-redux";

import store from "../../slices/store";
import ControlPanel from "./ControlPanel";

describe("testing ControlPanel component", () => {
  const setTypeFigure = jest.fn();
  const confirm = jest.fn();
  const deleteSelectedShape = jest.fn();
  const cancel = jest.fn();
  const setDrawing = jest.fn();
  const setSelectedShape = jest.fn();

  it("renders control panel, when modal is closed", () => {
    const { rerender } = render(
      <Provider store={store}>
        <ControlPanel
          setTypeFigure={setTypeFigure}
          confirm={confirm}
          drawing={true}
          deleteSelectedShape={deleteSelectedShape}
          cansel={cancel}
          setDrawing={setDrawing}
          selectedShape={{ type: "text" }}
          setSelectedShape={setSelectedShape}
          isModalOpen={false}
        />
      </Provider>,
    );
    expect(screen.getByAltText(/cancel/i)).toBeInTheDocument();

    fireEvent.click(screen.getByAltText(/cancel/i));
    expect(cancel).toBeCalled();
    expect(screen.getByAltText(/confirm/i)).toBeInTheDocument();

    fireEvent.click(screen.getByAltText(/confirm/i));
    expect(confirm).toBeCalled();

    rerender(
      <Provider store={store}>
        <ControlPanel
          setTypeFigure={setTypeFigure}
          confirm={confirm}
          drawing={true}
          deleteSelectedShape={deleteSelectedShape}
          cansel={cancel}
          setDrawing={setDrawing}
          selectedShape={{ type: "text" }}
          setSelectedShape={setSelectedShape}
          isModalOpen={true}
        />
        ,
      </Provider>,
    );
    expect(screen.queryByAltText(/cancel/i)).not.toBeInTheDocument();

    rerender(
      <Provider store={store}>
        <ControlPanel
          setTypeFigure={setTypeFigure}
          confirm={confirm}
          drawing={false}
          deleteSelectedShape={deleteSelectedShape}
          cansel={cancel}
          setDrawing={setDrawing}
          selectedShape={null}
          setSelectedShape={setSelectedShape}
          isModalOpen={false}
        />
        ,
      </Provider>,
    );
    expect(screen.getByText(/logout/i)).toBeInTheDocument();
    fireEvent.click(screen.getByText(/logout/i));

    rerender(
      <Provider store={store}>
        <ControlPanel
          setTypeFigure={setTypeFigure}
          confirm={confirm}
          drawing={false}
          deleteSelectedShape={deleteSelectedShape}
          cansel={cancel}
          setDrawing={setDrawing}
          selectedShape={{
            position: { lat: 220, lng: 220 },
            id: "1",
            type: "text",
            size: "20",
            title: "title",
            body: "description",
          }}
          setSelectedShape={setSelectedShape}
          isModalOpen={false}
        />
        ,
      </Provider>,
    );
    expect(screen.getByRole("slider")).toBeInTheDocument();
  });
});
