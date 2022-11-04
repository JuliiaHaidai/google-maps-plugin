import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { editText } from "../../slices/textSlice";
import { CIRCLE, POLYGON, TEXT } from "../../constants";
import {
  OverlayComplete,
  CoordTextItemType,
  SelectedShapeType,
} from "../../typesAndInterfaces";

import classes from "./EditingBlock.module.scss";

function EditingBlock({ selectedShape }: { selectedShape: SelectedShapeType }) {
  const [borderColor, setBorderColor] = useState<string>("#ff0000");
  const [bodyColor, setBodyColor] = useState<string>("#ffff00");
  const [borderWidth, setBorderWidth] = useState<string>("5");
  const [fontSize, setFontSize] = useState<string | undefined>("");

  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedShape) {
      if (selectedShape.type === CIRCLE || selectedShape.type === POLYGON) {
        setBodyColor(
          (selectedShape as OverlayComplete).overlay.get("fillColor"),
        );
      }
      if (selectedShape.type !== TEXT) {
        setBorderColor(
          (selectedShape as OverlayComplete).overlay.get("strokeColor"),
        );
        setBorderWidth(
          (selectedShape as OverlayComplete).overlay.get("strokeWeight"),
        );
      }
      if (selectedShape.type === TEXT) {
        setFontSize((selectedShape as CoordTextItemType).size);
      }
    }
  }, [selectedShape]);

  if (!selectedShape) return null;

  return (
    <div className={classes.inputs}>
      {selectedShape.type !== TEXT ? (
        <>
          {selectedShape.type === CIRCLE || selectedShape.type === POLYGON ? (
            <input
              data-testid="fillColor"
              type="color"
              onChange={(e) => {
                setBodyColor(e.target.value);
                (selectedShape as OverlayComplete).overlay.setOptions({
                  fillColor: e.target.value,
                });
              }}
              name="favcolor"
              value={bodyColor}
            />
          ) : null}
          <input
            data-testid="strokeColor"
            type="color"
            onChange={(e) => {
              setBorderColor(e.target.value);
              (selectedShape as OverlayComplete).overlay.setOptions({
                strokeColor: e.target.value,
              });
            }}
            name="favcolor"
            value={borderColor}
          />
          <label>
            Border Width:
            <input
              type="range"
              min="1"
              max="30"
              value={borderWidth}
              onChange={(e) => {
                setBorderWidth(e.target.value);
                (selectedShape as OverlayComplete).overlay.setOptions({
                  strokeWeight: +e.target.value,
                });
              }}
            />
            <span id="borderWidth">{borderWidth}</span>
          </label>
        </>
      ) : null}
      {selectedShape.type === TEXT ? (
        <label>
          Font Size:
          <input
            type="range"
            min="5"
            max="40"
            value={fontSize}
            onChange={(e) => {
              setFontSize(e.target.value);
              dispatch(
                editText({
                  size: e.target.value,
                  id: (selectedShape as CoordTextItemType).id,
                }),
              );
            }}
          />
          <span id="fontSize">{fontSize}</span>
        </label>
      ) : null}
    </div>
  );
}

EditingBlock.propTypes = {
  selectedShape: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.oneOf([null]),
  ]).isRequired,
};

export default EditingBlock;
