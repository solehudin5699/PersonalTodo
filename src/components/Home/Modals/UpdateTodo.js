/* eslint-disable */
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal } from "react-bootstrap";
import "./modal.css";
import { updateTodo } from "../../../redux/actions/todos/update.todos";

export default function UpdateTodo(props) {
  const [todo, setTodo] = useState({ title: "", description: "" });
  const dispatch = useDispatch();
  const handleUpdateTodo = () => {
    let newTodo = { ...todo, id: props.data.id };
    dispatch(updateTodo(newTodo));
  };
  const { isUpdatePending, isUpdateFulfilled, isUpdateRejected } = useSelector(
    (state) => state.todos
  );
  useEffect(() => {
    if (props.show) {
      setTodo({
        title: props.data.title,
        description: props.data.description,
      });
    }
  }, [props.show]);
  useEffect(() => {
    if (isUpdateFulfilled) {
      setTimeout(() => {
        props.onHide(false);
      }, 1000);
    } else if (isUpdateRejected) {
      setTimeout(() => {
        props.onHide(false);
      }, 1000);
    }
  }, [isUpdateFulfilled, isUpdateRejected]);
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
            <h5>Update ToDo</h5>
          </div>
          <div className='at_line'>
            <div className='at_label'>
              <h6>Activity's name</h6>
            </div>
            <div className='at_input'>
              <input
                type='text'
                value={todo.title}
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
                value={todo.description}
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
              onClick={handleUpdateTodo}>
              {isUpdatePending ? (
                <i className='fa fa-spinner fa-spin fa-2x fa-fw'></i>
              ) : (
                "Update"
              )}
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
