import '../assests/index.css';
import ShowTodo from './ShowTodo';
import { useState, useRef } from 'react';
let tempTodos = {}
function AddTodo() {
  let name = useRef()
  let desc = useRef()
  let [Todos, setTodos] = useState([])
  function addTaskHandler() {
    let taskName = name.current.value;
    let taskDesc = desc.current.value
    tempTodos = {
      name: taskName,
      desc: taskDesc,
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

  return (
    <div className=''>
      <div className='w-full h-full text-center border p-[16px] bg-[#0000ff]'>
        <h1 className='md:text-4xl text-2xl p-2 font-bold text-white'>Manage your tasks in React TODO App</h1>
      </div>

      <div className='text-center m-auto w-full pt-[50px]'>
        <h2 className='text-4xl font-bold p-4'>Manage your tasks <span className='text-[#a8a8a8]'>@visweish</span></h2>
        <p className='text-xl text-[#a8a8a8]'>start writing your tasks and manage it #taskmanager </p>
        <div className='text-center m-auto'>
          <input type='text' placeholder='Enter the task' className='border-1 border-black p-[10px] mt-5 border mb-5 rounded-lg w-[300px]' ref={name} />
          <br />
          <input type='text' placeholder='Enter the description' className='border-1 border-black p-[10px] mb-5 border rounded-lg w-[300px]' ref={desc} />
        </div>
        <button className='bg-black text-white px-5 py-3 rounded-lg cursor-pointer' onClick={addTaskHandler}>Sumbit</button>
      </div>
      <hr className='m-8' />
      <ShowTodo />

    </div>
  );
}

export default AddTodo;
