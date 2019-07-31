const express = require('express')
const app = express()
const port = 3000
var five = require("johnny-five");

// TODO: Verify these boards are assigned to the right port (wasnt sure which was which)
var creditCardBoard = new five.Board({port: '/dev/ttyACM0'})
var barCodeBoard = new five.Board({port: '/dev/ttyACM1'})

var ccStepper;
let ccBoardReady = false;

const validSwipeDistance = 115
const validFowardSwipeSpeed = 50
const validReturnSwipeSpeed = 25

const invalidSwipeDistance = 50
const invalidFowardSwipeSpeed = 50
const invalidReturnSwipeSpeed = 25

creditCardBoard.on("ready", function() {
    var k = 0; 
    ccStepper = new five.Stepper({ 
        type: five.Stepper.TYPE.DRIVER, 
	stepsPerRev: 200, 
	pins: [5, 2] 
    });
    ccBoardReady = true;
});

        
//The following request will push the credit card through the reader performing a successful swipe
app.get('/validswipe', (req, res) => {
    if (ccBoardReady) {
        ccStepper.rpm(validFowardSwipeSpeed).ccw().step(validSwipeDistance, function() { 
	    setTimeout(() => {
                ccStepper.rpm(validReturnSwipeSpeed).cw().step(validSwipeDistance, function() { 
		    console.log("Done stepping!"); 
	        }); 
             }, 500);
            res.send('Valid swipe initiated..')
        });
    } else {
        res.send('Board not ready!');
    }
});

//The following request will only push the credit card half way through the reader performing an invalid swipe
app.get('/invalidswipe', (req, res) => {
    if (ccBoardReady) {
        ccStepper.rpm(invalidFowardSwipeSpeed).ccw().step(invalidSwipeDistance, function() { 
	    setTimeout(() => {
                ccStepper.rpm(invalidReturnSwipeSpeed).cw().step(invalidSwipeDistance, function() { 
		    console.log("Done stepping!"); 
	        }); 
             }, 500);
            res.send('Invalid swipe initiated..')
        });
    } else {
        res.send('Board not ready!');
    }
});


//Start of Small Bot

const scanDistance_small = 550
const fowardScanSpeed_small = 150
const returnScanSpeed_small = 150

var bcStepper;
let bcBoardReady = false;

barCodeBoard.on("ready", function() {
    var k = 0; 
    bcStepper = new five.Stepper({ 
        type: five.Stepper.TYPE.DRIVER, 
	    stepsPerRev: 200,  // TODO: Set these values to whatever you need.
	    pins: [5, 2] 
    });
    bcBoardReady = true;
});

//The following request will perform a scan ON THE SMALL BOT
app.get('/scansmallbot', (req, res) => {
    if (bcBoardReady) {
        bcStepper.rpm(fowardScanSpeed_small).ccw().step(scanDistance_small, function() { 
	    setTimeout(() => {
            bcStepper.rpm(returnScanSpeed_small).cw().step(scanDistance_small, function() { 
		    console.log("Done stepping! on small bot.."); 
	        }); 
             }, 500);
            res.send('Scan initiated on small bot..')
        });
    } else {
        res.send('Board not ready!');
    }
});



app.listen(port, () => console.log(`Automation app listening on port ${port}!`))