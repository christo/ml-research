# Machine Learning Research

Basic notes from self-directed research in ML and relevant related results and technology.

Other documents in this repo:

* [Linear Algebra Notes](linear-algebra.md) summarising relevant high school maths.  
* [Building a NN in Scratch](scratch-nn.md) project idea to use MIT Scratch to build a neural network for classifying colours with a handful of names. This is a challenge because Scratch has very few mathematical primitives and significant performance contraints.
* Loosely structured [Ideas](ideas.md) in psychology, philosophy and politics.


## Implementing a Neural Network from Scratch

Notes from Samson Zhang's YouTube video [Building a neural network FROM SCRATCH](https://www.youtube.com/watch?v=w8yWXqWQYmU) 

* Traditional project to classify handwritten digits using [MNIST](https://en.wikipedia.org/wiki/MNIST_database) data
* Written in Python using [Numpy](https://numpy.org/doc/stable/user/absolute_beginners.html) for linear algebra operations rather than explicitly looping over arrays of numbers.
* [Python notebook](https://www.kaggle.com/code/wwsalmon/simple-mnist-nn-from-scratch-numpy-no-tf-keras) hosted on data science platform [Kaggle](https://www.kaggle.com/). 
* A nonlinear activation function is applied between each layer of neurons so that weights and biases across successive layers do not simply result in a sequence of linear combinations because that could always be reduced to a single linear combination making hidden layers useless. 
* Typical nonlinear activation functions used include `tanh`, `sigmoid` and `ReLU` (Rectified Linear Unit)
* Activation function for output layer should provide a probability distribution: e.g. `softmax` 
* Back propagation (learning step) uses derivatives of activation functions to calculate the gradient from one state of the NN (weights and biases) to a next state having higher accuracy. 


## Neural Network Architectures

### Convolutional Neural Networks (CNN)

* Typically used for image recognition tasks 
    * classification
    * object detection 
    * segmentation
* consist of:
    * convolutional layers that extract features from input images followed by 
    * pooling layers to reduce dimensionality 
    * fully-connected layers for classification

* strength: robust to spatial hierarchies and local patterns in data
* weakness: might struggle to capture long-range dependencies in data sequences, limiting their effectiveness for sequential reasoning


### Recurrent Neural Networks (RNNs)

* designed to handle sequential data, where each neuron maintains a state that depends on the previous inputs. 
* have feedback connections, allowing them to exhibit temporal dynamics.
* well-suited for tasks involving sequential data: 
    * time series prediction
    * language modeling
    * machine translation
    * can capture dependencies over time
* Traditional RNNs suffer from the vanishing gradient problem: 
    * gradients diminish exponentially over time
    * makes it challenging to capture long-term dependencies effectively


### Generative Adversarial Networks (GANs)

* GANs consist of two neural networks: a generator and a discriminator, trained adversarially. 
* The generator learns to produce realistic samples, while the discriminator learns to distinguish between real and fake samples.
* GANs are powerful for generating high-quality synthetic data across domains, such as images, text, and audio. 
* Uses: 
    * image generation
    * image-to-image translation
    * style transfer
* Weaknesses: 
    * GAN training can be unstable, requiring careful hyperparameter tuning and architectural choices. 
    * Mode collapse, where the generator produces limited varieties of samples, is a common challenge.

### Transformer Architecture

* Breakthrough method originally published in paper [Attention is All You Need](https://arxiv.org/abs/1706.03762)
* Transformers are based on self-attention mechanisms, allowing them to capture long-range dependencies in data without recurrence.
* They consist of encoder and decoder layers, commonly used in natural language processing tasks.
* Strengths: Transformers have achieved state-of-the-art results in various Natural Language Processing (NLP) tasks: 
    * machine translation
    * text summarization
    * question answering
    * They can capture contextual information effectively
* Weaknesses: 
    * Transformers require significant computational resources due to their self-attention mechanism 
    * less efficient for some real-time applications compared to RNNs or CNNs.

### Capsule Networks (CapsNets)

* CapsNets aim to overcome the limitations of CNNs in handling hierarchical spatial relationships by using capsules, which are groups of neurons representing properties of an entity, such as pose and deformation.
* Strengths: CapsNets show promise in tasks where understanding spatial relationships between parts of objects is crucial, such as object recognition in images with occlusions or transformations.
* Weaknesses: CapsNets are relatively new and less established compared to CNNs, with fewer pre-trained models and benchmark results available.


