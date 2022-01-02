# Research #1 - tool examination

Before I will start using developed tool for researches on real studies, I would like to verify if tool is working correctly, how to configure it for the best results and verify whether the results are reproducible. The current system load can have a huge impact on time measuring, especially on scripts which executes very quickly, so I would like to establish minimum iteration number for valid average results. Furthermore, I would like also to verify influence of database operation in measuring time execution. All that studies will help with real researches in the future.

### Instance version and parameters

All tests were performed on my PDI with the following parameters:

```
Build name: Rome

Build tag: glide-rome-06-23-2021__patch1-hotfix1-09-15-2021

Linux version 3.10.0-1160.36.2.el7.x86_64

Processor model: AMD EPYC 7551P 32-Core Processor

Processors: 64

```

### Initial validation of correctness of time measurements without database operations

Firstly, I would like to check if tool is returning correct values of time and how much load influence on multi execution. To verify that I write very simple code, using **gs.sleep()** function:

```javascript
gs.sleep(1000);
```

Single execution of that script should take 1000 milliseconds. I pushed one instance of scriptExecution class with prepared code and set iterations to 500, below you can find out examples of execution:

```
*** Script: [Time Measure] - SCRIPT#0 Execution time of all iterations: 500173ms.
*** Script: [Time Measure] - SCRIPT#0 Average execution time of one iteration: 1000.346ms.
*** Script: [Time Measure] - SCRIPT#0 MAX execution time of iteration: 1023ms.
*** Script: [Time Measure] - SCRIPT#0 MIN execution time of iteration: 1000ms.
```

As we can see, the difference between minimum and maximum execution time is 23 milliseconds - it corresponds to influence of current system load into time of script execution. However, average execution time differ from target time only 0,346 ms, at 500 iterations, which is a very close result to target time. 

### Impact of the number of iterations on the correctness of the average execution time with database operation

Another part is to identify minimum number of iterations for acceptable error, this research will be with call to database, because this can influence significantly on differences in iterations execution time. I decided to take the approach that multiply scripts will be executed in one benchmark plan, and we will be focused on the maximum differ between quickest and longest execution time, when changing number of iterations.

The prepared script is querying the task table and then executing a sleep function for every record in the query (this is simulating some operation on every record but with known time). In my example, task table have 665 records, so it means only sleep function should consume 665 * 1ms = 665ms, every additional time indicates influence of database operations and GlideRecord API processing. 

```javascript
var target = new GlideRecord('task');
target.query();
while (target.next()) {
    gs.sleep(1);
}
```

The approach is to execute multiply instances of scriptExecution class in one benchmark plan with the same script and treat error as a difference between longest and quickest average execution time between classes. After every plan, number of iteration will be increased, until satisfying results will be achieved.

| Iterations | Instance1 | Instance2 | Instance3 | Instance4 | Instance5 | Max difference |
| ---------- | --------- | --------- | --------- | --------- | --------- | -------------- |
| 1          | 868,00    | 879,00    | 795,00    | 902,00    | 889,00    | 107,00         |
| 5          | 957,80    | 894,60    | 947,40    | 955,40    | 981,60    | 87,00          |
| 10         | 867,80    | 854,60    | 836,60    | 869,90    | 860,50    | 33,30          |
| 100        | 877,00    | 875,80    | 866,31    | 870,45    | 863,86    | 13,14          |

As we can see, the max difference between quickest and longest time execution is strictly connected with number of iterations. Increasing number of iterations, reduces the difference of execution time between different instances. Depends on how big error is acceptable for us, we need to carefully choose the amount of iterations, but the most important thing is that increasing the iteration number allows us to reduce differences caused by different system load.

## Conclusion

Verification shows, that script is showing correct values of script time executions and can be used in further researches. Multiply instances of scriptExecution class tends to the same values, even that the load is different at a given moment in time, so the tool can be used for comparative analysis. Additionally, research shows that executing script multiply iterations and calculating average execution time is crucial for correct results and conclusions in future studies. Minimal iterations for correct results will be dependent on specific problem and behavior of environment, but my PDI example shows that it should be at least few hundred of iterations.
