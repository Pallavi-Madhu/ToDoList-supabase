import { useEffect, useState } from "react";
import "./App.css";
import supabase from "./config/SupabaseClient";

function App() {
  const [newtodo, setNewToDo] = useState("");
  const [formError, setFormError] = useState(null);
  const [fetchError, setFetcherror] = useState(null);
  const [updateError, setUpdateError] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchtodos = async (e) => {
      const { data, error } = await supabase.from("SupaList").select("*");

      if (error) {
        setFetcherror("Can't fetch data");
      } else {
        setFetcherror(null);
        setTodos(data);
      }
    };
    fetchtodos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from("SupaList")
      .insert([{ Name: newtodo, Is_completed: false }]);

    if (error) {
      setFormError("pls fill in the details");
    } else {
      console.log("Inserted data:", data);
      setFormError(null);
      setNewToDo("");
      //setTodos([...todos, ...data]);
      //setTodos((prevTodos) => [...prevTodos, data[0]])
      if (data && data.length > 0) {
        setTodos((prevTodos) => [...prevTodos, data[0]]);
      }
    }
  };

  const completeTask = async (id, Is_completed) => {
    const { data, error } = await supabase
      .from("SupaList")
      .update({ Is_completed: !Is_completed })
      .eq("id", id);

    if (error) {
      setUpdateError("error");
    } else {
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, Is_completed: !Is_completed } : todo
        )
      );
    }
  };

  const deleteTask = async (id) => {
    const { error } = await supabase.from("SupaList").delete().eq("id", id);

    if (error) {
      console.log("error deleting tasks");
    } else {
      setTodos(todos.filter((todo) => todo.id !== id));
    }
  };

  return (
    <div className="page">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="newtodo"
          placeholder="Add a new todo"
          value={newtodo}
          onChange={(e) => setNewToDo(e.target.value)}
        />
        <button>Add a task</button>
        {formError && <p className="error">{formError}</p>}
      </form>
      <div className="todos">
        {fetchError && <p className="fetcherror">{fetchError}</p>}
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              <p>{todo.Name}</p>
              <button onClick={() => completeTask(todo.id, todo.Is_completed)}>
                {todo.Is_completed ? "Undo" : "Completed the task"}
              </button>
              <button onClick={() => deleteTask(todo.id)}>Delete task</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
