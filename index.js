const express = require('express')
const app = express()
const port = 3000
var five = require("johnny-five");

var board = new five.Board();

var stepper;
let ready = false;

const validSwipeDistance = 200
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
        stepper.rpm(validFowardSwipeSpeed).cw().step(validSwipeDistance, function() { 
	    setTimeout(() => {
                stepper.rpm(validReturnSwipeSpeed).ccw().step(validSwipeDistance, function() { 
		    console.log("Done stepping!"); 
	        }); 
             }, 500);
            res.send('Valid swipe initiated..')
        });
    } else {
        res.send('Board not ready!');
    }
});

//The following request will push the credit card through the reader performing a successful swipe
app.get('/fullswipe', (req, res) => {
    if (ready) {
        stepper.rpm(validFowardSwipeSpeed).cw().step(validSwipeDistance, function() { 
            res.send('Valid swipe initiated..')
        });
    } else {
        res.send('Board not ready!');
    }
});

//The following request will push the credit card through the reader performing a successful swipe
app.get('/testswipe', (req, res) => {
    if (ready) {
        stepper.step({ steps: 80, direction: 1, accel: 1000, decel: 100 }, function(){
        // stepper.rpm(validFowardSwipeSpeed).cw().step(validSwipeDistance, function() { 
	    setTimeout(() => {
            stepper.step({ steps: 80, direction: 0, accel: 500, decel: 100 }, function() { 
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
    if (ready) {
        stepper.rpm(invalidFowardSwipeSpeed).cw().step(invalidSwipeDistance, function() { 
	    setTimeout(() => {
                stepper.rpm(invalidReturnSwipeSpeed).ccw().step(invalidSwipeDistance, function() { 
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

//The following request will perform a scan ON THE SMALL BOT
app.get('/scansmallbot', (req, res) => {
    if (ready) {
        stepper.rpm(fowardScanSpeed_small).ccw().step(scanDistance_small, function() { 
	    setTimeout(() => {
                stepper.rpm(returnScanSpeed_small).cw().step(scanDistance_small, function() { 
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