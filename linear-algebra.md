# Linear Algebra Basics for Machine Learning

## Tensors, Matrices, Vectors and Scalars

These are all objects from linear algebra. 

* A scalar has 0 dimensions - a single number
* A vector has 1 dimension - an array of numbers
* A matrix has 2 dimensions - a table of numbers
* A tensor has n dimensions (potentially billions)
* They are all considered tensors of order n where n is the number of dimensions.
* A 3d voxel volume could be described by a tensor of order 3.

## Matrix-Matrix Addition

A matrix can be added (elementwise) to another matrix of the same size to produce a result of the same size by matching up and summing the numbers at identical coordinates. Matrix addition is commutative (producing the same result when reversed) and associative (producing the same result when regrouped):

* `A + B = B + A`
* `A + (B + C) = (A + B) + C`

When matrices are not of equal size, the technique called _broadcasting_ defines the arithmetic.

## Matrix-Scalar Addition

A scalar is added to a matrix elementwise by adding the number to every element of the matrix:

* `B = x + A`

Like scalar-scalar addition, matrix-scalar addition is commutative and associative.

## Matrix Multiplication

There are several kinds of multiplication.

Transpose is defined as the operation of reflecting on the `row=column` diagonal axis such that every element `A[i, j] => A[j, i]`.

Dot product can be calculated when the number of rows of the first matrix equal the number of columns of the second matrix and vice versa. It is not commutative.

```
let C
C[i,j] = sum of k from 1 to n of (A[i, k] * B[k, j])
```
