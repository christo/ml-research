# Scratch Neural Network

## TODO

* [ ] test implementation in typescript
  * [x] softmax
  * [x] dot product
  * [ ] colour input mechanism
  * [ ] neural network weights and biases
  * [ ] random initialisation
  * [ ] chart learning
* [ ] implement tanh for activation function 
* [ ] implement softmax ? for normalisation
* [ ] implement matrix dot product ? for ?

## What maths operations are required to build a neural network with back propagation? 

* activation functions: 
    * ReLU - Rectified Linear Unit
    * tanh - sigmoidal maps to -1->1
    * sigmoid - logistic function maps to 0-1
* forward propagation
    * activation function
* back propagation
    * derivatives of each layer step
* matrix dot product
  * lists, multiply, add
* softmax function
    * used as last activation function to normalise 
    * generalisation of logistic function to multiple dimensions
* hyperparameters
    * learning rate (alpha)


softmax

## tanh

```
tanh(x) = (e^(2 * x) - 1) / (e^(2 * x) + 1) 
    
```

## Working around scratch limitations

* lists can only be statically referenced 
  * for dynamic lists, pack lists together
* no return values
  * reserve variable for each function return value
  * controlled invocation concurrency

Scratch maths primitives:

* binary arithmetic operations
    * addition, multiplication, subtraction, division
    * modulus
* unary functions 
    * random(x,y) bounded range, integer or double
    * round(x) (half up)
    * abs(x)
    * floor(x)
    * ceiling(x)
    * sqrt(x)
    * sin(x)
    * cos(x)
    * tan(x)
    * asin(x)
    * acos(x)
    * atan(x)
    * ln(x)
    * log(x)
    * e ^ x
    * 10 ^ x
* relational operations
    * less than, greater than, equality
* logical operations
    * and, or, not

