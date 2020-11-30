/* eslint-disable */
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal } from "react-bootstrap";
import "./modal.css";

export default function ViewTodo(props) {
  const convertDates = (time) => {
    let month = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let dates = time.substring(0, 10).split("-");
    return `${dates[2]} ${month[Number(dates[1]) - 1]} ${dates[0]}`;
  };
  return (
    <Modal
      {...props}
      style={{ zIndex: 1500, outline: "none", border: "none" }}
      size='md'
      aria-labelledby='contained-modal-title-vcenter'
      centered>
      <Modal.Body style={{ padding: "1.5px" }}>
        <div className='detailtodo_container'>
          <div className='dt_line linetitle_dt'>
            <h5>Detail ToDo</h5>
          </div>
          <div className='dt_line'>
            <div className='dt_label'>
              <p>Activiy's name</p>
            </div>
            <div className='dt_desc'>
              <p>{props.data.title}</p>
            </div>
          </div>
          <div className='dt_line'>
            <div className='dt_label'>
              <p>Detail activity</p>
            </div>
            <div className='dt_desc'>
              <p>{props.data.description}</p>
            </div>
          </div>
          <div className='dt_line'>
            <div className='dt_label'>
              <p>Created</p>
            </div>
            <div className='dt_desc'>
              <p>{convertDates(props.data.createdAt)}</p>
            </div>
          </div>
          <div className='dt_line linebtn'>
            <button
              className='dt_btnOk'
              style={{ outline: "none" }}
              onClick={() => props.onHide(false)}>
              Ok
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
