import { InProgress } from "./Inprogress"
import {useNavigate} from "react-router-dom"
import {useSelector} from "react-redux";
import { useState } from "react";

export const   Form=()=>{  
    const navigate=useNavigate();
    const [date,setDate]=useState("");
    const [text,setText]=useState("");
    const todo=useSelector((store)=>store.todos.todos)
    const [form,setForm]=useState({
      title:"",
      date:"",
      category:"",
      where:""

    })


    function handleChange(e){
      const {name,value}=e.target;
      if(e.target.name=="title"){
        setText(e.target.value);
      }
      if(e.target.name=="date"){
        setDate(e.target.value);
      }
      setForm({
          ...form,
          [name]:value
      })
    }

 function handleSubmit(e){
e.preventDefault();

fetch("http://localhost:8080/todos",{
  method:"POST",
  headers:{
    "content-type":"application/json"
  },
  body:JSON.stringify(form)
})
setText("");
setDate("");
}

return (<div>
    <form onSubmit={handleSubmit}>
<input 
type="text"
value={text}
placeholder="ADD TODO"
onChange={handleChange}
name="title"
/>
<input
type="date"
name="date"
value={date}
onChange={handleChange}
placeholder="Date"/>
<br/>
Select Category
<div  onChange={handleChange}    name="category" >
    <input 
    type="radio"
    name="category"
    value="Personal"
    
      
    />
     <label>Personal</label><br></br>
     <input 
    type="radio"
    name="category"
    value="Official"
      
    />
     <label >Official</label><br></br>
     <input 
    type="radio"
    name="category"
    value="Others"

  
    />
     <label     >Others</label><br></br>
</div>

<br/>

<div>
    <input 
    type="radio"
    name="where"
    onChange={handleChange}
     value="todo" 
    />
     <label     >Todo</label><br></br>
     <input 
    type="radio"
    name="where"
    onChange={handleChange}
    value="inprogress"
      
    />
    <label >In Progress</label><br></br>
     <input 
    type="radio"
    name="where"
    onChange={handleChange}
    value="done"
    />
     <label  >done</label><br></br>
     
</div>
<input 
type="submit"
value="Submit"/>
</form>
<button 
onClick={()=>
navigate("/form" ,  { replace:true})}>Create A New Task</button>

</div>)
}