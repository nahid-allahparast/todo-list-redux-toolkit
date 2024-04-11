import { useDispatch } from "react-redux";
import {
  deleteAsyncTodos,
  deleteTOdo,
  toggleTodo,
  toggleeAsyncTodos,
} from "../features/todo/todoSlice";

function TodoItem({ id, title, completed }) {
  const dispatch = useDispatch();

  return (
    <li className={`list-group-item ${completed && "list-group-item-success"}`}>
      <div className="d-flex justify-content-between">
        <span className="d-flex align-items-center gap-1">
          <input
            className="mr-3"
            onChange={() =>
              dispatch(toggleeAsyncTodos({ id, completed: !completed }))
            }
            checked={completed}
            type="checkbox"
          />
          <label>{title}</label>
        </span>
        <button
          className="btn btn-danger"
          onClick={() => dispatch(deleteAsyncTodos({ id }))}
        >
          delete
        </button>
      </div>
    </li>
  );
}

export default TodoItem;
