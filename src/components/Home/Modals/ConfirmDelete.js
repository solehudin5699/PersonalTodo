/* eslint-disable */
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal } from "react-bootstrap";
import "./modal.css";
import { deleteTodo } from "../../../redux/actions/todos/delete.todos";

export default function ConfirmDelete(props) {
  const dispatch = useDispatch();
  const handleDeleteTodo = () => {
    let dataDelete = { id: props.data.id, username: props.data.username };
    dispatch(deleteTodo(dataDelete));
  };
  const { isDeletePending, isDeleteFulfilled, isDeleteRejected } = useSelector(
    (state) => state.todos
  );
  useEffect(() => {
    if (isDeleteFulfilled) {
      setTimeout(() => {
        props.onHide(false);
      }, 1000);
    } else if (isDeleteRejected) {
      setTimeout(() => {
        props.onHide(false);
      }, 1000);
    }
  }, [isDeleteFulfilled, isDeleteRejected]);
  return (
    <Modal
      {...props}
      style={{ zIndex: 1500, outline: "none" }}
      size='md'
      aria-labelledby='contained-modal-title-vcenter'
      centered>
      <Modal.Body>
        <div className='confirmdelete_container'>
          <div className='cd_line linetitle'>
            <h5>Delete ToDo</h5>
          </div>
          <div className='cd_line' styles={{ marginTop: "25px" }}>
            <h6>Are you sure to delete todo?</h6>
          </div>

          <div className='cd_line linebtn'>
            <button
              className='cd_btnCancel marginRight15'
              style={{ outline: "none" }}
              onClick={() => props.onHide(false)}>
              Cancel
            </button>
            <button
              className='cd_btnDelete'
              style={{ outline: "none" }}
              onClick={handleDeleteTodo}>
              {isDeletePending ? (
                <i className='fa fa-spinner fa-spin fa-2x fa-fw'></i>
              ) : (
                "Delete"
              )}
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
