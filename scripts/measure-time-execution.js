//Script which can be executed as a Background Script to measure time of execution of specified script

var timerStartTime = new Date().getTime(); //Start time of Script execution

// Put your code here

var timerEndTime = new Date().getTime(); //End time of Script execution
var elapsedTimeMs = timerEndTime - timerStartTime; //Calcuate elapsed time by subtract starting value from final value

gs.info('[Time Measure] - Time of script execution: ' + elapsedTimeMs + 'ms.'); //Log message with final execution time
