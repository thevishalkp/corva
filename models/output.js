const mongoose = require("mongoose");

const OutputSchema = new mongoose.Schema({
    timestamp : Date,
    requestID : String,
    result :[{
        title : {type: String, default:"Result"},
        values : [Number]
    }]
});

const OutputModel = mongoose.model("Output", OutputSchema);
module.exports = OutputModel;
