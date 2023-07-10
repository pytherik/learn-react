import { useState } from "react";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
const  App = () => {
  const [ tasks, setTasks ] = useState([
    {
      id: 1,
      text: 'Doctors Appointment',
      day: 'Feb 5th at 2:30pm',
      reminder: true
    },
    {
      id: 2,
      text: 'Meeting at School',
      day: 'July 12th at 8:00am',
      reminder: true
    },
    {
      id: 3,
      text: 'Food Shopping',
      day: 'July 15th at 4:00pm',
      reminder: false
    }
  ])

  //info Delete Task

  const deleteTask = id => {
   setTasks(tasks.filter(task => task.id !== id));
  }
  return (
    <div className="container">
      <Header />
      {tasks.length > 0 ?
      <Tasks tasks={tasks}
             onDelete={deleteTask} /> :
        'No Tasks to show'
      }
    </div>
  );
}

export default App;
