const express = require('express');
const path = require('path');
const serverless = require('serverless-http');
const mongoose = require('mongoose');

// Import your chat model from app.js
const chats = require('./app.js');

const app = express();
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB connection
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1); // Exit process if MongoDB connection fails
  }
}

connectDB(); // Call the function to connect to MongoDB

// Routes
app.get('/', (req, res) => {
    res.render('home.ejs');
});

app.get('/chats', async (req, res) => {
    let allChats = await chats.find();
    res.render('chats.ejs', { allChats });
});

app.get('/chats/new', (req, res) => {
    res.render('form.ejs');
});

app.post('/chats', async (req, res) => {
    const { sender, msg, reciver } = req.body;
    await chats.insertMany([{ sender, msg, reciver }]);
    res.send('Chat created');
});

app.delete('/chats/:id', async (req, res) => {
    const chatId = req.params.id;
    await chats.findByIdAndDelete(chatId);
    res.send(`Chat with ID ${chatId} has been deleted`);
});

// Export as serverless function
module.exports.handler = serverless(app);
