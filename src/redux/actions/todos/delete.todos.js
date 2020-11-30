import db from "../../../services/firebase";
import { deleteTodo as del, reset } from "./actionTypes";

export const deleteTodo = (data) => {
  return (dispatch) => {
    dispatch(deleteTodoPending());
    let document = db.doc(`/todos/${data.id}`);
    document
      .get()
      .then((doc) => {
        if (doc.exists) {
          if (doc.data().username === data.username) {
            document
              .delete()
              .then((res) => {
                let result = {
                  status: 200,
                  msg: "Successfully deleting todo",
                  id: data.id,
                };
                dispatch(deleteTodoFulfilled(result));
              })
              .catch((err) => {
                let error = {
                  status: 500,
                  msg: "Failed deleting todo",
                };
                dispatch(deleteTodoRejected(error));
              });
          } else {
            let error = {
              status: 500,
              msg: "Failed deleting todo because unauthorized",
            };
            dispatch(deleteTodoRejected(error));
          }
        } else {
          let error = {
            status: 500,
            msg: "Data not found",
          };
          dispatch(deleteTodoRejected(error));
        }
      })
      .catch((err) => {
        let error = {
          status: 500,
          msg: "Failed deleting todo",
        };
        dispatch(deleteTodoRejected(error));
      });
  };
};

const deleteTodoPending = () => {
  return {
    type: del.pending,
  };
};
const deleteTodoFulfilled = (data) => {
  return {
    type: del.fulfilled,
    payload: data,
  };
};
const deleteTodoRejected = (error) => {
  return {
    type: del.rejected,
    payload: error,
  };
};
export const resetStatus = () => {
  return {
    type: reset.resetStatusDelete,
  };
};
