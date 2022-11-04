import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import DropdownList from "./DropdownList";

describe("testing DropdownList component", () => {
  const setTypeFigure = jest.fn();
  const setDrawing = jest.fn();
  const setSelectedShape = jest.fn();
  it("renders the dropdown list", () => {
    render(
      <DropdownList
        setSelectedShape={setSelectedShape}
        setDrawing={setDrawing}
        setTypeFigure={setTypeFigure}
      />,
    );
    expect(screen.getByRole("button")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button"));
    expect(screen.getAllByRole("menuitem")).toHaveLength(5);

    fireEvent.click(screen.getByAltText(/circle/i));
  });
});
