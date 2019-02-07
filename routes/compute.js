var express = require('express');
var router = express.Router();

const InputModel = require("../models/input");
const OutputModel = require("../models/output")
router.post('/add', function (req, res, next) {

    var time = Date.now();
    var slug = (Math.floor(time / 1000).toString());

    console.log(time);
    console.log(slug);
    var input1 = req.body.firstInput.split(",").filter(Boolean);
    var input2 = req.body.secondInput.split(",").filter(Boolean);
    if (input1.length != input2.length) {
        console.log(" Data of Unequal Lengths");
        res.redirect('/');
    }
    else {
        for (a in input1) {
            input1[a] = parseInt(input1[a], 10);
            input2[a] = parseInt(input2[a], 10);
        }
        const inputModelInstance = new InputModel({
            timestamp: time,
            data: [
                { title: "input1", values: input1 },
                { title: "input2", values: input2 }
            ]
        });

        inputModelInstance.save(function (err) {
            console.log("input saved");
        });

        input2.forEach(function (item, index) {
            input1[index] = item - input1[index];
        });
        const outputModelInstance = new OutputModel({
            timestamp: time,
            requestID: slug,
            result: [{
                title: "result",
                values: input1
            }]
        });

        outputModelInstance.save(function (err) {
            console.log("output saved");
            res.redirect(`/compute/${slug}`);
        });
    }
});

router.get('/:slug', function (req, res, next) {
    OutputModel.find({ requestID: req.params.slug }, function (err, rows) {
        res.render("result", { ...rows[0]._doc })
    })
});


module.exports = router;