import { useState, useEffect } from "react";

export default function TasksForm() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  async function getTasks() {
    try {
      const response = await fetch('/api/tasks', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      const tasks = await response.json();
      setTasks(tasks);
    } 
    catch (error) {
      console.error('Error al obtener las tareas:', error);
    }
  }

  useEffect(() => {
    getTasks();
  }, []);

  async function addTask(e) {
    e.preventDefault();
    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({title})
      });
      getTasks()
    } 
    catch (error) {
      console.error('Error al agregar una tarea:', error);
    }
  }

  async function updateTask(id) {
    try {
      const response = await fetch('/api/tasks', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({id})
      });
      getTasks()
    } 
    catch (error) {
      console.error('Error al actualizar una tarea:', error);
    }
  }

  async function deleteTask(id) {
    try {
      const response = await fetch('/api/tasks', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({id})
      });
      getTasks()
    } 
    catch (error) {
      console.error('Error al actualizar una tarea:', error);
    }
  }

  return (
    <div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>{task.completed ? <s>{task.title}</s> : task.title}
            <button onClick={() => updateTask(task.id)}>Marcar como completada</button><br/>
            <button onClick={() => deleteTask(task.id)}>Delete tarea</button>
          </li>
        ))}
      </ul>
      <form onSubmit={addTask}>
        <input 
          type="text" 
          placeholder="Titulo de la tarea"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required 
        />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}
