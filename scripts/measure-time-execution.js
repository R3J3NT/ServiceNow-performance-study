//Script which can be executed as a Background Script to measure time of execution of specified script

var ITERATIONS = 100; //Number of iterations that script should be executed for better avg time results

var executionTimePerIteration = []; // Array to keep execution time of every iteration
var timerStartTime, timerEndTime, elapsedTimeMs = null; // Initialize timer variables with null value

for (var i = 0; i < ITERATIONS; i++) {
    timerStartTime = new Date(); //Start time of Script execution

    //-------------------
    // Put your code here
    //-------------------

    timerEndTime = new Date(); //End time of Script execution
    elapsedTimeMs = timerEndTime - timerStartTime; //Calculate elapsed time by subtract starting value from final value
    executionTimePerIteration.push(elapsedTimeMs);
}

var totalElapsedTime = executionTimePerIteration.reduce(function(acc, val) {
    return acc + val;
}, 0);

var max = executionTimePerIteration.reduce(function(a, b) {
    return Math.max(a, b);
});

var min = executionTimePerIteration.reduce(function(a, b) {
    return Math.min(a, b);
});

//Log message with final execution time and statistics
gs.info('[Time Measure] - Array with all iteration times: ' + executionTimePerIteration.toString());
gs.info('[Time Measure] - Execution time of all iterations: ' + totalElapsedTime + 'ms.');
gs.info('[Time Measure] - Average execution time of one iteration: ' + totalElapsedTime / ITERATIONS + 'ms.');
gs.info('[Time Measure] - MAX execution time of iteration: ' + max + 'ms.');
gs.info('[Time Measure] - MIN execution time of iteration: ' + min + 'ms.');
