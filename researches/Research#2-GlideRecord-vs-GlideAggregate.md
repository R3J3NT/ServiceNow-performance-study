# Research #2 - GlideRecord vs GlideAggregate

***Research in progress***

For the first topic which I decided to study, I chose performance differences between using GlideRecord and GlideAggregate API. Recently I read [UNDERSTANDING GLIDEAGGREGATE](https://developer.servicenow.com/blog.do?p=/post/glideaggregate/), article on ServiceNow Developer Blog by [ANDREW BARNES](https://developer.servicenow.com/blog.do?p=/authors/andrew-barnes/), which pays attention to the possibility of optimizing in some cases execution times using GlideAggregate API. I decided that I will start with that topic and check if I will be able to reach similar conclusions, to confirm even more that my time measuring [Tool](../scripts/measure-time-execution.js) is working properly.

### Instance version and parameters

All tests were performed on my PDI with the following parameters:

```
Build name: Rome

Build tag: glide-rome-06-23-2021__patch5-12-15-2021

Linux version 3.10.0-1160.36.2.el7.x86_64

Processor model: AMD EPYC 7551P 32-Core Processor

Processors: 64

```

### Comparsison between GlideRecord getRowCount() and GlideAggregate getAggregate('COUNT')

Firstly, I would like to compare two different functions which allows us to get the number of records from a certain query. From GlideRecord API we can use getRowCount() function, which return number of records in query. In GlideAggregate API, we can use getAggregate('COUNT'), which should return the same value of records in query.

In this case, I prepared two scripts, one using GlideRecord getRowCount() and second one using GlideAggregate getAggregate('COUNT'). Before I started time benchmark, I run both scripts with logging to verify if they will return the same values:

```javascript
var GRTask = new GlideRecord('task');
GRTask.query();
gs.info('Number of records in query GR: '+GRTask.getRowCount());
```

```
*** Script: Number of records in query GR: 584
```

```javascript
var GATask = new GlideAggregate('task');
GATask.addAggregate('COUNT');
GATask.query();
GATask.next();
gs.info('Number of records in query GA: ' + GATask.getAggregate('COUNT'));
```

```
*** Script: Number of records in query GA: 584
```

Both scripts return correct values (On my PDI was 584 records in task table), so I moved scripts to benchmark surrounded by a loop, because single execution was too quick to correctly handle differences. I have created two instances of scriptExecution class and set number of iterations to 1000:

```javascript
//================================================ SCRIPT #0
scriptsArray.push(new scriptExecution(function() {
    for (var i = 0; i < 200; i++) {
        var GRTask = new GlideRecord('task');
        GRTask.query();
        GRTask.getRowCount();
    }

}));

//================================================ SCRIPT #1
scriptsArray.push(new scriptExecution(function() {
    for (var j = 0; j < 200; j++) {
        var GATask = new GlideAggregate('task');
        GATask.addAggregate('COUNT');
        GATask.query();
        GATask.next();
        GATask.getAggregate('COUNT');
    }
}));
```

```
*** Script: [Time Measure] - SCRIPT#0 Execution time of all iterations: 331978ms.
*** Script: [Time Measure] - SCRIPT#0 Average execution time of one iteration: 331.978ms.
*** Script: [Time Measure] - SCRIPT#0 MAX execution time of iteration: 1382ms.
*** Script: [Time Measure] - SCRIPT#0 MIN execution time of iteration: 222ms.
*** Script: ---------------------------------------------------------------------------
*** Script: [Time Measure] - SCRIPT#1 Execution time of all iterations: 255203ms.
*** Script: [Time Measure] - SCRIPT#1 Average execution time of one iteration: 255.203ms.
*** Script: [Time Measure] - SCRIPT#1 MAX execution time of iteration: 1018ms.
*** Script: [Time Measure] - SCRIPT#1 MIN execution time of iteration: 143ms.
*** Script: ---------------------------------------------------------------------------
```

As a result, we can see that GlideAggregate is a little faster (around 20% quicker) in comparison to GlideRecord.
