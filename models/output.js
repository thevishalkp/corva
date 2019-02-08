const mongoose = require("mongoose");

const OutputSchema = new mongoose.Schema({
    timestamp : Number,
    requestID : Number,
    result :[{
        title : {type: String, default:"Result"},
        values : [Number]
    }]
});

const OutputModel = mongoose.model("Output", OutputSchema);
module.exports = OutputModel;
