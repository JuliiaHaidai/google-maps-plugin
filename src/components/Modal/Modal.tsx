import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import classNames from "classnames";
import classes from "./Modal.module.scss";
import {
  setTextData,
  setIsModalOpen,
  createText,
} from "../../slices/textSlice";
import { RootState } from "../../slices/store";

function Modal() {
  const dispatch = useDispatch();
  const textData = useSelector((state: RootState) => state.text.textData);

  const [title, setTitle] = useState<string>("Title");
  const [body, setBody] = useState<string>("Desctiption");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      createText({
        ...textData,
        title,
        body,
      }),
    );

    dispatch(setTextData(null));
    dispatch(setIsModalOpen(false));
  };

  return (
    <div
      className={classNames(classes.active, classes.modal)}
      onClick={() => dispatch(setIsModalOpen(false))}
      aria-hidden="true"
    >
      <div
        className={classes.modalContent}
        onClick={(e) => e.stopPropagation()}
        aria-hidden="true"
      >
        <form onSubmit={onSubmit} data-testid="modal">
          <h5>Title</h5>
          <textarea
            placeholder="Title"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            defaultValue="Title"
          />
          <h5>Description</h5>
          <textarea
            placeholder="Description"
            onChange={(e) => {
              setBody(e.target.value);
            }}
            defaultValue="Description"
          />
          <div>
            <button
              type="button"
              onClick={() => {
                dispatch(setIsModalOpen(false));
                dispatch(setTextData(null));
              }}
            >
              Cancel
            </button>
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Modal;
