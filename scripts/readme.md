# Measure time executions script

Tool prepared for easy and quick measurements of ServiceNow scripts time execution. It allows to benchmark time execution and performance of multiply scripts in single execution. Solution can be used for study about script performance or to comparative analysis for different approaches of implementation.

### How to use

The easiest way to use this tool is to copy script code [measure-time-execution.js](scripts/measure-time-execution.js) from the repository and use it as a background script.

##### Go to the Scripts - Background

After copying script code, you need to go to application menu and [System Definition] -> [Scripts - Background]



##### Configure tool with your scripts

When you already paste tool code into the Script Background execution window, you can configure it for your needs. To add new script to be executed, you need to add new instance of scriptExecution class and add it to the scriptsArray table. 

```javascript
//================================================ SCRIPT #0
scriptsArray.push(new scriptExecution(function() {
    //=======================
    //Put your script #0 code 
    //=======================
}));
```

Example for two scripts instances is already placed inside the tool, so if you need to test two scripts you can just place code of your scripts in place marked as: Put your script #0 code.

```javascript
var ITERATIONS = 1000; //Number of iterations that script should be executed for better avg time results
```

After that, you can also manipulate with ITERATIONS variable, to set number of iterations which you would like to every script will be executed.

##### Execution and verifying results

After configuration, you can start benchmark using Run script button. When the tool will finish execution, logs with all information about tests will be displayed on the screen. In logs, you will find information about: Number of script, array with all times of executed iterations, average execution time of script, max and min execution time.

```
*** Script: [Time Measure] - SCRIPT#i Array with all iteration times: [...]
*** Script: [Time Measure] - SCRIPT#i Execution time of all iterations: Xms.
*** Script: [Time Measure] - SCRIPT#i Average execution time of one iteration: Yms.
*** Script: [Time Measure] - SCRIPT#i MAX execution time of iteration: Zms.
*** Script: [Time Measure] - SCRIPT#i MIN execution time of iteration: Kms.
```



### Example of use

In this example, I would like to verify three scripts with gs.sleep() function and different sleep time value. It will be executed in one test plan and with 1000 iterations for every script. Here you can find code of the scripts which I would like to compare:

Script #0

```javascript
gs.sleep(20);
```

Script #1

```javascript
gs.sleep(40);
```

Script #2

```javascript
gs.sleep(60);
```

Below you can see complete tool configuration which was used to perform that benchmark:

```javascript
//Script which can be executed as a Background Script to measure time of execution of specified script

var ITERATIONS = 1000; //Number of iterations that script should be executed for better avg time results

var scriptExecution = Class.create(); //Class for every script execution
scriptExecution.prototype = {
    initialize: function(scriptFunction) {
        this.executionTimePerIteration = []; // Array to keep execution time of every iteration
        this.timerStartTime, this.timerEndTime, this.elapsedTimeMs = null; // Initialize timer variables with null value
        this.executeFunction = scriptFunction;
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
  gs.sleep(20);
}));

//================================================ SCRIPT #1
scriptsArray.push(new scriptExecution(function() {
  gs.sleep(40);
}));

//================================================ SCRIPT #2
scriptsArray.push(new scriptExecution(function() {
  gs.sleep(60);
}));

//Calculation time execution of every script instance in scriptsArray
for (var i = 0; i < ITERATIONS; i++) {
    for (iter in scriptsArray) {

        scriptsArray[iter].timerStartTime = new Date(); //Start time of Script execution

        scriptsArray[iter].executeFunction();

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
```

After execution below, logs were generated:

```
*** Script: [Time Measure] - SCRIPT#0 Array with all iteration times: [Shortened]
*** Script: [Time Measure] - SCRIPT#0 Execution time of all iterations: 20166ms.
*** Script: [Time Measure] - SCRIPT#0 Average execution time of one iteration: 20.166ms.
*** Script: [Time Measure] - SCRIPT#0 MAX execution time of iteration: 26ms.
*** Script: [Time Measure] - SCRIPT#0 MIN execution time of iteration: 20ms.
*** Script: ----------------------------------------------------------------------------
*** Script: [Time Measure] - SCRIPT#1 Array with all iteration times: [Shortened]
*** Script: [Time Measure] - SCRIPT#1 Execution time of all iterations: 40217ms.
*** Script: [Time Measure] - SCRIPT#1 Average execution time of one iteration: 40.217ms.
*** Script: [Time Measure] - SCRIPT#1 MAX execution time of iteration: 67ms.
*** Script: [Time Measure] - SCRIPT#1 MIN execution time of iteration: 40ms.
*** Script: ----------------------------------------------------------------------------
*** Script: [Time Measure] - SCRIPT#2 Array with all iteration times: [Shortened]
*** Script: [Time Measure] - SCRIPT#2 Execution time of all iterations: 60200ms.
*** Script: [Time Measure] - SCRIPT#2 Average execution time of one iteration: 60.2ms.
*** Script: [Time Measure] - SCRIPT#2 MAX execution time of iteration: 92ms.
*** Script: [Time Measure] - SCRIPT#2 MIN execution time of iteration: 60ms.
*** Script: ----------------------------------------------------------------------------
```
