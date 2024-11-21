import React, { useState } from "react";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { moveToInProgress, moveToDone, resetTasks, addTask } from "./store";

const App = () => {
  const tasks = useSelector((state) => state.kanban.tasks);
  const dispatch = useDispatch();
  const [newTask, setNewTask] = useState("");

  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      dispatch(addTask(newTask));
      setNewTask(""); // Clear input field after adding
    }
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Kanban Board for Tasks</h1>

      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter new task"
          style={{ padding: "5px", marginRight: "10px" }}
        />
        <button onClick={handleAddTask}>Add Task</button>
        <button onClick={() => dispatch(resetTasks())} style={{ marginLeft: "10px" }}>
          Reset All Tasks
        </button>
      </div>

      <div style={{ display: "flex", justifyContent: "space-around", marginTop: "20px" }}>
        <div>
          <h2>To Do : {tasks.todo.length}</h2>
          <ul>
            {tasks.todo.map((task, index) => (
              <li key={index}>
                {task}{" "}
                <button onClick={() => dispatch(moveToInProgress(task))}>
                  Move to In Progress
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2>In Progress : {tasks.inProgress.length}</h2>
          <ul>
            {tasks.inProgress.map((task, index) => (
              <li key={index}>
                {task}{" "}
                <button onClick={() => dispatch(moveToDone(task))}>
                  Move to Done
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2>Done : {tasks.done.length}</h2>
          <ul>
            {tasks.done.map((task, index) => (
              <li key={index}>{task}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default App;
