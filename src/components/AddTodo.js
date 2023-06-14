import '../assests/App.css';
import ShowTodo from './ShowTodo';
import { useState, useRef   } from 'react';
let tempTodos = {}
function AddTodo() {
    let name = useRef()
    let desc = useRef()
    let [Todos, setTodos] = useState([])
  function addTaskHandler(){
    let taskName = name.current.value;
    let taskDesc = desc.current.value
    tempTodos = {
        name: taskName,
        desc: taskDesc,
    }
    let newTodos = [...Todos, tempTodos]
    setTodos(newTodos)
  }  
  return (
    <div className='App'>
    
      <h1 className='heading'>Manage your tasks in React TODO App😎</h1>
      {
        Todos.map((todo)=>{
            return <ShowTodo name={todo.name} desc={todo.desc} />
        })
      }
      <div className='card'>
        <h2 className='card-heading'>Manage your tasks <span className='name'>@visweish</span></h2>
        <p className='card-para'>start writing your tasks and manage it #taskmanager #projectTodo</p>
        <input type='text' placeholder='Enter the task' className='card-input' ref={name}/> 
        <input type='text' placeholder='Enter the description' className='card-input' ref={desc}/> 
        <button className='card-btn' onClick={addTaskHandler}>Sumbit</button>
      </div>
    </div>
  );
}

export default AddTodo;
