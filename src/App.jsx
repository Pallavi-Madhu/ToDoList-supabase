import { useEffect, useState } from "react";
import "./App.css";
import supabase from "./config/SupabaseClient";

function App() {
 const [newtodo , setNewToDo]  = useState('')
 const[formError ,setFormError] = useState(null)
 const[fetchError , setFetcherror] = useState(null)
 const[todos,setTodos] = useState([])

 useEffect(() => {
  const fetchtodos = async (e) =>{
    const{data,error} = await supabase 
    .from ('SupaList')
    .select("*")

    if(error){
      setFetcherror("Can't fetch data")
    }
    else{
      setFetcherror(null)
      setTodos(data)
    }
  }
  fetchtodos()
 },[])

  const handleSubmit = async(e) => {
    e.preventDefault();
    const{data,error} = await supabase 
    .from('SupaList')
    .insert([{Name:newtodo, Is_completed:false}])
  
  if(error){
    setFormError("pls fill in the details")
  }
  else{
    console.log("Inserted data:", data);
    setFormError(null);
    setNewToDo(""); 
  }
}

return(
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
          <li key={todo.id}>{todo.Name}</li>
        ))}
      </ul>
    </div>
  </div>
)
}

export default App;
