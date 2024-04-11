import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAsyncTodos, addTodo } from "../features/todo/todoSlice";

function AddTodoForm() {
  const [newNote, setNewNote] = useState("");
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.todos);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!newNote) return alert("Please add your NOTE!");
    dispatch(addAsyncTodos({ title: newNote }));
    setNewNote("");
  };

  return (
    <form
      className={`form-inline mt-3 mb-4 ${
        loading ? "opacity-50" : "opacity-100"
      }`}
      onSubmit={submitHandler}
    >
      <label htmlFor="name" className="mb-1">
        Name
      </label>
      <input
        className="form-control mb-2 mr-sm-2"
        autoComplete="off"
        id="name"
        placeholder="Add Todo ..."
        type="text"
        value={newNote}
        onChange={(e) => setNewNote(e.target.value)}
      />
      <button className="btn btn-primary mt-1" type="submit">
        Add
      </button>
    </form>
  );
}

export default AddTodoForm;
