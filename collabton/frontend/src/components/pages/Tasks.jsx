import React, { useState } from "react";
import TaskForm from "../components/TaskForm";

const Tasks = () => {
    const [tasks, setTasks] = useState([]);

    const addTask = (task) => {
        setTasks([...tasks, task]);
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>Tasks</h1>
            <TaskForm addTask={addTask} />
            <ul>
                {tasks.map((task, index) => (
                    <li key={index}>{task}</li>
                ))}
            </ul>
        </div>
    );
};

export default Tasks;
