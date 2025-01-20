import { useState } from "react";
import "./App.css";
import supabase from "./config/SupabaseClient";

function App() {
 const [newtodo , setNewToDo]  = useState('')
 //const [isCompleted , setIsCompleted ] = useState('')
 const[formError ,setFormError] = useState(null)

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
      {formError && <p className="errot=r">{formError}</p>}
    </form>
  </div>
)
}

export default App;
