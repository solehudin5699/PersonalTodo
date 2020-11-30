import { combineReducers } from "redux";
import authReducer from "./users/auth";
import todosReducer from "./todos/todos";
//Combine reducers
const indexReducer = combineReducers({
  auth: authReducer,
  todos: todosReducer,
});

export default indexReducer;
