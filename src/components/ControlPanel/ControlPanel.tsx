import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import classes from "./ControlPanel.module.scss";

import DropdownList from "../DropdownList/DropdownList";
import EditingBlock from "../EditingBlock/EditingBlock";
import { logoutUser } from "../../slices/userSlice";
import { clearTextData } from "../../slices/textSlice";
import { FigureType, SelectedShapeType } from "../../typesAndInterfaces";

import images from "../../image/images";

interface Control {
  setTypeFigure: (typeFigure: FigureType) => void;
  confirm: () => void;
  drawing: boolean;
  deleteSelectedShape: () => void;
  cansel: () => void;
  setDrawing: (drawing: boolean) => void;
  selectedShape: SelectedShapeType;
  setSelectedShape: (selectedShape: SelectedShapeType) => void;
  isModalOpen: boolean;
}

function ControlPanel({
  setTypeFigure,
  confirm,
  drawing,
  deleteSelectedShape,
  cansel,
  setDrawing,
  selectedShape,
  setSelectedShape,
  isModalOpen,
}: Control) {
  const dispatch = useDispatch();

  return (
    <div className={classes.controlPanel}>
      <DropdownList
        setSelectedShape={setSelectedShape}
        setDrawing={setDrawing}
        setTypeFigure={setTypeFigure}
      />
      {selectedShape && !drawing ? (
        <EditingBlock selectedShape={selectedShape} />
      ) : null}
      <div className={classes.buttons}>
        {selectedShape && !drawing ? (
          <input
            type="image"
            alt="delete"
            src={images.deleteImg}
            onClick={() => deleteSelectedShape()}
          />
        ) : null}
        {drawing && !isModalOpen ? (
          <div>
            <input
              type="image"
              alt="cancel"
              src={images.cancelImg}
              onClick={() => cansel()}
            />
            <input
              type="image"
              alt="confirm"
              src={images.confirmImg}
              onClick={() => confirm()}
            />
          </div>
        ) : null}
      </div>
      {!drawing && !selectedShape ? (
        <button
          className={classes.logoutBtn}
          type="button"
          onClick={() => {
            dispatch(logoutUser());
            dispatch(clearTextData());
          }}
        >
          Logout
        </button>
      ) : null}
    </div>
  );
}

ControlPanel.propTypes = {
  setTypeFigure: PropTypes.func.isRequired,
  confirm: PropTypes.func.isRequired,
  drawing: PropTypes.bool.isRequired,
  deleteSelectedShape: PropTypes.func.isRequired,
  cansel: PropTypes.func.isRequired,
  setDrawing: PropTypes.func.isRequired,
  // eslint-disable-next-line react/require-default-props
  selectedShape: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.oneOf([null]),
  ]),
  setSelectedShape: PropTypes.func.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
};

export default ControlPanel;
