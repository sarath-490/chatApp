// const express = require('express');
// const app = express();
// app.set("view engine", "ejs");

// // // Root route
// // app.get('/', (req, res) => { 
// //     res.render("home.ejs"); // Send a response with the root route
// // });

// // // About route
// // app.get('/about', (req, res) => {
// //     res.send('Hi I am about'); // Send a response with the about route
// // });

// // //connecting a database... to connect database with server we use a library called mongoose..


// const chats = require("./app.js");

// app.get("/", (req, res)=>{
//     res.send("Chats.");
// });

// app.get("/chats", async (req, res) => {
//     // Data is coming from database
//     let allchats = await chats.find();
//     res.render("chats.ejs", { allchats });
//     console.log(allchats);
//   });

// // Start the server
// app.listen(3030, () => {
//     console.log('Server is listening on port 3030'); // Log message when server starts
// });




// sir code

const express = require("express");
const app = express();
const chats = require("./app.js");
app.set("view engine", "ejs");

// Middleware to parse data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res)=> {
    // res.send("Welcome to chat app.");
    res.render("home.ejs");
});

// API for reading the data
app.get("/chats", async (req, res) => {
    // Data is coming from the database
    let allchats = await chats.find();
    res.render("chats.ejs", { allchats });
});

// Create API
app.get("/chats/new", (req, res) => {
    res.render("form.ejs");
});

// Post route
app.post("/chats", async (req, res) => {
    console.log(req.body);
    let { sender, msg, reciver } = req.body;
    let data = await chats.insertMany([
        { sender, msg, reciver },
    ]);
    res.send("chat created");
});

app.delete("/chats/:id", async (req, res) => {
    try {
        const chatId = req.params.id; // Get chat ID from URL
        await chats.findByIdAndDelete(chatId); // Delete the chat by its ID
        res.send(`Chat with ID ${chatId} has been deleted`);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error deleting chat");
    }
});

app.listen(3000, () => {
    console.log("server has been connected");
});



