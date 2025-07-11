import React from 'react';
import PropTypes from 'prop-types';

function TaskItem({ task, toggleComplete, deleteTask }) {
  return (
    <li style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleComplete(task.id)}
      />
      {task.name} (Priority: {task.priority})
      <button onClick={() => deleteTask(task.id)}>Delete</button>
    </li>
  );
}

TaskItem.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    priority: PropTypes.oneOf(['High', 'Medium', 'Low']).isRequired
  }).isRequired,
  toggleComplete: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired
};

export default TaskItem;