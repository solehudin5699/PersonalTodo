import React, { useState } from "react";
import "./listitem.css";
import {
  Visibility,
  Edit,
  DeleteOutline,
  DirectionsRun,
  HourglassEmpty,
  DoneAll,
} from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import ConfirmDelete from "./Modals/ConfirmDelete";
import UpdateTodo from "./Modals/UpdateTodo";
import ViewTodo from "./Modals/ViewTodo";
import { useDispatch } from "react-redux";
import { changeStepTodo } from "../../redux/actions/todos/update.todos";

export default function ListItems(props) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const data = props.data;
  const dispatch = useDispatch();
  const handleChangeStep = (step) => {
    dispatch(changeStepTodo({ id: data.id, step: step }));
  };
  return (
    <>
      <div className={`listitem_container ${props.status}`}>
        <h5 className='listitem_title'>{data.title}</h5>
        <div className='listitem_description'>
          <p className='listitem_descriptionText'>
            {data.description.length > 150
              ? `${data.description.substring(0, 150)}...`
              : data.description}
          </p>
        </div>
        <div className='listitem_footer'>
          <IconButton
            style={{ outline: "none" }}
            onClick={() => setShowDetail(true)}>
            <h5 className='listitem_footerText goView'>
              <Visibility />
              View
            </h5>
          </IconButton>

          <IconButton
            style={{ outline: "none" }}
            onClick={() => setShowUpdate(true)}>
            <h5 className='listitem_footerText goUpdate'>
              <Edit />
              Update
            </h5>
          </IconButton>

          <IconButton
            style={{ outline: "none" }}
            onClick={() => setShowConfirm(true)}>
            <h5 className='listitem_footerText goDelete'>
              <DeleteOutline />
              Delete
            </h5>
          </IconButton>
        </div>
        <div className='listitem_footerControl controlStep'>
          {props.data.step !== 1 ? (
            <IconButton
              title='Move to TODO'
              style={{ outline: "none" }}
              onClick={() => handleChangeStep(1)}>
              <p className='listitem_footerTextControl'>
                <HourglassEmpty />Move to TODO
              </p>
            </IconButton>
          ) : null}
          {props.data.step !== 2 ? (
            <IconButton
              title='Move to DOING'
              style={{ outline: "none", display: "flex", alignItems: "center" }}
              onClick={() => handleChangeStep(2)}>
              <p className='listitem_footerTextControl'>
                <DirectionsRun />Move to DOING
              </p>
            </IconButton>
          ) : null}
          {props.data.step !== 3 ? (
            <IconButton
              title='Move to DONE'
              style={{ outline: "none" }}
              onClick={() => handleChangeStep(3)}>
              <p className='listitem_footerTextControl'>
                <DoneAll />Move to DONE
              </p>
            </IconButton>
          ) : null}
        </div>
      </div>
      <ViewTodo data={data} show={showDetail} onHide={setShowDetail} />
      <UpdateTodo data={data} show={showUpdate} onHide={setShowUpdate} />
      <ConfirmDelete data={data} show={showConfirm} onHide={setShowConfirm} />
    </>
  );
}
