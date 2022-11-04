import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../slices/store";
import {
  registrationUser,
  loginUser,
  clearError,
} from "../../slices/userSlice";
import classes from "./RegistrationPage.module.scss";

function RegistrationPage() {
  const dispatch = useDispatch();
  const [isRegistration, setIsRegistration] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repeatedPassword, setRepeatedPassword] = useState<string>("");
  const [errorPassword, setErrorPassword] = useState<string>("");

  const error = useSelector((state: RootState) => state.user.error);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isRegistration) {
      if (password === repeatedPassword) {
        setErrorPassword("");
        dispatch(
          registrationUser({
            email,
            password,
          }),
        );
      } else {
        setErrorPassword("The re-password must be the same.");
      }
    } else {
      dispatch(
        loginUser({
          email,
          password,
        }),
      );
    }
  };

  return (
    <div className={classes.registrationPage}>
      <form onSubmit={onSubmit} className={classes.form} data-testid="form">
        <label>
          Email
          <input
            placeholder="Email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            placeholder="Password"
            required
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        {isRegistration ? (
          <div>
            <label>
              Repeat Password
              <input
                placeholder="Repeat Password"
                required
                type="password"
                onChange={(e) => setRepeatedPassword(e.target.value)}
              />
            </label>
            {errorPassword ? (
              <div className={classes.error}>{errorPassword}</div>
            ) : null}
          </div>
        ) : null}
        {error ? <div className={classes.error}>{error}</div> : null}
        <button type="submit" className={classes.submitBtn}>
          {!isRegistration ? "Login" : "Register"}
        </button>
      </form>
      <button
        className={classes.logRegBtn}
        type="button"
        onClick={() => {
          setIsRegistration(!isRegistration);
          dispatch(clearError());
          setErrorPassword("");
        }}
      >
        {isRegistration ? "Login" : "Register"}
      </button>
    </div>
  );
}

export default RegistrationPage;
