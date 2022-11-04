import PropTypes from "prop-types";
import { OverlayView } from "@react-google-maps/api";

import { CoordTextItemType, SelectedShapeType } from "../../typesAndInterfaces";

import classes from "./Text.module.scss";

interface TextProps {
  setSelectedShape: (selectedShape: SelectedShapeType) => void;
  drawing: boolean;
  textData: CoordTextItemType;
}

function Text({ setSelectedShape, drawing, textData }: TextProps) {
  if (!textData) return null;

  return (
    <OverlayView
      position={textData.position}
      mapPaneName={drawing ? OverlayView.MARKER_LAYER : OverlayView.FLOAT_PANE}
    >
      <div
        data-testid="text"
        onKeyDown={() => {}}
        id={`${textData.id}`}
        style={{
          fontSize: `${textData.size}px`,
          cursor: "pointer",
        }}
        className={classes.text}
        onClick={() => {
          setSelectedShape(textData);
        }}
        role="button"
        tabIndex={0}
      >
        <b>
          <p>{textData.title}</p>
        </b>
        <p>{textData.body}</p>
      </div>
    </OverlayView>
  );
}

Text.propTypes = {
  setSelectedShape: PropTypes.func.isRequired,
  drawing: PropTypes.bool.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  textData: PropTypes.object.isRequired,
};

export default Text;
