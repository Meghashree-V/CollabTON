import React, { useEffect, useState } from "react";
import Web3 from "web3";
import { TASK_MANAGER_ADDRESS, TASK_MANAGER_ABI } from "../utils/blockchain";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const web3 = new Web3(window.ethereum);
      const contract = new web3.eth.Contract(TASK_MANAGER_ABI, TASK_MANAGER_ADDRESS);
      const taskCount = await contract.methods.getTaskCount().call();
      let fetchedTasks = [];
      for (let i = 0; i < taskCount; i++) {
        const task = await contract.methods.tasks(i).call();
        fetchedTasks.push(task);
      }
      setTasks(fetchedTasks);
    };
    fetchTasks();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>{task.description}</li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
