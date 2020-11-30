import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./todolist.css";
import ListItem from "./ListItem";
import { resetStatus as rsUpdate } from "../../redux/actions/todos/update.todos";
import { resetStatus as rsDelete } from "../../redux/actions/todos/delete.todos";
import { useSnackbar } from "notistack";
import { DirectionsRun, HourglassEmpty, DoneAll } from "@material-ui/icons";
import LoadingIndicator from "./LoadingIndicator";
import EmptyTodos from "./EmptyTodos";

export default function TodoList() {
  const { todos } = useSelector((state) => state.todos);
  const {
    isUpdateFulfilled,
    isUpdateRejected,
    isDeleteFulfilled,
    isDeleteRejected,
    isGetPending,
  } = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    if (isUpdateFulfilled) {
      enqueueSnackbar("Success updating todo", {
        variant: "success",
        autoHideDuration: 3500,
      });
      setTimeout(() => {
        dispatch(rsUpdate());
      }, 1000);
    } else if (isUpdateRejected) {
      enqueueSnackbar("Failed to update todo", {
        variant: "error",
        autoHideDuration: 3500,
      });
      setTimeout(() => {
        dispatch(rsUpdate());
      }, 1000);
    }
  }, [isUpdateFulfilled, isUpdateRejected]);

  useEffect(() => {
    if (isDeleteFulfilled) {
      enqueueSnackbar("Success deleting todo", {
        variant: "success",
        autoHideDuration: 3500,
      });
      setTimeout(() => {
        dispatch(rsDelete());
      }, 1000);
    } else if (isDeleteRejected) {
      enqueueSnackbar("Failed to delete todo", {
        variant: "error",
        autoHideDuration: 3500,
      });
      setTimeout(() => {
        dispatch(rsDelete());
      }, 1000);
    }
  }, [isDeleteFulfilled, isDeleteRejected]);
  return (
    <div className='todolist_container'>
      {isGetPending ? (
        <LoadingIndicator />
      ) : todos.length ? (
        <>
          <div className='status'>
            <div className='title_status todoAll'>
              <h5>
                <HourglassEmpty />
                Todo
              </h5>
            </div>
            <div className='list_container'>
              {todos.length
                ? todos
                    .filter((item) => item.step === 1)
                    .map((item) => {
                      return <ListItem data={item} status={"todo"} />;
                    })
                : null}
            </div>
          </div>

          <div className='status'>
            <div className='title_status doingAll'>
              <h5>
                <DirectionsRun />
                Doing
              </h5>
            </div>
            <div className='list_container'>
              {todos.length
                ? todos
                    .filter((item) => item.step === 2)
                    .map((item) => {
                      return <ListItem data={item} status={"doing"} />;
                    })
                : null}
            </div>
          </div>
          <div className='status'>
            <div className='title_status doneAll'>
              <h5>
                <DoneAll />
                Done
              </h5>
            </div>
            <div className='list_container'>
              {todos.length
                ? todos
                    .filter((item) => item.step === 3)
                    .map((item) => {
                      return <ListItem data={item} status={"done"} />;
                    })
                : null}
            </div>
          </div>
        </>
      ) : (
        <EmptyTodos />
      )}
    </div>
  );
}
