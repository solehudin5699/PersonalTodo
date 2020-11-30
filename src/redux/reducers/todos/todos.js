import {
  postTodo,
  getTodos,
  updateTodo,
  deleteTodo,
  changeStepTodo,
  reset,
  changeStep,
} from "../../actions/todos/actionTypes";

const initialState = {
  dataPost: {},
  errorPost: undefined,
  isPostPending: false,
  isPostFulfilled: false,
  isPostRejected: false,

  todos: [],
  errorGet: undefined,
  isGetPending: false,
  isGetFulfilled: false,
  isGetRejected: false,

  dataUpdate: {},
  errorUpdate: undefined,
  isUpdatePending: false,
  isUpdateFulfilled: false,
  isUpdateRejected: false,

  dataChange: {},
  errorChange: undefined,
  isChangePending: false,
  isChangeFulfilled: false,
  isChangeRejected: false,

  dataDelete: {},
  errorDelete: undefined,
  isDeletePending: false,
  isDeleteFulfilled: false,
  isDeleteRejected: false,
};

const todosReducer = (prevState = initialState, action) => {
  switch (action.type) {
    //CREATE TODO
    case postTodo.pending:
      return {
        ...prevState,
        isPostPending: true,
      };
    case postTodo.fulfilled:
      prevState.todos.push(action.payload.data);
      return {
        ...prevState,
        dataPost: action.payload,
        isPostPending: false,
        isPostFulfilled: true,
        isPostRejected: false,
      };
    case postTodo.rejected:
      return {
        ...prevState,
        errorPost: action.payload,
        isPostPending: false,
        isPostFulfilled: false,
        isPostRejected: true,
      };

    //GET TODOS
    case getTodos.pending:
      return {
        ...prevState,
        isGetPending: true,
      };
    case getTodos.fulfilled:
      return {
        ...prevState,
        todos: action.payload.data,
        isGetPending: false,
        isGetFulfilled: true,
        isGetRejected: false,
      };
    case getTodos.rejected:
      return {
        ...prevState,
        errorGet: action.payload,
        isGetPending: false,
        isGetFulfilled: false,
        isGetRejected: true,
      };

    //UPDATE TODO
    case updateTodo.pending:
      return {
        ...prevState,
        isUpdatePending: true,
      };
    case updateTodo.fulfilled:
      let updatedTodos = prevState.todos.map((item) => {
        if (item.id == action.payload.data.id) {
          return {
            ...item,
            ...action.payload.data,
          };
        } else {
          return item;
        }
      });
      return {
        ...prevState,
        todos: updatedTodos,
        dataUpdate: action.payload,
        isUpdatePending: false,
        isUpdateFulfilled: true,
        isUpdateRejected: false,
      };
    case updateTodo.rejected:
      return {
        ...prevState,
        errorUpdate: action.payload,
        isUpdatePending: false,
        isUpdateFulfilled: false,
        isUpdateRejected: true,
      };

    //CHANGE STEP
    case changeStepTodo.pending:
      return {
        ...prevState,
        isChangePending: true,
      };
    case changeStepTodo.fulfilled: {
      // let updatedTodos = prevState.todos.map((item) => {
      //   if (item.id == action.payload.data.id) {
      //     return {
      //       ...item,
      //       ...action.payload.data,
      //     };
      //   } else {
      //     return item;
      //   }
      // });
      return {
        ...prevState,
        // todos: updatedTodos,
        dataChange: action.payload,
        isChangePending: false,
        isChangeFulfilled: true,
        isChangeRejected: false,
      };
    }
    case changeStepTodo.rejected:
      return {
        ...prevState,
        errorChange: action.payload,
        isChangePending: false,
        isChangeFulfilled: false,
        isChangeRejected: true,
      };

    //DELETE TODO
    case deleteTodo.pending:
      return {
        ...prevState,
        isDeletePending: true,
      };
    case deleteTodo.fulfilled: {
      let newTodos = prevState.todos.filter(
        (item) => item.id != action.payload.id
      );
      return {
        ...prevState,
        todos: newTodos,
        dataDelete: action.payload,
        isDeletePending: false,
        isDeleteFulfilled: true,
        isDeleteRejected: false,
      };
    }
    case deleteTodo.rejected:
      return {
        ...prevState,
        errorDelete: action.payload,
        isDeletePending: false,
        isDeleteFulfilled: false,
        isDeleteRejected: true,
      };
    case reset.resetStatusPost:
      return {
        ...prevState,
        isPostFulfilled: false,
        isPostRejected: false,
      };
    case reset.resetStatusGet:
      return {
        ...prevState,
        isGetFulfilled: false,
        isGetRejected: false,
      };
    case reset.resetStatusUpdate:
      return {
        ...prevState,
        isUpdateFulfilled: false,
        isUpdateRejected: false,
      };
    case reset.resetStatusDelete:
      return {
        ...prevState,
        isDeleteFulfilled: false,
        isDeleteRejected: false,
      };
    case changeStep: {
      let updatedTodos = prevState.todos.map((item) => {
        if (item.id == action.payload.id) {
          return {
            ...item,
            ...action.payload,
          };
        } else {
          return item;
        }
      });
      return {
        ...prevState,
        todos: updatedTodos,
        dataChange: action.payload,
        isChangePending: false,
        isChangeFulfilled: true,
        isChangeRejected: false,
      };
    }
    default:
      return prevState;
  }
};

export default todosReducer;
