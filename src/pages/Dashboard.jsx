import React, { useState, useEffect } from 'react';
import TaskCard from '../components/TaskCard';
import { getTasks, createTask, updateTask, deleteTask } from '../services/taskService';
import { useAuth } from '../hooks/useAuth';
import './Dashboard.css';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    status: 'pending',
    priority: 'medium'
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const data = await getTasks();
      setTasks(data);
    } catch (err) {
      setError('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      const created = await createTask(newTask);
      setTasks([created, ...tasks]);
      setShowForm(false);
      setNewTask({ title: '', description: '', status: 'pending', priority: 'medium' });
    } catch (err) {
      setError('Failed to create task');
    }
  };

  const handleUpdateTask = async (id, updatedTask) => {
    try {
      const updated = await updateTask(id, updatedTask);
      setTasks(tasks.map(task => task._id === id ? updated : task));
    } catch (err) {
      setError('Failed to update task');
    }
  };

  const handleDeleteTask = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTask(id);
        setTasks(tasks.filter(task => task._id !== id));
      } catch (err) {
        setError('Failed to delete task');
      }
    }
  };

  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.status === 'completed').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
    pending: tasks.filter(t => t.status === 'pending').length
  };

  if (loading) return <div className="loading">Loading tasks...</div>;

  return (
    <div className="dashboard">
      <div className="container">
        <div className="dashboard-header">
          <div>
            <h1>Welcome, {user?.name}!</h1>
            <p>Manage your tasks efficiently</p>
          </div>
          <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
            + New Task
          </button>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-value">{stats.total}</div>
            <div className="stat-label">Total Tasks</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{stats.completed}</div>
            <div className="stat-label">Completed</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{stats.inProgress}</div>
            <div className="stat-label">In Progress</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{stats.pending}</div>
            <div className="stat-label">Pending</div>
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}

        {showForm && (
          <div className="task-form">
            <h3>Create New Task</h3>
            <form onSubmit={handleCreateTask}>
              <input
                type="text"
                placeholder="Task Title"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                required
              />
              <textarea
                placeholder="Task Description"
                value={newTask.description}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                rows="3"
              />
              <select
                value={newTask.status}
                onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
              >
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
              <select
                value={newTask.priority}
                onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
              </select>
              <div className="form-actions">
                <button type="submit" className="btn-success">Create Task</button>
                <button type="button" className="btn-secondary" onClick={() => setShowForm(false)}>Cancel</button>
              </div>
            </form>
          </div>
        )}

        <div className="tasks-grid">
          {tasks.length === 0 ? (
            <div className="no-tasks">
              <p>No tasks yet. Create your first task!</p>
            </div>
          ) : (
            tasks.map(task => (
              <TaskCard
                key={task._id}
                task={task}
                onUpdate={handleUpdateTask}
                onDelete={handleDeleteTask}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;