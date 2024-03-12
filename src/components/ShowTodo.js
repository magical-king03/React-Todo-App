import { useState } from 'react';
import '../assests/css/App.css';
function ShowTodo(props) {
    let [Todos, setTodos] = useState([])
    let name1 = localStorage.getItem('name')
    fetch('https://todo-app-f0a16-default-rtdb.firebaseio.com/todos.json').then(
        response => response.json()).then(data => {
            let tempTodos = []
            for (const key in data) {
                let todo = {
                    id: key,
                    ...data[key],
                }
                tempTodos.push(todo)
            }
            let todosFound = tempTodos.filter((tempUs) => name1 === tempUs[0].addedBy);
            setTodos(todosFound);
        })


    async function deleteHandler(id) {
        try {
            const deleteUrl = `https://todo-app-f0a16-default-rtdb.firebaseio.com/todos/${id}.json`;
            await fetch(deleteUrl, {
                method: 'DELETE',
            });
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    }

    async function checkHandler(id) {
        try {
            const updateUrl = `https://todo-app-f0a16-default-rtdb.firebaseio.com/todos/${id}.json`;

            await fetch(updateUrl, {
                method: 'PATCH',
                body: JSON.stringify({ completed: true }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        } catch (error) {
            console.error('Error updating todo status:', error);
        }
    }
    return (

        <div className='w-full px-8'>
            <h1 className={Todos.length ? 'text-4xl font-bold m-5 mb-[50px] underline' : 'hidden'}>All tasks</h1>
            {Todos.map((todo, index) => (
                <div key={index} className='mb-[75px]'>
                    <div className="text-left">
                        <div className='flex items-start gap-3'>
                            {
                                todo.completed ?
                                    <input type='checkbox' style={{ transform: 'scale(1.5)', color: 'blue', margin: '12px' }} className='p-3' disabled checked />
                                    :
                                    <input type='checkbox' onClick={() => checkHandler(todo.id)} style={{ transform: 'scale(1.5)', margin: '14px' }} className='p-3' />

                            }
                            <div className='text-left'>
                                <p className='text-3xl font-bold mx-3'>Task name: {todo[0].name || 'No name'}</p>
                                <p className='text-xl m-3 p-2'>Task Description: {todo[0].desc || 'No description'}</p>
                            </div>

                        </div>

                    </div>

                    <button className={todo.completed ? 'hidden' : 'bg-[#ff0000] text-white px-3 py-2 rounded-lg cursor-pointer ml-[70px]'} onClick={() => deleteHandler(todo.id)}>Delete</button>
                </div>
            ))}
        </div>


    )
}

export default ShowTodo;