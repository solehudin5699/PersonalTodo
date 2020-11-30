import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./home.css";
import Drawer from "../../components/Home/Drawer";
import TodoList from "../../components/Home/TodoList";
import AddButton from "../../components/Home/AddButton";
import { getAllTodos } from "../../redux/actions/todos/read.todos";
import LoadingIndicator from "../../components/Home/LoadingIndicator";

export default function Home() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { todos, isGetPending } = useSelector((state) => state.todos);
  useEffect(() => {
    dispatch(getAllTodos({ username: user.username }));
  }, [dispatch]);
  return (
    <div className='containerHome'>
      <Drawer />
      <div className='container_todolist'>
        {/* {isGetPending ? (
          <LoadingIndicator />
        ) : todos.length ? (
          <TodoList />
        ) : (
          <p>Empty</p>
        )} */}
        <TodoList />
      </div>
      <AddButton />
    </div>
  );
}
