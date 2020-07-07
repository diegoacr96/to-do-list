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
 
    const addFacts = (resp) => {
        const info = resp.data;
        let temp = [...tasks]
        info.forEach(item => {
            console.log(item.fact);
            temp.push({
                task: item.fact,
                state: false
            });
        });
        setTasks(temp);
    }

    const addCatFacts = (event) => {
        event.preventDefault();
        const num = event.target.cats.value;
        if(num > 0){
            fetch("https://catfact.ninja/facts?limit="+ num +"&max_length=140")
            .then(response => response.json())
            .then(response => addFacts(response))
            .catch(err => console.log(err));
        }
        event.target.cats.value = "";
    }

    return(
        <div>
            <ToDo tasks={tasks} setTasks={setTasks} />
            <form onSubmit = {(event) => addTask(event)}>
                <input type="text" name="task" className="task-input-form" placeholder="new task" />
                <button>+</button>
            </form>
            <form onSubmit = {(event) => addCatFacts(event)}>
                <input type="textarea" className="cat-form" name="cats" placeholder="number of cats" />
                <button>Add random Cat Facts</button>
            </form>
            <button onClick={() => setTasks([])}>Delete All</button>
        </div>
    )
    
}

export default Main;