//Script which can be executed as a Background Script to measure time of execution of specified script

function scriptFirstFunction() {
    //-------------------
    // Put your code here
    //-------------------
}

var ITERATIONS = 100; //Number of iterations that script should be executed for better avg time results

var scriptExecution = Class.create(); //Class for every script execution
scriptExecution.prototype = {
    initialize: function() {
        this.executionTimePerIteration = []; // Array to keep execution time of every iteration
        this.timerStartTime, this.timerEndTime, this.elapsedTimeMs = null; // Initialize timer variables with null value
    },

    getExecutionTimePerIteration: function() {
        return this.executionTimePerIteration.toString();
    },

    getTotalElapsedTime: function() {
        return this.executionTimePerIteration.reduce(function(acc, val) {
            return acc + val;
        }, 0);
    },

    getAVG: function() {
        return this.getTotalElapsedTime() / ITERATIONS;
    },

    getMax: function() {
        return this.executionTimePerIteration.reduce(function(a, b) {
            return Math.max(a, b);
        });
    },

    getMin: function() {
        return this.executionTimePerIteration.reduce(function(a, b) {
            return Math.min(a, b);
        });
    },

    type: 'scriptExecution'
};

var scriptFirst = new scriptExecution();

for (var i = 0; i < ITERATIONS; i++) {
    scriptFirst.timerStartTime = new Date(); //Start time of Script execution

    scriptFirstFunction();

    scriptFirst.timerEndTime = new Date(); //End time of Script execution
    scriptFirst.elapsedTimeMs = scriptFirst.timerEndTime - scriptFirst.timerStartTime; //Calculate elapsed time by subtract starting value from final value
    scriptFirst.executionTimePerIteration.push(scriptFirst.elapsedTimeMs);
}


//Log message with final execution time and statistics
gs.info('[Time Measure] - Array with all iteration times: ' + scriptFirst.getExecutionTimePerIteration());
gs.info('[Time Measure] - Execution time of all iterations: ' + scriptFirst.getTotalElapsedTime() + 'ms.');
gs.info('[Time Measure] - Average execution time of one iteration: ' + scriptFirst.getAVG() + 'ms.');
gs.info('[Time Measure] - MAX execution time of iteration: ' + scriptFirst.getMax() + 'ms.');
gs.info('[Time Measure] - MIN execution time of iteration: ' + scriptFirst.getMin() + 'ms.');
