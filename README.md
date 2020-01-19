# So what is spyc ? 

<strong style="color:red"><em>`spyc`</em></strong>   is a `CLI` tool that monitors your `CPP` code and automatically compiles and executes your code whenever there is a change in the file.

<strong style="color:red"><em>`spyc`</em></strong> is designed mainly for competitive programmers so that they can efficiently debug and execute their code for a particular test case without compiling again and again.

<strong style="color:red"><em>`spyc`</em></strong> also supports some of the common GCC flags used in competitive programming.

# Installation



- ### Using [npm](https://www.npmjs.com/~lawliet07) 

##### `Install` globally 

```bash
npm install -g spyc
```



##### `Install` as a dev dependency

```bash
npm install --save-dev spyc
```



# Usage

To run <strong style="color:red"><em>`spyc`</em></strong> write.

```bash
spyc <yourfile.cpp> [,options]
```



- ### Help


For CLI options,  use `-h` or `--help`.

```bash
spyc -h
```



<img src="./assets/help.gif"/>





## Runtime input





## Cat file



## Check Stats



## Supports some common gcc flags



## My personal flag options



## Examples

- #### Demo to run simple cpp file.

**Run command.**

```bash
spyc ./sample.cpp
```



<img src="./assets/example.gif" />

​		

- #### Demo to run cpp file with input.

**Run command.**

```bash
spyc ./sample.cpp --input=<inputfile>
```

or

``` bash
spyc ./sample.cpp -i=<inputfile>
```



<img src="./assets/example-input.gif" />



- #### Demo to change the input file without restarting the app. 

In <strong style="color:red"><em>`spyc`</em></strong>, we can also change or provide input at runtime without restarting the tool. 

This will help competitive programmers to check their code on different test cases without wasting time on compiling and executing the code manually.

**Run command.**

```  bash
--input=./in
```

or

```bash
-i=./in
```



<img src="./assets/runtime-input.gif" />



* #### Demo to `cat` input or code at runtime.

<strong style="color:red"><em>`spyc`</em></strong> can also display input file or cpp code at runtime without pausing or stopping the tool.

This helps competitive programmers to see and debug their code or check the input file within the <strong style="color:red"><em>`spyc`</em></strong> tool.

``` bash
--cat=<filename>
```

<img src="./assets/cat.gif" />



* #### Demo to check the stats.

In <strong style="color:red"><em>`spyc`</em></strong>, we can also see stats from past executions. This will help competitive programmers to optimize their code by comparing the execution time of their code.

```bash
stats
```

<img src="./assets/stats.gif" />