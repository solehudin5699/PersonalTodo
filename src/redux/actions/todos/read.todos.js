import db, { auth } from "../../../services/firebase";
import { getTodos, reset } from "./actionTypes";

export const getAllTodos = (data) => {
  return (dispatch) => {
    dispatch(getAllTodosPending());
    db.collection("todos")
      .where("username", "==", data.username)
      .orderBy("createdAt", "desc")
      .get()
      .then((data) => {
        let todos = [];
        data.forEach((doc) => {
          todos.push({
            id: doc.id,
            title: doc.data().title,
            description: doc.data().description,
            step: doc.data().step,
            username: doc.data().username,
            createdAt: doc.data().createdAt,
          });
        });
        dispatch(getAllTodosFulfilled({ status: 200, data: todos }));
      })
      .catch((err) => {
        dispatch(
          getAllTodosRejected({ status: 500, msg: "Can not get all todos" })
        );
      });
  };
};

const getAllTodosPending = () => {
  return {
    type: getTodos.pending,
  };
};
const getAllTodosFulfilled = (data) => {
  return {
    type: getTodos.fulfilled,
    payload: data,
  };
};
const getAllTodosRejected = (error) => {
  return {
    type: getTodos.rejected,
    payload: error,
  };
};
export const resetStatus = () => {
  return {
    type: reset.resetStatusGet,
  };
};
