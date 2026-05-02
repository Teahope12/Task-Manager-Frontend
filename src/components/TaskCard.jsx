import React, { useState } from 'react';
import './TaskCard.css';

const TaskCard = ({ task, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);

  const handleUpdate = () => {
    onUpdate(task._id, editedTask);
    setIsEditing(false);
  };

  const getStatusColor = (status) => {
    const colors = {
      'pending': '#ed8936',
      'in-progress': '#4299e1',
      'completed': '#48bb78'
    };
    return colors[status] || '#718096';
  };

  if (isEditing) {
    return (
      <div className="task-card editing">
        <input
          type="text"
          value={editedTask.title}
          onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
          placeholder="Title"
        />
        <textarea
          value={editedTask.description}
          onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
          placeholder="Description"
        />
        <select
          value={editedTask.status}
          onChange={(e) => setEditedTask({ ...editedTask, status: e.target.value })}
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <select
          value={editedTask.priority}
          onChange={(e) => setEditedTask({ ...editedTask, priority: e.target.value })}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <div className="task-actions">
          <button onClick={handleUpdate} className="btn-save">Save</button>
          <button onClick={() => setIsEditing(false)} className="btn-cancel">Cancel</button>
        </div>
      </div>
    );
  }

  return (
    <div className="task-card">
      <div className="task-header">
        <h3>{task.title}</h3>
        <div className="task-badges">
          <span className="status-badge" style={{ background: getStatusColor(task.status) }}>
            {task.status}
          </span>
          <span className={`priority-badge priority-${task.priority}`}>
            {task.priority}
          </span>
        </div>
      </div>
      <p className="task-description">{task.description}</p>
      <div className="task-footer">
        <small>Created: {new Date(task.createdAt).toLocaleDateString()}</small>
        <div className="task-actions">
          <button onClick={() => setIsEditing(true)} className="btn-edit">Edit</button>
          <button onClick={() => onDelete(task._id)} className="btn-delete">Delete</button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;