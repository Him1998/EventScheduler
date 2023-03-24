const mongoose = require("mongoose");

const eventSchema = mongoose.Schema({
    title : {type : String , required : true},
    description : { type : String , required : true},
    location : { type : String , required : true},
    startTime : { type : Date , required : true},
    endTime : { type : Date , required : true}
});

const eventModel = mongoose.model("Event" , eventSchema);

module.exports = eventModel;