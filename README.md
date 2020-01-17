# So what is spyc ? 

<strong style="color:red"><em>`spyc`</em></strong>  is a `cli` tool used to monitor `cpp` code for changes. It automatically compiles and executes your code whenever there is a change in the file.

<strong style="color:red"><em>`spyc`</em></strong> is designed mainly for competitive programmers so that they can efficiently debug and execute their code for a particular test case without compiling again and again.

<strong style="color:red"><em>`spyc`</em></strong> also supports some of the common GCC flags used in competitive programming.

# Installation

- ### Using [npm](http://npmjs.org) 

##### `install` globally 

```bash
npm install -g spyc
```



##### `install` as a dev dependency

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



## Examples

- #### Demo to run simple cpp file.

​	Example <strong style="color:red"><em>`spyc`</em></strong> tool for monitoring sample.cpp file.

Run command.

```bash
spyc ./sample.cpp
```



<img src="./assets/example.gif" style="zoom:155%;" />

​		

- #### Demo to run cpp file with input.

​	Example of  <strong style="color:red"><em>`spyc`</em></strong> tool monitoring sample.cpp file with input.

Run command.

```bash
spyc ./sample.cpp --input=./in
```



![](./assets/example-input.gif)