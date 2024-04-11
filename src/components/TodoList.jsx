import { useEffect } from "react";
import TodoItem from "./TodoItem";
import { useSelector, useDispatch } from "react-redux";
import { getAsyncTodos } from "../features/todo/todoSlice";

function TodoList() {
  const { todos, loading, error } = useSelector((state) => state.todos);
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(getAsyncTodos());
  }, []);

  return (
    <div>
      <h2>Todo List</h2>
      {loading ? (
        <p>Loading ...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ul className="list-group">
          {todos.map((todo) => (
            <TodoItem key={todo.id} {...todo} />
          ))}
        </ul>
      )}
    </div>
  );
}

export default TodoList;
