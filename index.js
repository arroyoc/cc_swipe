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

const FullExtendDistance = 115
const FullExtendSpeed = 25

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
            res.send('Valid swipe initiated..')
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
            res.send('Invalid swipe initiated..')
        });
    } else {
        res.send('Board not ready!');
    }
});

//The following request will extend the arm
app.get('/extendarm', (req, res) => {
    if (ready) {
        stepper.rpm(FullExtendSpeed).ccw().step(FullExtendDistance, function() { 
	    /* setTimeout(() => {
                stepper.rpm(invalidReturnSwipeSpeed).cw().step(invalidSwipeDistance, function() { 
		    console.log("Done stepping!"); 
	        }); 
             }, 500); */
            res.send('Invalid swipe initiated..')
        });
    } else {
        res.send('Board not ready!');
    }
});

//The following request will retract the arm
app.get('/retractarm', (req, res) => {
    if (ready) {
        stepper.rpm(FullExtendSpeed).cw().step(FullExtendDistance, function() { 
	    /* setTimeout(() => {
                stepper.rpm(invalidReturnSwipeSpeed).cw().step(invalidSwipeDistance, function() { 
		    console.log("Done stepping!"); 
	        }); 
             }, 500); */
            res.send('Invalid swipe initiated..')
        });
    } else {
        res.send('Board not ready!');
    }
});

//Start of Small Bot

const validSwipeDistance_small = 1600
const validFowardSwipeSpeed_small = 250
const validReturnSwipeSpeed_small = 250

//The following request will push the credit card through the reader performing a successful swipe ON THE SMALL BOT
app.get('/validswipesmallbot', (req, res) => {
    if (ready) {
        stepper.rpm(validFowardSwipeSpeed_small).ccw().step(validSwipeDistance_small, function() { 
	    setTimeout(() => {
                stepper.rpm(validReturnSwipeSpeed_small).cw().step(validSwipeDistance_small, function() { 
		    console.log("Done stepping! on small bot.."); 
	        }); 
             }, 500);
            res.send('Valid swipe initiated on small bot..')
        });
    } else {
        res.send('Board not ready!');
    }
});



app.listen(port, () => console.log(`Example app listening on port ${port}!`))