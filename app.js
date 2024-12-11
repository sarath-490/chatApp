const mongoose = require('mongoose');

main().then(()=>{console.log("Mongodb connected succesfully.")}).
catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb+srv://sarath2005sai0505:VLuMFpz5vqm5aFbi@cluster0.tfgtp.mongodb.net/online_backend_chat?retryWrites=true&w=majority');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

//collections and documents.

// Defining the chat schema
let chatSchema = mongoose.Schema({
    sender: String,
    msg: String,
    
    reciver: String,
  });
  
  // Creating the chat model
  let chats = mongoose.model("Chat", chatSchema);
  
  // Exporting the model for external use
  module.exports = chats;
  
  // Further functionality can include:
  // - REST API for backend integration
  // - CRUD operations: Creating, Reading, Updating, Deleting chats


// insetion


//create documents

// chats.insertMany([
//     {
//         sender:"sarath",
//         msg:"hi virat, lets play.",
//         reciver:"Virat"
//     },

//     {
//         sender:"virat",
//         msg:"for sure sarath, lets play.",
//         reciver:"sarath"
//     },
//     {
//         sender:"Ramya vasudev",
//         msg:"hi sarath, lets play.",
//         reciver:"sarath"
//     }
// ]).then((data)=> {
//     console.log("Data has been stored successfully..");
//     console.log(data);
// });