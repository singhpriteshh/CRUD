import { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState("");

  // Fetch tasks from the server
  useEffect(() => {
    axios.get('http://localhost:5000/tasks')
      .then((response) => setTasks(response.data))
      .catch((err) => console.error(err));
  }, []);

  // Add a new task
  const addTask = () => {
    axios.post('http://localhost:5000/tasks', { taskName })
      .then((response) => {
        setTasks([...tasks, response.data]);
        setTaskName('');
      })
      .catch((err) => console.error(err));
  };

  //Update a task
  const updateTask = (id, taskName)=> {
    axios.put(`http://localhost:5000/tasks/${id}`, {taskName})
    .then(response => setTasks(tasks.map(task=> (task._id === id ? response.data : task))));
  }

  // Delete a task
  const deleteTask = (id) => {
    axios.delete(`http://localhost:5000/tasks/${id}`)
      .then(() => setTasks(tasks.filter((task) => task._id !== id)))
      .catch(() => console.log("Error deleting the taks"));
  };
  

  return (
    <div className=''>
      <h1 className='text-3xl bg-white-500'>Todo List</h1>
      <input
        type="text"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
      />
      <button onClick={addTask}>Add Task</button>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            <input
            type='text'
            value={task.taskName}
            onChange={(e) => updateTask(task._id, e.target.value)}
            />
            <button onClick={() => deleteTask(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
