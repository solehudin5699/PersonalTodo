/* eslint-disable */
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal } from "react-bootstrap";
import "./modal.css";
import {
  postTodo,
  resetStatus,
} from "../../../redux/actions/todos/create.todos";
import { useSnackbar } from "notistack";

export default function AddTodo(props) {
  const [todo, setTodo] = useState({ title: "", description: "" });
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const handleAddTodo = () => {
    let newTodo = { ...todo, username: user.username, step: 1 };
    dispatch(postTodo(newTodo));
  };
  const { isPostPending, isPostFulfilled, isPostRejected } = useSelector(
    (state) => state.todos
  );
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  useEffect(() => {
    if (isPostFulfilled) {
      enqueueSnackbar("Success add todo", {
        variant: "success",
        autoHideDuration: 4500,
      });
      setTimeout(() => {
        props.onHide(false);
        dispatch(resetStatus());
      }, 1000);
    } else if (isPostRejected) {
      enqueueSnackbar("Failed to add todo", {
        variant: "error",
        autoHideDuration: 4500,
      });
      setTimeout(() => {
        props.onHide(false);
        dispatch(resetStatus());
      }, 1000);
    }
  }, [isPostFulfilled, isPostRejected]);
  return (
    <Modal
      {...props}
      style={{ zIndex: 1500, outline: "none" }}
      size='md'
      aria-labelledby='contained-modal-title-vcenter'
      centered>
      <Modal.Body>
        <div className='attodo_container'>
          <div className='at_line linetitle'>
            <h5>Add ToDo</h5>
          </div>
          <div className='at_line'>
            <div className='at_label'>
              <h6>Activity's name</h6>
            </div>
            <div className='at_input'>
              <input
                type='text'
                onChange={(e) => setTodo({ ...todo, title: e.target.value })}
              />
            </div>
          </div>
          <div className='at_line'>
            <div className='at_label'>
              <h6>Detail activity</h6>
            </div>
            <div className='at_input'>
              <textarea
                type='text'
                onChange={(e) =>
                  setTodo({ ...todo, description: e.target.value })
                }
              />
            </div>
          </div>
          <div className='at_line linebtn'>
            <button
              className='at_btnCancel marginRight15'
              style={{ outline: "none" }}
              onClick={() => props.onHide(false)}>
              Cancel
            </button>
            <button
              className='at_btnAdd'
              style={{ outline: "none" }}
              onClick={handleAddTodo}>
              {isPostPending ? (
                <i className='fa fa-spinner fa-spin fa-2x fa-fw'></i>
              ) : (
                "Add"
              )}
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
