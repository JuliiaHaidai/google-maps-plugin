// import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useJsApiLoader } from "@react-google-maps/api";

import MapComponent from "./components/Map/MapComponent";
import Modal from "./components/Modal/Modal";
import { RootState } from "./slices/store";
import RegistrationPage from "./components/RegistrationPage/RegistrationPage";

import classes from "./App.module.scss";

type Libraries = (
  | "drawing"
  | "geometry"
  | "localContext"
  | "places"
  | "visualization"
)[];

const libraries: Libraries = ["drawing"];

function App() {
  const isModalOpen = useSelector((state: RootState) => state.text.isModalOpen);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyA5PUezO8ZQ3ZMTBiHeZhrva5Z5sX4Zgco",
    libraries,
  });

  const isLoggedIn = useSelector((state: RootState) => state.user.isLogged);

  return (
    <div className={classes.app}>
      {isModalOpen ? <Modal /> : null}
      {isLoggedIn ? (
        <div>
          {isLoaded ? (
            <MapComponent />
          ) : (
            <h2 className={classes.loading}>Loading ...</h2>
          )}
        </div>
      ) : (
        <RegistrationPage />
      )}
    </div>
  );
}

export default App;
