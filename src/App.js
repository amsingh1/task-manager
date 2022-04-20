import "./App.css";
import React from "react";
import { nanoid } from "nanoid";
import TaskList from "./TaskList";

//toget the data from local Storages 
const getLocalStorages = () =>{
 let list=localStorage.getItem('taskList')
if (list){
  return  JSON.parse(localStorage.getItem('taskList'))
} else {
  return []
}
// 
  
}

function App() {
  const [work, setWork] = React.useState("");


 const [tasks, setTasks] = React.useState(getLocalStorages());

//store to local storage
  React.useEffect(()=>{
  localStorage.setItem('taskList', JSON.stringify(tasks));
  },[tasks])

  const handleForm = (event) => {
    const { value } = event.target;
    setWork(value);
  };

  const handleChecked = (id) => {
    setTasks((prevState) =>
      prevState.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (work === "") {
      return;
    }

    const newTask = {
      todo: work,
      completed: false,
      id: nanoid(),
    };

    setTasks((prevState) => [newTask,...prevState ]);

    setWork("");
  };
  const handleDelete = (id) => {
    setTasks((prevState) =>
      prevState.filter((task) => (task.id === id ? "" : task))
    );
  };

  const workList = tasks.map((task) => (
    <TaskList
      key={task.id}
      todo={task.todo}
      checked={task.completed}
      handleChecked={() => handleChecked(task.id)}
      handleDelete={() => handleDelete(task.id)}
    />
  ));
  return (
    <div className="App">
      <h1 className="heading">Task Manager</h1>
      
      <form onSubmit={handleSubmit}>
      <div className=" d-flex justify-content-sm-evenly">
        <input type="text" className="form-control rounded-pill " placeholder="My Task.."name="task" value={work} onChange={handleForm} />
        <button className="add btn btn-success rounded-pill">Add</button>
        </div>
      </form>
     
      
      <div className="list-column">{workList}</div>
    </div>
  );
}

export default App;
