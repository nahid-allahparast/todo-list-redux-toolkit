// import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AddTodoForm from "./components/AddTodoForm";
import TodoList from "./components/TodoList";
import { Provider } from "react-redux";
import store from "./features/store";

function App() {
  return (
    <Provider store={store}>
      <div className="container pt-3">
        <AddTodoForm />
        <TodoList />
      </div>
    </Provider>
  );
}

export default App;
