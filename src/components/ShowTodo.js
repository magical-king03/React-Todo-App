import '../assests/App.css';
function ShowTodo(props){
    return(
        <div className="todo-card">
            <p className='todo-name'>Task name: {props.name}</p>
            <p className='todo-name'>Task Description: {props.desc}</p>
        </div>
    )
}

export default ShowTodo;