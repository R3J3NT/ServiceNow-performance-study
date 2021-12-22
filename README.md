# ServiceNow Performance Study

On this repository, you can find effects of my study about ServiceNow scripts performance. Time complexity is a very important aspect of any script, which is executing on ServiceNow instance. Especially scripts which are executed often like for example Business Rules or Scheduled jobs executed on large queries can influence on instance health, customer experience and end time of the task execution.

##### Tool for measuring time of script execution

The first part of that project is about preparation a tool which allows to easily perform time execution measurements and compare time complexity between two scripts with different approach of implementation.

##### Researches about scripts performance

Second part is to use the tool prepared in part one, to study different tips and traps about writing scripts in ServiceNow instances. Research will contain findings about various ways of implementation, usage of JavaScript Methods and ServiceNow API.

## Table of contents

[Tool](scrits/measure-time-execution.js) - Script which can be used on ServiceNow instance to execute scripts performance tests.

[Researches](/researches) - Researches about scripts performance
