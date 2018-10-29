const express = require('express')
const app = express()
const port = 3000
var five = require("johnny-five");

var board = new five.Board();

var stepper;
let ready = false;

const validSwipeDistance = 115
const validFowardSwipeSpeed = 50
const validReturnSwipeSpeed = 25

const invalidSwipeDistance = 50
const invalidFowardSwipeSpeed = 50
const invalidReturnSwipeSpeed = 25

board.on("ready", function() {
    var k = 0; 
    stepper = new five.Stepper({ 
        type: five.Stepper.TYPE.DRIVER, 
	stepsPerRev: 200, 
	pins: [5, 2] 
    });
    ready = true;
});

        
//The following request will push the credit card through the reader performing a successful swipe
app.get('/validswipe', (req, res) => {
    if (ready) {
        stepper.rpm(validFowardSwipeSpeed).ccw().step(validSwipeDistance, function() { 
	    setTimeout(() => {
                stepper.rpm(validReturnSwipeSpeed).cw().step(validSwipeDistance, function() { 
		    console.log("Done stepping!"); 
	        }); 
             }, 500);
            res.send('Hello World!')
        });
    } else {
        res.send('Board not ready!');
    }
});

//The following request will only push the credit card half way through the reader performing an invalid swipe
app.get('/invalidswipe', (req, res) => {
    if (ready) {
        stepper.rpm(invalidFowardSwipeSpeed).ccw().step(invalidSwipeDistance, function() { 
	    setTimeout(() => {
                stepper.rpm(invalidReturnSwipeSpeed).cw().step(invalidSwipeDistance, function() { 
		    console.log("Done stepping!"); 
	        }); 
             }, 500);
            res.send('Hello World!')
        });
    } else {
        res.send('Board not ready!');
    }
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`))