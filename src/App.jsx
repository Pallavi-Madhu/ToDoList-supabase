import { useState } from "react";
import "./App.css";
import supabase from "./config/SupabaseClient";

function App() {
  const[toDo,setToDo] = useState([])
  const[newToDO,setNewToDo] = useState("")

  const addToDo = async() => {
    const newtododata = {
      Name:newToDO,
      Is_completed:false,
    };
    const{data,error} = await supabase
    .from ("ToDoList-Supabase")
    .insert([newtododata])
    .single();

    if(error){
      console.log("error")
    }
    if(data){
     console.log("New Todo Data:", newtododata);

    }
  }
  return (
    <>
      <div>
        <h1>To Do list</h1>
        <div>
          <input
            type="text"
            placeholder="New todo..."
            onChange={(e) => setNewToDo(e.target.value)}
          />
          <button onClick={addToDo}>Add a todo item</button>
        </div>
        <ul></ul>
      </div>
    </>
  );
}

export default App;
