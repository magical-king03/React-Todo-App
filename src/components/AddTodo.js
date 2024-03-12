import { useNavigate } from 'react-router-dom';
import '../assests/css/index.css';
import add_todo from "../assests/img/add_todo.png"
import { useState, useRef, useEffect } from 'react';
let tempTodos = {}
function AddTodo() {
  let loggedin = localStorage.getItem('loggedin') === 'true'
  let name1 = localStorage.getItem('name')
  let name = useRef()
  let desc = useRef()
  let date = useRef()
  let addedBy = useRef()
  let [Todos, setTodos] = useState([])
  let navigate = useNavigate()
  function addTaskHandler() {
    let taskName = name.current.value;
    let taskDesc = desc.current.value;
    let taskDate = date.current.value;
    let taskAddedBy = addedBy.current.value
    console.log(taskDate)
    tempTodos = {
      name: taskName,
      desc: taskDesc,
      date: taskDate,
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
    // <div className="">
    //   <div className='text-center m-auto w-full pt-[50px]'>
    //     <h2 className='text-4xl font-bold p-4'>Manage your tasks <span className='text-[#a8a8a8]'>@{name1.slice(0, name1.indexOf(' ')).toLowerCase()}</span></h2>
    //     <p className='text-xl text-[#a8a8a8]'>start writing your tasks and manage it #taskmanager </p>
    //     <div className='text-center m-auto'>
    //       <input type='text' placeholder='Enter the task' className='border-1 border-black p-[10px] mt-5 border mb-5 rounded-lg w-[300px]' ref={name} />
    //       <br />
    //       <input type='text' placeholder='Enter the description' className='border-1 border-black p-[10px] mb-5 border rounded-lg w-[300px]' ref={desc} />
    //       <input type='hidden' value={name1} ref={addedBy} />
    //     </div>
    //     <button className='bg-black text-white px-5 py-3 rounded-lg cursor-pointer' onClick={addTaskHandler}>Sumbit</button>
    //   </div>
    // </div>
    <div>
      <div className='hidden md:block'>
        <div className='grid grid-cols-2'>
          <div className=''>
            <img src={add_todo} alt='Add your Todo task' className='lg:ml-[250px] lg:mt-[50px] lg:w-[425px] lg:h-[425px] md:ml-[40px] md:mt-[10px] w-[250px] h-[300px]' />
          </div>
          <div>
            <input type='text' placeholder='Enter the task' className='bg-[#a06b47] w-[350px] rounded-lg text-xl px-5 py-3 lg:mt-[30px] md:mt-[10px] text-white' ref={name} />
            <br />
            <textarea className='bg-[#a06b47] w-[350px] rounded-lg mt-3 px-5 py-3 text-white hidden lg:block' rows={8} placeholder='Enter the description' ref={desc}></textarea>
            <textarea className='bg-[#a06b47] w-[350px] rounded-lg mt-3 px-5 py-3 text-white lg:hidden block' rows={2} placeholder='Enter the description' ref={desc}></textarea>
            <input type='date' placeholder='Enter the date' className='mt-3 bg-[#a06b47] text-white w-[350px] rounded-lg text-xl px-5 py-3' ref={date} />
            <input type='hidden' value={name1} ref={addedBy} />
            <br />
            <div className='w-[350px] text-center'>
              <button className="bg-white text-black mt-3 border-1 border-black border px-7 py-3 rounded-full cursor-pointer" onClick={addTaskHandler}>
                Add task
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className='md:hidden block'>
        <div className=''>
          <div className='hidden'>
            <img src={add_todo} alt='Add your Todo task' className='lg:ml-[250px] lg:mt-[50px] lg:w-[425px] lg:h-[425px] md:ml-[40px] md:mt-[10px] w-[250px] h-[300px]' />
          </div>
          <div>
            <div className='flex items-center justify-center'>
              <input type='text' placeholder='Enter the task' className='bg-[#a06b47] w-[300px] rounded-lg text-xl px-5 py-3 mt-5 text-white' ref={name} />
            </div>
            <div className='flex items-center justify-center'>
              <textarea className='bg-[#a06b47] w-[300px] rounded-lg mt-3 px-5 py-3 text-white block' rows={5} placeholder='Enter the description' ref={desc}></textarea>
            </div>
            <div className='flex items-center justify-center'>
              <input type='date' placeholder='Enter the date' className='mt-3 bg-[#a06b47] text-white w-[300px] rounded-lg text-xl px-5 py-3' ref={date} />
            </div>
            <input type='hidden' value={name1} ref={addedBy} />
            <br />
            <div className='w-[350px] text-center'>
              <button className="bg-white text-black mt-3 border-1 border-black border px-7 py-3 rounded-full cursor-pointer" onClick={addTaskHandler}>
                Add task
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddTodo;
