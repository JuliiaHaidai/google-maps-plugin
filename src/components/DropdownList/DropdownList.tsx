import PropTypes from "prop-types";
import { useState } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import images from "../../image/images";
import { CIRCLE, POLYLINE, POLYGON, ARROW, TEXT } from "../../constants";
import { SelectedShapeType, FigureType } from "../../typesAndInterfaces";

import classes from "./DropdownList.module.scss";

interface DropdownType {
  setTypeFigure: (typeFigure: FigureType) => void;
  setDrawing: (drawing: boolean) => void;
  setSelectedShape: (selectedShape: SelectedShapeType) => void;
}

function DropdownList({
  setTypeFigure,
  setDrawing,
  setSelectedShape,
}: DropdownType) {
  const [valueDropdown, setValueDropdown] = useState(false);
  const types: FigureType[] = [CIRCLE, POLYLINE, POLYGON, ARROW, TEXT];
  const imgFig = [
    images.circleImg,
    images.polylineImg,
    images.polygonImg,
    images.arrowImg,
    images.textImg,
  ];

  return (
    <div className={classes.dropdown}>
      <Dropdown
        isOpen={valueDropdown}
        toggle={() => setValueDropdown(!valueDropdown)}
      >
        <DropdownToggle caret>+</DropdownToggle>
        <DropdownMenu>
          {types.map((item, i) => (
            <DropdownItem
              className={classes.dropdownItem}
              // eslint-disable-next-line react/no-array-index-key
              key={i}
              onClick={() => {
                setTypeFigure(item);
                setDrawing(true);
                setSelectedShape(null);
              }}
            >
              <input type="image" alt={item} src={imgFig[i]} />
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}

DropdownList.propTypes = {
  setTypeFigure: PropTypes.func.isRequired,
  setDrawing: PropTypes.func.isRequired,
  setSelectedShape: PropTypes.func.isRequired,
};

export default DropdownList;
