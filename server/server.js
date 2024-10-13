const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors")



const app = express();


//middleware

app.use(express.json());
app.use(cors());

//mongo db connection 

mongoose.connect('mongodb+srv://singhpritesh7599:pritesh%40123@todo.i4jao.mongodb.net/')
.then(()=> console.log("connected successfully"))
.catch((error)=> console.log("error"));



//model
const Task = mongoose.model('Task', new mongoose.Schema({
    taskName : {type: String, required : true},
}));


//routes CRUD

//READ
app.get('/tasks', async (req,res)=> {
    const tasks = await Task.find();
    res.json(tasks);
});


//CREATE
app.post('/tasks', async (req,res)=> {
    const newTask = new Task({taskName: req.body.taskName});
    await newTask.save();
    res.json(newTask);
});


//UPDATE
app.put('/task/:id', async(req, res)=>{
    const task = await Task.findByIdAndUpdate(req.params.id);
    res.json(task);
});


//DELETE
app.delete('/tasks/:id', async(req, res)=> {
    const task = await Task.findByIdAndDelete(req.params.id);
    res.json(task);
});


//start server
const PORT = 5000;
app.listen(PORT, ()=> console.log(`server is running on ${PORT}`));