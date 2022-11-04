import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { Provider } from "react-redux";

import store from "../../slices/store";
import MapComponent from "./MapComponent";

jest.mock("@react-google-maps/api", () => ({
  useLoadScript: () => ({
    isLoaded: true,
  }),
  GoogleMap: () => <div>Map</div>,
  DrawingManager: () => <div>Drawing Manager</div>
}));

describe("Map component", () => {
  it("rendedrs Map component", async () => {
    render(
      <Provider store={store}>
        <MapComponent />
      </Provider>,
    );
    const mapContainer = await screen.findByText(/Map/i);
    expect(mapContainer).toBeInTheDocument();
    expect(screen.queryByText(/register/i)).not.toBeInTheDocument();
  });
});
