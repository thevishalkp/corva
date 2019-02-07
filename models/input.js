const mongoose = require("mongoose");
const InputSchema = new mongoose.Schema({
    timestamp : { type : Date, default : Date.now()},
    data : [{
        title : String,
        values : [Number]
    }]
});

const InputModel = mongoose.model("Input", InputSchema);
module.exports = InputModel;       