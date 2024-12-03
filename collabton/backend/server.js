// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const Web3 = require('web3'); // For interacting with smart contracts
require('dotenv').config(); // For environment variables

// Initialize Express app
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Connect to the TON blockchain (example: using TON Web3 API or SDK)
const web3 = new Web3(new Web3.providers.HttpProvider(process.env.TON_RPC_URL));

// Load smart contract (using ABI and contract address)
const contractABI = require('./contractABI.json'); // ABI file
const contractAddress = process.env.CONTRACT_ADDRESS;
const contract = new web3.eth.Contract(contractABI, contractAddress);

// Routes

// Health check route
app.get('/', (req, res) => {
  res.send('CollabTON server is running.');
});

// Route to create a task
app.post('/create-task', async (req, res) => {
  const { taskId, reward } = req.body;

  try {
    const accounts = await web3.eth.getAccounts();
    const receipt = await contract.methods
      .createTask(taskId, web3.utils.toWei(reward.toString(), 'ether'))
      .send({ from: accounts[0], value: web3.utils.toWei(reward.toString(), 'ether') });

    res.status(200).send({ message: 'Task created successfully', receipt });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Route to assign a contributor
app.post('/assign-contributor', async (req, res) => {
  const { taskId, contributor } = req.body;

  try {
    const accounts = await web3.eth.getAccounts();
    const receipt = await contract.methods
      .assignContributor(taskId, contributor)
      .send({ from: accounts[0] });

    res.status(200).send({ message: 'Contributor assigned', receipt });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Route to complete a task
app.post('/complete-task', async (req, res) => {
  const { taskId } = req.body;

  try {
    const accounts = await web3.eth.getAccounts();
    const receipt = await contract.methods
      .completeTask(taskId)
      .send({ from: accounts[0] });

    res.status(200).send({ message: 'Task completed', receipt });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
