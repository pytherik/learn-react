import { useState, useEffect } from "react";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";

const  App = () => {
  const [showAddTask, setShowAddTask] = useState(false);
  const [ tasks, setTasks ] = useState([]);

  //info Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks');
    return await res.json();
  }

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    }
    getTasks();
  }, []);

  //info AddTask
  const addTask = async (task) => {
    await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(task)
    })

    const tasksFromServer = await fetchTasks();
    setTasks(tasksFromServer);
    console.log(tasks);
  }
  
  //info Delete Task
  const deleteTask = async id => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE'
    })
    setTasks(tasks.filter(task => task.id !== id));
  }

  //info Toggle Reminder
  const toggleReminder = id => {
    setTasks(tasks.map(task => task.id === id
      ? {...task, reminder: !task.reminder} : task))
  }

  return (
    <div className="container">
      <Header onAdd={ () => setShowAddTask(!showAddTask) }
              showAddTask={showAddTask}/>
      {showAddTask && <AddTask onAdd={addTask}/>}
      {tasks.length > 0 ?
      <Tasks tasks={tasks}
             onDelete={deleteTask}
             onToggle={toggleReminder}/> :
        'No Tasks to show'
      }
    </div>
  );
}

export default App;
