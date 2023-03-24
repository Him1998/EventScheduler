const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Event = require("./schema");
const Port = 8080;
const url = "mongodb+srv://Social_app:socialtestapp@cluster0.ykau5il.mongodb.net/?retryWrites=true&w=majority";

async function conn () {
    await mongoose.connect(url);
    console.log("connected to mongoose");
}

conn();

const app = express();
app.use(bodyParser.json());

app.get("/" , (req,res) => {
    res.send("<h1> Welcome </h1>");
})

app.post("/v1/event" , async (req,res) => {
    try{
        const event = await Event.create(req.body);

        res.status(201).json({
            status : "Success",
            event
        })
    }catch(e){
        res.status(400).json({
            status : "Failed" ,
            message : e.message
        })
    }
});

app.get("/v1/event" , async (req,res) => {

    try{
        const events = await Event.find();

        res.status(200).json({
            status : "Success" ,
            events
        })
    }catch(e) {
        res.status(500).json({
            status : "Failed",
            message : e.message
        })
    }
});

app.get("/v1/event/:id" , async (req,res) => {

    try{
        const event = await Event.find({_id : req.params.id});

        res.status(200).json({
            status : "Success" ,
            event
        })
    }catch(e) {
        res.status(404).json({
            status : "Failed",
            message : "there is no event with that id"
        })
    }
});

app.put("/v1/event/:id" , async (req,res) => {

    try{
        await Event.updateOne({_id : req.params.id},req.body);
        const event = await Event.findOne({_id : req.params.id});

        res.status(200).json({
            status : "Success",
            event
        })
    }catch(e){
        res.status(400).json({
            status : "Failed" ,
            message : e.message
        })
    }
});

app.delete("/v1/event/:id" , async (req,res) => {

    try{
        const event = await Event.deleteOne({_id : req.params.id});
        res.status(204).json({
            status : "Success",
            event
        })
    }catch(e) {
        res.status(204).json({
            status : "Failed"
        })
    }
});

app.listen(Port , () => {
    console.log(`server is up at ${Port}`);
});