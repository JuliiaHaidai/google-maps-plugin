import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import { Provider } from "react-redux";

import store from "../../slices/store";
import EditingBlock from "./EditingBlock";

describe("testing EditingBlock component", () => {
  it("renders the editing block", () => {
    render(
      <Provider store={store}>
        <EditingBlock selectedShape={null} />
      </Provider>,
    );
    expect(screen.queryByTestId(/strokeColor/i)).not.toBeInTheDocument;
  });

  it("renders the editing block with text", () => {
    render(
      <Provider store={store}>
        <EditingBlock
          selectedShape={{
            position: { lat: 220, lng: 220 },
            id: "1",
            type: "text",
            size: "20",
            title: "title",
            body: "description",
          }}
        />
      </Provider>,
    );
    expect(screen.getByRole("slider"));
    expect(screen.getByText("20")).toBeInTheDocument();

    fireEvent.change(screen.getByRole("slider"), { target: { value: 30 } });
    expect(screen.getByText("30")).toBeInTheDocument();
  });

  it("renders the editing block with circle", () => {
    render(
      <Provider store={store}>
        <EditingBlock
          selectedShape={{
            overlay: {
              get(someOption) {
                if (someOption === "fillColor") return "#ffff00";
                else if (someOption === "strokeColor") return "#ff0000";
                else return 5;
              },
              setOptions() {},
            },
            type: "circle",
          }}
        />
      </Provider>,
    );
    expect(screen.getByRole("slider")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();

    fireEvent.change(screen.getByRole("slider"), { target: { value: 15 } });
    expect(screen.getByText("15")).toBeInTheDocument();
    expect(screen.getByTestId("fillColor")).toBeInTheDocument();
    expect(screen.getByTestId("strokeColor")).toBeInTheDocument();

    expect(screen.getByTestId("fillColor").value).toBe("#ffff00");
    fireEvent.change(screen.getByTestId("fillColor"), {
      target: { value: "#ff0000" },
    });
    expect(screen.getByTestId("fillColor").value).toBe("#ff0000");

    expect(screen.getByTestId("strokeColor").value).toBe("#ff0000");
    fireEvent.change(screen.getByTestId("strokeColor"), {
      target: { value: "#ffff00" },
    });
    expect(screen.getByTestId("strokeColor").value).toBe("#ffff00");
  });
});
