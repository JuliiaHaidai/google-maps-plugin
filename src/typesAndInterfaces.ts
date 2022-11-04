import { CIRCLE, POLYLINE, POLYGON, ARROW, TEXT } from "./constants";

export type FigureType =
  | typeof CIRCLE
  | typeof POLYLINE
  | typeof POLYGON
  | typeof ARROW
  | typeof TEXT;

export interface OverlayComplete {
  overlay:
    | google.maps.Polygon
    | google.maps.Polyline
    | google.maps.Rectangle
    | google.maps.Circle;
  type: FigureType;
}

export interface InitialStateUser {
  user: {};
  isLogged: boolean;
  error: string | undefined;
}

export type CoordTextItemType = {
  id: string;
  position: {
    lat: number;
    lng: number;
  };
  type: string;
  size: string;
  title: string;
  body: string;
};

export type SelectedShapeType =
  | google.maps.drawing.OverlayCompleteEvent
  | null
  | CoordTextItemType;

export type AllShapesItemType =
  | google.maps.drawing.OverlayCompleteEvent
  | { type: string };

export type TextDataType = null | {
  id: string;
  position: {
    lat: number | undefined;
    lng: number | undefined;
  };
  type: string;
  size: string;
};

export interface Text {
  textData: TextDataType;
  coordText: CoordTextItemType[];
  isModalOpen: boolean;
}
