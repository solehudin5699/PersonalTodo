import db from "../../../services/firebase";
import {
  updateTodo as update,
  reset,
  changeStepTodo as change,
  changeStep,
} from "./actionTypes";

export const updateTodo = (data) => {
  return (dispatch) => {
    dispatch(updateTodoPending());
    let todoId = data.id;
    delete data.id;
    db.collection("todos")
      .doc(`${todoId}`)
      .update(data)
      .then(() => {
        let result = {
          status: 200,
          msg: "Successfully updating todo",
          data: {
            id: todoId,
            ...data,
          },
        };
        dispatch(updateTodoFulfilled(result));
      })
      .catch((err) => {
        let error = {
          status: 200,
          msg: "Failed to update todo",
        };
        dispatch(updateTodoRejected(error));
      });
  };
};

const updateTodoPending = () => {
  return {
    type: update.pending,
  };
};
const updateTodoFulfilled = (data) => {
  return {
    type: update.fulfilled,
    payload: data,
  };
};
const updateTodoRejected = (error) => {
  return {
    type: update.rejected,
    payload: error,
  };
};
export const resetStatus = () => {
  return {
    type: reset.resetStatusUpdate,
  };
};

export const changeStepTodo = (data) => {
  return (dispatch) => {
    dispatch(changePending());
    dispatch(moveTodo(data));
    let todoId = data.id;
    delete data.id;
    db.collection("todos")
      .doc(`${todoId}`)
      .update(data)
      .then(() => {
        let result = {
          status: 200,
          msg: "Successfully updating todo",
          data: {
            id: todoId,
            ...data,
          },
        };
        dispatch(changeFulfilled(result));
      })
      .catch((err) => {
        let error = {
          status: 200,
          msg: "Failed to update todo",
        };
        dispatch(changeRejected(error));
      });
  };
};

const changePending = () => {
  return {
    type: change.pending,
  };
};
const changeFulfilled = (data) => {
  return {
    type: change.fulfilled,
    payload: data,
  };
};
const changeRejected = (error) => {
  return {
    type: change.rejected,
    payload: error,
  };
};

const moveTodo = (data) => {
  return {
    type: changeStep,
    payload: data,
  };
};
