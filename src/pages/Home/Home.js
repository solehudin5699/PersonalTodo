import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./home.css";
import Drawer from "../../components/Home/Drawer";
import TodoList from "../../components/Home/TodoList";
import AddButton from "../../components/Home/AddButton";
import { getAllTodos } from "../../redux/actions/todos/read.todos";

export default function Home() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(getAllTodos({ username: user.username }));
  }, [dispatch]);
  return (
    <div className='containerHome'>
      <Drawer />
      <div className='container_todolist'>
        <TodoList />
      </div>
      <AddButton />
    </div>
  );
}
