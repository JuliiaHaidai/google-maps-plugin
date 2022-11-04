import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { rest } from "msw";
import { setupServer } from "msw/node";

import { Provider } from "react-redux";

import store from "./slices/store";
import App from "./App";

const renderApp = () =>
  render(
    <Provider store={store}>
      <App />
    </Provider>,
  );

const fakeUserResponse = { token: "fake_user_token" };
const server = setupServer(
  rest.post("/api/user/registrationUser", (req, res, ctx) => {
    return res(ctx.json(fakeUserResponse));
  }),
  rest.post("/api/user/loginUser", (req, res, ctx) => {
    return res(ctx.json(fakeUserResponse));
  }),
//   rest.get("/api/user/isLogged", (req, res, ctx) => {
//     return res(ctx.json(fakeUserResponse));
//   }),
);

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  window.localStorage.removeItem("token");
});
afterAll(() => server.close());

describe("testing App component", () => {
  it("renders the app", () => {
    renderApp();
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
  });

  it("handles register click", () => {
    renderApp();
    const regBtn = screen.getByText(/register/i);

    fireEvent.click(regBtn);
    expect(screen.getByPlaceholderText(/repeat password/i));
  });

  it("allows the user to register successfully ", async () => {
    renderApp();

    fireEvent.click(screen.getByText(/register/i));
    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: "email@gmail.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "1111" },
    });
    fireEvent.change(screen.getByPlaceholderText("Repeat Password"), {
      target: { value: "1111" },
    });
    fireEvent.click(screen.getByText(/register/i));
    expect(await screen.findByText(/loading/i));
  });
});
