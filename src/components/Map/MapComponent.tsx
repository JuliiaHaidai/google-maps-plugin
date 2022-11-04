import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import { DrawingManager, GoogleMap } from "@react-google-maps/api";
import { nanoid } from "nanoid";

import Text from "../Text/Text";
import ControlPanel from "../ControlPanel/ControlPanel";
import { CIRCLE, POLYLINE, POLYGON, ARROW, TEXT } from "../../constants";
import {
  setTextData,
  setIsModalOpen,
  deleteText,
} from "../../slices/textSlice";
import { RootState } from "../../slices/store";
import {
  FigureType,
  OverlayComplete,
  SelectedShapeType,
  AllShapesItemType,
} from "../../typesAndInterfaces";

import classes from "./MapComponent.module.scss";

function MapComponent() {
  const dispatch = useDispatch();
  const textData = useSelector((state: RootState) => state.text.textData);
  const coordText = useSelector((state: RootState) => state.text.coordText);
  const isModalOpen = useSelector((state: RootState) => state.text.isModalOpen);

  const [typeFigure, setTypeFigure] = useState<null | FigureType>(null);
  const [drawing, setDrawing] = useState<boolean>(false);
  const [selectedShape, setSelectedShape] = useState<SelectedShapeType>(null);
  const [allShapes, setAllShapes] = useState<AllShapesItemType[]>([]);
  const [marker, setMarker] =
    useState<google.maps.drawing.OverlayCompleteEvent | null>(null);

  useEffect(() => {
    if (selectedShape && selectedShape.type !== TEXT) {
      (selectedShape as OverlayComplete).overlay.setEditable(true);
      return () => {
        (selectedShape as OverlayComplete).overlay.setEditable(false);
      };
    }
    if (selectedShape && selectedShape.type === TEXT) {
      const text = document.getElementById(`${selectedShape.id}`);
      if (text) text.style.border = "3px solid red";
      return () => {
        if (text) text.style.border = "none";
      };
    }
  }, [selectedShape]);

  const deleteSelectedShape = () => {
    if (selectedShape) {
      if (selectedShape.type !== TEXT) {
        (selectedShape as OverlayComplete).overlay.setMap(null);
      } else {
        dispatch(deleteText(selectedShape.id));
      }
      setSelectedShape(null);
    }
  };

  function isOverlayComplete(object: any): object is OverlayComplete {
    return "overlay" in object;
  }

  const cansel = () => {
    if (allShapes.length > 0) {
      const item = allShapes[allShapes.length - 1];
      if (isOverlayComplete(item)) {
        item.overlay.setMap(null);
        allShapes.pop();
      } else {
        dispatch(deleteText(coordText[coordText.length - 1].id));
        allShapes.pop();
      }
    }
  };

  const confirm = () => {
    setAllShapes([]);
    setDrawing(false);
    setTypeFigure(null);
  };

  let drawingMode;

  if (drawing && typeFigure === CIRCLE) {
    drawingMode = google.maps.drawing.OverlayType.CIRCLE;
  } else if ((drawing && typeFigure === POLYLINE) || typeFigure === ARROW) {
    drawingMode = google.maps.drawing.OverlayType.POLYLINE;
  } else if (drawing && typeFigure === POLYGON) {
    drawingMode = google.maps.drawing.OverlayType.POLYGON;
  } else if (drawing && typeFigure === TEXT) {
    drawingMode = google.maps.drawing.OverlayType.MARKER;
  } else {
    drawingMode = null;
  }

  const onMarkerComplete = (e: google.maps.Marker) => {
    if (marker) {
      (marker.overlay as google.maps.Marker).setMap(null);
      dispatch(setIsModalOpen(true));
      setAllShapes([...allShapes, { type: TEXT }]);
      dispatch(
        setTextData({
          ...textData,
          position: {
            lat: e.getPosition()?.lat(),
            lng: e.getPosition()?.lng(),
          },
          type: TEXT,
          size: "20",
          id: `${nanoid()}`,
        }),
      );
    }
  };

  const onOverlayComplete = (e: google.maps.drawing.OverlayCompleteEvent) => {
    if (e && e.type !== "marker") {
      setAllShapes([...allShapes, e]);
      if (e.overlay) {
        google.maps.event.addListener(e.overlay, "click", () => {
          setSelectedShape(e);
        });
      }
    } else {
      setMarker(e);
    }
  };

  return (
    <div className={classes.container}>
      <ControlPanel
        setTypeFigure={setTypeFigure}
        confirm={confirm}
        setDrawing={setDrawing}
        drawing={drawing}
        deleteSelectedShape={deleteSelectedShape}
        cansel={cansel}
        selectedShape={selectedShape}
        setSelectedShape={setSelectedShape}
        isModalOpen={isModalOpen}
      />
      <GoogleMap
        id="map"
        onDblClick={() => {
          setSelectedShape(null);
        }}
        mapContainerStyle={{
          width: "100%",
          height: "100%",
        }}
        center={{
          lat: -3.745,
          lng: -38.523,
        }}
        zoom={5}
        options={{
          mapTypeId: google.maps.MapTypeId?.SATELLITE,
          fullscreenControl: false,
          mapTypeControl: false,
          streetViewControl: false,
          disableDoubleClickZoom: true,
        }}
      >
        <DrawingManager
          onOverlayComplete={onOverlayComplete}
          onMarkerComplete={onMarkerComplete}
          drawingMode={drawingMode}
          options={{
            drawingControl: false,
            circleOptions: {
              fillColor: "#ffff00",
              fillOpacity: 1,
              strokeColor: "#ff0000",
              strokeOpacity: 1,
              strokeWeight: 5,
            },
            polygonOptions: {
              fillColor: "#ffff00",
              fillOpacity: 1,
              strokeColor: "#ff0000",
              strokeOpacity: 1,
              strokeWeight: 5,
            },
            polylineOptions: {
              strokeColor: "#000000",
              strokeOpacity: 1,
              strokeWeight: 5,
              icons:
                typeFigure === ARROW
                  ? [
                      {
                        icon: {
                          path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                        },
                        offset: "100%",
                      },
                    ]
                  : null,
            },
          }}
        />
        {coordText.map((text) => {
          return (
            <Text
              key={text.id}
              textData={text}
              setSelectedShape={setSelectedShape}
              drawing={drawing}
            />
          );
        })}
      </GoogleMap>
    </div>
  );
}

export default MapComponent;
