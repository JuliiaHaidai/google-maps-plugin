import userReducer, {
  clearError,
  logoutUser,
  registrationUser,
  loginUser,
} from "./userSlice";
import { InitialStateUser } from "../typesAndInterfaces";

describe("testing user slice", () => {
  const initialState: InitialStateUser = {
    user: {},
    isLogged: false,
    error: "",
  };

  it("should set status to fulfilled when the user login", async () => {
    const action = {
      type: loginUser.fulfilled.type,
      payload: { email: "email@gmsil.com", password: "1111" },
    };
    const state = userReducer(initialState, action);
    expect(state.isLogged).toBe(true);
  });

  it("should set status to rejected when the user login", async () => {
    const action = {
      type: loginUser.rejected.type,
      error: { message: "login error" },
    };
    const state = userReducer(initialState, action);
    expect(state.error).toBe("login error");
  });

  it("should set status to fulfilled when the user registration", () => {
    const action = {
      type: registrationUser.fulfilled.type,
      payload: { email: "email@gmsil.com", password: "1111" },
    };
    const state = userReducer(initialState, action);
    expect(state.isLogged).toBe(true);
  });

  it("should set status to rejected when the user registration", async () => {
    const action = {
      type: registrationUser.rejected.type,
      error: { message: "registration error" },
    };
    const state = userReducer(initialState, action);
    expect(state.error).toBe("registration error");

    expect(userReducer(initialState, clearError()).error).toBe("");
  });

  it("should set status to fulfilled when the user logout", async () => {
    const action = {
      type: logoutUser.fulfilled.type,
    };
    const state = userReducer(initialState, action);
    expect(state.isLogged).toBe(false);
  });
});
