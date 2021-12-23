//Script which can be executed as a Background Script to measure time of execution of specified script

var ITERATIONS = 100; //Number of iterations that script should be executed for better avg time results

var scriptExecution = Class.create(); //Class for every script execution
scriptExecution.prototype = {
    initialize: function(scriptFunction) {
        this.executionTimePerIteration = []; // Array to keep execution time of every iteration
        this.timerStartTime, this.timerEndTime, this.elapsedTimeMs = null; // Initialize timer variables with null value
        this.executFunction = scriptFunction;
    },

    //Return array of execution time per iteration
    getExecutionTimePerIteration: function() {
        return this.executionTimePerIteration.toString();
    },

    //Return total execution time of all iterations
    getTotalElapsedTime: function() {
        return this.executionTimePerIteration.reduce(function(acc, val) {
            return acc + val;
        }, 0);
    },

    //Return average execution time per iteration
    getAVG: function() {
        return this.getTotalElapsedTime() / ITERATIONS;
    },

    //Return max execution time
    getMax: function() {
        return this.executionTimePerIteration.reduce(function(a, b) {
            return Math.max(a, b);
        });
    },

    //Return min execution time
    getMin: function() {
        return this.executionTimePerIteration.reduce(function(a, b) {
            return Math.min(a, b);
        });
    },

    type: 'scriptExecution'
};

var scriptsArray = []; //Array for every script instance to perform time measurements

//================================================ SCRIPT #0
scriptsArray.push(new scriptExecution(function() {
    //=======================
    //Put your script #0 code 
    //=======================
}));

//================================================ SCRIPT #1
scriptsArray.push(new scriptExecution(function() {
    //=======================
    //Put your script #1 code 
    //=======================
}));

//Calculation time execution of every script instance in scriptsArray
for (var i = 0; i < ITERATIONS; i++) {
    for (iter in scriptsArray) {

        scriptsArray[iter].timerStartTime = new Date(); //Start time of Script execution

        scriptsArray[iter].executFunction();

        scriptsArray[iter].timerEndTime = new Date(); //End time of Script execution
        scriptsArray[iter].elapsedTimeMs = scriptsArray[iter].timerEndTime - scriptsArray[iter].timerStartTime; //Calculate elapsed time by subtract starting value from final value
        scriptsArray[iter].executionTimePerIteration.push(scriptsArray[iter].elapsedTimeMs);

    }
}

for (iter in scriptsArray) {
    //Log message with final execution time and statistics
    gs.info('[Time Measure] - SCRIPT#' + iter + ' Array with all iteration times: ' + scriptsArray[iter].getExecutionTimePerIteration());
    gs.info('[Time Measure] - SCRIPT#' + iter + ' Execution time of all iterations: ' + scriptsArray[iter].getTotalElapsedTime() + 'ms.');
    gs.info('[Time Measure] - SCRIPT#' + iter + ' Average execution time of one iteration: ' + scriptsArray[iter].getAVG() + 'ms.');
    gs.info('[Time Measure] - SCRIPT#' + iter + ' MAX execution time of iteration: ' + scriptsArray[iter].getMax() + 'ms.');
    gs.info('[Time Measure] - SCRIPT#' + iter + ' MIN execution time of iteration: ' + scriptsArray[iter].getMin() + 'ms.');
    gs.info('--------------------------------------------------------------------------------------------------------------');
}
