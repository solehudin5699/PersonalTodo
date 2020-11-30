import db from "../../../firebase";
import { postTodo as post, reset } from "./actionTypes";

export const postTodo = (data) => {
  return (dispatch) => {
    dispatch(postTodoPending());
    let newTodo = {
      title: data.title,
      description: data.description,
      step: data.step,
      username: data.username,
      createdAt: new Date().toISOString(),
    };
    db.collection("todos")
      .add(newTodo)
      .then((doc) => {
        let result = {
          status: 200,
          data: {
            id: doc.id,
            ...newTodo,
          },
          msg: "Success add todo",
        };
        dispatch(postTodoFulfilled(result));
      })
      .catch((err) => {
        let error = {
          status: 500,
          msg: "Failed add todo",
        };
        dispatch(postTodoRejected(error));
      });
  };
};

const postTodoPending = () => {
  return {
    type: post.pending,
  };
};
const postTodoFulfilled = (data) => {
  return {
    type: post.fulfilled,
    payload: data,
  };
};
const postTodoRejected = (error) => {
  return {
    type: post.rejected,
    payload: error,
  };
};
export const resetStatus = () => {
  return {
    type: reset.resetStatusPost,
  };
};
