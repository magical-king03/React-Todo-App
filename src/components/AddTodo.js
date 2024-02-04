import { useNavigate } from 'react-router-dom';
import '../assests/index.css';
import ShowTodo from './ShowTodo';
import { useState, useRef, useEffect } from 'react';
let tempTodos = {}
function AddTodo() {
  let loggedin = localStorage.getItem('loggedin') === 'true'
  let name1 = localStorage.getItem('name')
  let name = useRef()
  let desc = useRef()
  let addedBy = useRef()
  let [Todos, setTodos] = useState([])
  let navigate = useNavigate()
  function addTaskHandler() {
    let taskName = name.current.value;
    let taskDesc = desc.current.value;
    let taskAddedBy = addedBy.current.value
    tempTodos = {
      name: taskName,
      desc: taskDesc,
      addedBy: taskAddedBy
    }
    let newTodos = [...Todos, tempTodos]
    setTodos(newTodos)
    fetch('https://todo-app-f0a16-default-rtdb.firebaseio.com/todos.json', {
      method: 'POST',
      body: JSON.stringify(newTodos),
    })
      .then(response => response.json())
      .then(data => console.log('Success:', data))
      .catch(error => console.error('Error:', error));

  }
  useEffect(() => {
    if (!loggedin) {
      navigate('/login');
    }
  }, [loggedin, navigate]);

  return (
    
    <div className=''>
      {
        loggedin ? 
        <div>
      <div className='text-center m-auto w-full pt-[50px]'>
        <h2 className='text-4xl font-bold p-4'>Manage your tasks <span className='text-[#a8a8a8]'>@{name1.slice(0, name1.indexOf(' ')).toLowerCase()}</span></h2>
        <p className='text-xl text-[#a8a8a8]'>start writing your tasks and manage it #taskmanager </p>
        <div className='text-center m-auto'>
          <input type='text' placeholder='Enter the task' className='border-1 border-black p-[10px] mt-5 border mb-5 rounded-lg w-[300px]' ref={name} />
          <br />
          <input type='text' placeholder='Enter the description' className='border-1 border-black p-[10px] mb-5 border rounded-lg w-[300px]' ref={desc} />
          <input type='hidden' value={name1} ref={addedBy} />
        </div>
        <button className='bg-black text-white px-5 py-3 rounded-lg cursor-pointer' onClick={addTaskHandler}>Sumbit</button>
      </div>
      <hr className='m-8' />
      <ShowTodo />
      </div> : 
      null
      }
      

      

    </div>
  );
}

export default AddTodo;
