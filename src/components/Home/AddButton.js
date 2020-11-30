import React, { useState } from "react";
import "./addbtn.css";
import IconButton from "@material-ui/core/IconButton";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import AddTodo from "./Modals/AddTodo";

export default function AddButton() {
  const [show, setShow] = useState(false);
  return (
    <>
      <div className='container_add'>
        <div className='addbtn' onClick={() => setShow(true)}>
          <IconButton style={{ outline: "none" }}>
            <AddCircleOutlineIcon />
          </IconButton>
        </div>
      </div>
      <AddTodo onHide={setShow} show={show} />
    </>
  );
}
