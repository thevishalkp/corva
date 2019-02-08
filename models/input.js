const mongoose = require("mongoose");
const InputSchema = new mongoose.Schema({
    timestamp : Date,
    data : [{
        title : String,
        values : [Number]
    }]
});

const InputModel = mongoose.model("Input", InputSchema);
module.exports = InputModel;       
