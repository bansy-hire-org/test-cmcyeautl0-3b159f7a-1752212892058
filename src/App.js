import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import './App.css';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem('tasks');
    return storedTasks ? JSON.parse(storedTasks) : [];
  });
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (name, priority) => {
    if (name.trim() === '') {
      alert('Task name cannot be empty.');
      return;
    }
    setTasks([...tasks, { id: uuidv4(), name, completed: false, priority }]);
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const filterTasks = (filterType) => {
    setFilter(filterType);
  };

  const getFilteredTasks = () => {
    if (filter === 'completed') {
      return tasks.filter(task => task.completed === true);
    } else if (filter === 'incomplete') {
      return tasks.filter(task => task.completed === false);
    } else {
      return tasks;
    }
  };

  return (
    <div className="app">
      <h1>Task Manager</h1>
      <TaskForm addTask={addTask} />
      <div>
        <button onClick={() => filterTasks('all')}>All</button>
        <button onClick={() => filterTasks('completed')}>Completed</button>
        <button onClick={() => filterTasks('incomplete')}>Incomplete</button>
      </div>
      <TaskList
        tasks={getFilteredTasks()}
        toggleComplete={toggleComplete}
        deleteTask={deleteTask}
      />
    </div>
  );
}

export default App;