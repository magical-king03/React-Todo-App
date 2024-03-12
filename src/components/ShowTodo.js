import { useState } from 'react';
import '../assests/css/App.css';
function ShowTodo(props) {
    let [change, setChange] = useState(false)
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

    function infoHandler(){
        if(change)
        setChange(false)
        else
        setChange(true)
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
        <div>
            <div className={Todos.length ? 'block overflow-hidden' : 'hidden'}>
                <div style={{ overflowY: 'auto', height: 'calc(100vh - 250px)', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                {Todos.map((todo, index) => (
                    <div key={index} className=''>
                        <div className="">
                            <div>
                                <div className='flex items-center gap-3 justify-center mt-[30px]'>
                                    {
                                        todo.completed ?
                                            <input type='checkbox' className='cus-checkbox' disabled checked />
                                            :
                                            <input type='checkbox' onClick={() => checkHandler(todo.id)} className='cus-checkbox' />

                                    }
                                    <div className='w-[800px] bg-[#a06b47] h-[70px] px-4 py-4 rounded-lg text-3xl font-bold text-white flex items-center justify-between'>
                                        {todo[0].name}
                                        <div>
                                            {change ?
                                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAADZklEQVR4nO2aTUtVURSGn6JPyz7oO2/QH0izaTpo3MTsN0QlNG6UNmyepok/QNFZBIUlRd+YoWQZiQUh6sBEiQZidmLDEi6Xe889e699rvvGeeGdXM5ea73r7rP32utsyJAhQ4YMGTIokAOagEtAG9ABdAJDwAjwXjgNzABzwBKwAkTCFfltTp6Zzhs3IrY6xXab+GoS35uCs0APsJAnYrNoYugGGiohfB/QB6wHILyQJqZeoDYt8aeAjwEILceJNF6NWjEcVQk/Aft9JqAvAFG2NK+DtwVvPQBBtjQx1/tIQE8AYlzZ5SMBCwEIceW8VnwuABFa1mkS0ByAAC1NxeiMywEI0LJVk4C2AARoeU2TgNsBCNCyXZOAewEI0PKuJgFDAQjQckCTgGcBCNDS9BOc8dbS2RtgNUUxq+LDNiZnTFg4egrsBM6nVD0uAheA7cAji3EfNAn4ktDJaEEjIiftLF/izR9xOs9+DfDa4mjsjG8JHPwFGouM3QMMehA/KLYK0Si+y403PUZnzCUMcrpEzb0FuOl4nDbi7gBbi9g9BnxOaGdWk4Ali4C/AidL2LlY0AUux18xJexRmdY2a4czflv+a2bNOFHC1pmEr9QP4FyM+EnLmEwynfHHYepOAcdL2DsEPIkZ+0JEFsMRx6bsWqUTEMmqfbiEzW3ybheOuS9bXDEcBMYcY1mr5CsQ5XFc/vFSuCKFjQnwRsxzB2SbdY1D9Qr8VDiOpBYwAuIaLs1lxGvricVKbINRDMdkCrt8hbItxb1vg989BLBRjxtBSWEKn+eefM9UohSOEvBVwu92NZ5PoapSeNxjIIYvgb1lxI949qk6DL3zHMzGXl+stt8tJ0rf/syhKbiGyLAIzhc/HGJDZDCloAwfA7uAHcCDFP30axLQlWJghg+FwTZFO1IOrhK8pUnA9QAEaHlVk4DWAARoaW6UOaMpAAFamiatM3IBCNjUz+PVfkHCHObU6A5AiCvN7VI1Gqr4kpTpQ3pBbwCCbGlmrjfUpnAyTJOTlv2HxDtCNdwWHfex8sfNhN5A14R1mfZx/QZvqJfbI/OBbHVdPhc8W9RJxdgiF5La5QQ2IGf8UensTkl/blY+uS3niViW32blmSkZMyo2BsRmu/hoEZ+pTfUMGTJkyJCB/x//AOLbSKZkyn6XAAAAAElFTkSuQmCC" alt="Drop-down" className="cursor-pointer h-[25px] w-[25px] md:w-[50px] md:h-[50px]" onClick={infoHandler} />
                                            : <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAADVklEQVR4nO2aTUuUURTHf0WvlqX0nhP0BdJsmy1atzH7DFEJrVulLVuXpokfINFdBJUlvZoxFkqakmgQYi5KlGghZhMXjiCDzzjPPfc+cyeeP/w3w3PPOf8z9/XcCylSpEiRIkUKBTJAA3ARaAZagTagDxgAhoVTwDQwBywAS0BOuCS/zck3U+vaDYitNrHdLL4axHdJcBroBObXiSgVTQwdQF0SwvcB3cBqAMLzaWLqAip9iT8BfApA6GYc9TE0KsVwrkw4Dux3mYDuAETFpRkOzia81QAExaWJudZFAjoDEGPLdhcJmA9AiC2/a8VnAhChZY0mAecCEKCl2TFa41IAArRs0iSgOQABWl7VJOBWAAK0bNEkoN1zcI+EPn2YU6Q1+jwG9gTYBewAHnr006NJwAtPQT0V8WvYDfR78mXqCdZ47yGgV8CeDXyZJDz34G9Qk4BRx8G8AfYW8Fch/5hLnx81CZh0GMjbIosVFY6HnjkaW+Orw24Yp1JjhshLR75NjdEacw4C+ABUW5bfhhz4n9Uk4KfSeRao2uSsYRiFKqkMa2L4oUnAb4XjEeBAAduXgWVgBbi+SRKyijh+aRLwx9KpWT0ORtjcBtzeoM19YHtEm2oZSjaxrCSdgAngaIQ90yOeFWj7Gjgc0faQZVV6JckhMAkci7B1CpgpwsY34EyEDZOcsSSHwEIMR1+A4xF2LuRdhRUTdFOBJIwnNQnOFelkKqL0tAW4YVlV/itzxdYN7B4BPiexDM4UGWh9xGam10J4Pnsjzg714tvrRmiyyCCzeTu9jIP1O39VOZm3XR5MYis8EiNIc4jZCZz1VEo3Y/m81A8eJ3UYGooZ5DvZ3OQ8cVl8xI0puIJILkGqCiK9AQjQ8kHIRdFcAryjSUBrAAK0vKlJwLUABGh5RZOApgAEaGlelFmjIQABWpp9iTUyAQgo6fV4uT+QMIc5NToCEFKSe8E11JXxIylThHGCrgAExaXpuc5QGfNkWGqOyb2CU2TK5LXoiIuZv1BP6Ap0TliVbl/o8tUZaoF78g4vhKWu3eWEFxc1smNslAdJ5k3OXXmZ0S/lsmG5L5iWIqWpNi+uE7Eov83KNxPSJis2esRmi/hoFJ/eunqKFClSpEjB/49/l3pIoX36BroAAAAASUVORK5CYII=" className="cursor-pointer w-[25px] h-[25px] md:w-[50px] md:h-[50px]" alt="Drop-down" onClick={infoHandler} />}
                                        </div>
                                    </div>
                                    {/* <div className='text-left'>
                                <p className='text-3xl font-bold mx-3'>Task name: {todo[0].name || 'No name'}</p>
                                <p className='text-xl m-3 p-2'>Task Description: {todo[0].desc || 'No description'}</p>
                            </div> */}

                                </div>

                            </div>
                            {/* <div className='t'>
                            <button className={todo.completed ? 'hidden' : 'bg-[#ff0000] text-white px-3 py-2 rounded-lg cursor-pointer ml-[70px]'} onClick={() => deleteHandler(todo.id)}>Delete</button>
                            </div> */}
                        </div>

                    </div>
                ))}
                </div>

            </div>
            <div className={Todos.length === 0 ? 'block' : 'hidden'}>
                No tasks avaiable to do
            </div>
        </div>
    )
}

export default ShowTodo;


// import { useState } from 'react';
// import '../assests/css/App.css';

// function ShowTodo(props) {
//     let [Todos, setTodos] = useState([])
//     let name1 = localStorage.getItem('name')
    
//     fetch('https://todo-app-f0a16-default-rtdb.firebaseio.com/todos.json')
//         .then(response => response.json())
//         .then(data => {
//             let tempTodos = []
//             for (const key in data) {
//                 let todo = {
//                     id: key,
//                     ...data[key],
//                 }
//                 tempTodos.push(todo)
//             }
//             let todosFound = tempTodos.filter((tempUs) => name1 === tempUs[0].addedBy);
//             setTodos(todosFound);
//         })

//     async function deleteHandler(id) {
//         try {
//             const deleteUrl = `https://todo-app-f0a16-default-rtdb.firebaseio.com/todos/${id}.json`;
//             await fetch(deleteUrl, {
//                 method: 'DELETE',
//             });
//         } catch (error) {
//             console.error('Error deleting todo:', error);
//         }
//     }

//     async function checkHandler(id) {
//         try {
//             const updateUrl = `https://todo-app-f0a16-default-rtdb.firebaseio.com/todos/${id}.json`;

//             await fetch(updateUrl, {
//                 method: 'PATCH',
//                 body: JSON.stringify({ completed: true }),
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//             });
//         } catch (error) {
//             console.error('Error updating todo status:', error);
//         }
//     }

//     return (
//         <div className='w-full px-8'>
//             <h1 className={Todos.length ? 'text-4xl font-bold m-5 mb-[50px] underline' : 'hidden'}>All tasks</h1>
//             <div style={{ overflowY: 'auto', height: 'calc(100vh - 200px)' }}>
//                 {Todos.map((todo, index) => (
//                     <div key={index} className='mb-[75px]'>
//                         <div className="text-left">
//                             <div className='flex items-start gap-3'>
//                                 {
//                                     todo.completed ?
//                                         <input type='checkbox' style={{ transform: 'scale(1.5)', color: 'blue', margin: '12px' }} className='p-3' disabled checked />
//                                         :
//                                         <input type='checkbox' onClick={() => checkHandler(todo.id)} style={{ transform: 'scale(1.5)', margin: '14px' }} className='p-3' />
//                                 }
//                                 <div className='text-left'>
//                                     <p className='text-3xl font-bold mx-3'>Task name: {todo[0].name || 'No name'}</p>
//                                     <p className='text-xl m-3 p-2'>Task Description: {todo[0].desc || 'No description'}</p>
//                                 </div>
//                             </div>
//                         </div>
//                         <button className={todo.completed ? 'hidden' : 'bg-[#ff0000] text-white px-3 py-2 rounded-lg cursor-pointer ml-[70px]'} onClick={() => deleteHandler(todo.id)}>Delete</button>
//                     </div>
//                 ))}
//             </div>
//             <div className={Todos.length === 0 ? 'block' : 'hidden'}>
//                 No tasks available to do
//             </div>
//         </div>
//     )
// }

// export default ShowTodo;
