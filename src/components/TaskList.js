import React from 'react';
import TaskItem from './TaskItem';
import PropTypes from 'prop-types';

function TaskList({ tasks, toggleComplete, deleteTask }) {
  return (
    <ul>
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          toggleComplete={toggleComplete}
          deleteTask={deleteTask}
        />
      ))}
    </ul>
  );
}

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    priority: PropTypes.oneOf(['High', 'Medium', 'Low']).isRequired
  })).isRequired,
  toggleComplete: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired
};

export default TaskList;