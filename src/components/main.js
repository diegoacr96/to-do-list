import React, {useState} from 'react';

const ToDo = ({tasks, setTasks }) => {

    const dropTask = (idx) => {
        let temp = [...tasks];
        temp.splice(idx,1)
        setTasks(temp);
    }

    const toogleState = (idx) => {
        let temp = [...tasks];
        temp[idx] = {
            task: temp[idx].task,
            state: !temp[idx].state
        }
        setTasks(temp);
    }

    const lista = tasks.map((task,idx) => {
        return(
            <div key={idx} className="task-container">
                <div className="tasks">
                    <input type="checkbox" className="task-check" checked={task.state} onChange={() => toogleState(idx)}/>
                    <label className="task">{task.task}</label> 
                </div>
                <button type="button" onClick = {() => dropTask(idx)}>delete</button>
            </div>
        )
    })
    return (
        <form className="form-container">
            {lista}
        </form>
    );
}


const Main = () => {
    const [tasks, setTasks] = useState([]);

    const addTask = (event) => {
        event.preventDefault(); 
        let temp = [...tasks];
        temp.push({
            task: event.target.task.value,
            state: false
        });
        event.target.task.value = "";
        setTasks(temp);
    }

    return(
        <div>
            <ToDo tasks={tasks} setTasks={setTasks} />
            <form onSubmit = {(event) => addTask(event)}>
                <input type="text" name="task" className="task-input-form" placeholder="new task" />
                <button>+</button>
            </form>
            <button onClick={() => setTasks([])}>Delete All</button>
        </div>
    )
    
}

export default Main;