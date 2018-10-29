const express = require('express')
const app = express()
const port = 3000
var five = require("johnny-five");

var board = new five.Board();

var stepper;
let ready = false;

const swipeDistance = 115
const fowardSwipeSpeed = 50
const returnSwipeSpeed = 25

board.on("ready", function() {
    var k = 0; 
    stepper = new five.Stepper({ 
        type: five.Stepper.TYPE.DRIVER, 
	stepsPerRev: 200, 
	pins: [5, 2] 
    });
    ready = true;
});

        

//app.get('/validswipe', (req, res) => {
    if (ready) {
        stepper.rpm(fowardSwipeSpeed).ccw().step(swipeDistance, function() { 
	    setTimeout(() => {
                stepper.rpm(returnSwipeSpeed).cw().step(swipeDistance, function() { 
		    console.log("Done stepping!"); 
	        }); 
             }, 500);
            //res.send('Hello World!')
        });
    } else {
        //res.send('Board not ready!');
    }
//});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))