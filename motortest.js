var five = require("johnny-five");
var board = new five.Board({ 
	//port: "COM1"
});

board.on("ready", function() { 
	var k = 0; 
	var stepper = new five.Stepper({ 
		type: five.Stepper.TYPE.DRIVER, 
		stepsPerRev: 200, 
		pins: [5, 2] 

	});

stepper.rpm(50).ccw().step(105, function() { 
	stepper.rpm(25).cw().step(105, function() { 
		console.log("first"); 
	}); 
	console.log("Done stepping!"); 
});

});