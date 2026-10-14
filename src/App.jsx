import { useState, useEffect } from "react";
import "./App.css";

const STORAGE_KEY = "tasks";

const FILTERS = [
  { id: "all", label: "All" },
  { id: "pending", label: "Pending" },
  { id: "completed", label: "Completed" },
];

function loadTasks() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

function App() {
  const [tasks, setTasks] = useState(loadTasks);
  const [title, setTitle] = useState("");
  const [filter, setFilter] = useState("all");
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch {
      // storage unavailable: the app still works for this session
    }
  }, [tasks]);

  const addTask = (e) => {
    e.preventDefault(); // Enter key and the Add button both submit the form
    const clean = title.trim();
    if (!clean) {
      setError("Please enter a task.");
      return;
    }
    setTasks((prev) => [...prev, { id: Date.now(), title: clean, completed: false }]);
    setTitle("");
    setError("");
  };

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const clearCompleted = () => {
    setTasks((prev) => prev.filter((task) => !task.completed));
  };

  const total = tasks.length;
  const completedCount = tasks.filter((t) => t.completed).length;
  const pendingCount = total - completedCount;
  const progress = total === 0 ? 0 : Math.round((completedCount / total) * 100);

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  const emptyMessage =
    total === 0
      ? "No tasks yet. Add your first one above."
      : filter === "completed"
      ? "No completed tasks yet."
      : "All caught up. Nothing pending!";

  return (
    <main className="container">
      <h1>Task Management Dashboard</h1>

      <section className="stats" aria-label="Task summary">
        <div className="stat">
          <span className="stat-number">{total}</span>
          <span className="stat-label">Total</span>
        </div>
        <div className="stat">
          <span className="stat-number">{pendingCount}</span>
          <span className="stat-label">Pending</span>
        </div>
        <div className="stat">
          <span className="stat-number">{completedCount}</span>
          <span className="stat-label">Completed</span>
        </div>
      </section>

      <div
        className="progress"
        role="progressbar"
        aria-label="Completion progress"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={progress}
      >
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>
      <p className="progress-text">{progress}% complete</p>

      <form className="input-group" onSubmit={addTask}>
        <input
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (error) setError("");
          }}
          placeholder="Add a new task..."
          aria-label="New task"
          maxLength={120}
        />
        <button type="submit" className="btn-primary">Add</button>
      </form>
      {error && <p className="error" role="alert">{error}</p>}

      <div className="filters" role="group" aria-label="Filter tasks">
        {FILTERS.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            className={filter === id ? "filter active" : "filter"}
            aria-pressed={filter === id}
            onClick={() => setFilter(id)}
          >
            {label}
          </button>
        ))}
        <button
          type="button"
          className="clear"
          onClick={clearCompleted}
          disabled={completedCount === 0}
        >
          Clear completed
        </button>
      </div>

      {filteredTasks.length === 0 ? (
        <p className="empty">{emptyMessage}</p>
      ) : (
        <ul>
          {filteredTasks.map((task) => (
            <li key={task.id} className={task.completed ? "done" : ""}>
              <label className="task-label">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                />
                <span>{task.title}</span>
              </label>
              <button
                type="button"
                className="delete"
                onClick={() => deleteTask(task.id)}
                aria-label={`Delete task: ${task.title}`}
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

export default App;
