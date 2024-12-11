const express = require('express');
const path = require('path');
const serverless = require('serverless-http');
const mongoose = require('mongoose');

// Import your chat model from app.js
const chats = require('./app.js');

// Initialize express app
const app = express();

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Middleware to parse request data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Root route
app.get('/', (req, res) => {
    res.render('home.ejs');
});

// Route to fetch chats from MongoDB
app.get('/chats', async (req, res) => {
    let allChats = await chats.find();
    res.render('chats.ejs', { allChats });
});

// Create a new chat
app.get('/chats/new', (req, res) => {
    res.render('form.ejs');
});

// Post route to insert chat data
app.post('/chats', async (req, res) => {
    const { sender, msg, reciver } = req.body;
    await chats.insertMany([{ sender, msg, reciver }]);
    res.send('Chat created');
});

// Delete chat route
app.delete('/chats/:id', async (req, res) => {
    const chatId = req.params.id;
    await chats.findByIdAndDelete(chatId);
    res.send(`Chat with ID ${chatId} has been deleted`);
});

// Connect MongoDB
mongoose.connect('mongodb+srv://sarath2005sai0505:VLuMFpz5vqm5aFbi@cluster0.tfgtp.mongodb.net/online_backend_chat?retryWrites=true&w=majority')
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((err) => {
    console.log('Error connecting to MongoDB:', err);
  });

// Export the app as a serverless function
module.exports.handler = serverless(app);
