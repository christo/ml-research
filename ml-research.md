# Machine Learning Research

Basic notes about my current research in ML and relevant related results and technology.

* [Ideas](ideas.md)
* [Building a NN in Scratch](scratch-nn.md)
* [Linear Algebra Notes](linear-algebra.md)

## References

* https://www.quantstart.com/articles/matrix-algebra-linear-algebra-for-deep-learning-part-2/



## Implementing a Neural Network from Scratch

Notes from video [Building a neural network FROM SCRATCH](https://www.youtube.com/watch?v=w8yWXqWQYmU):

* A nonlinear activation function is applied for each layer so that weights and biases across successive layers do not simply result in a sequence of linear combinations because that could always be reduced to a single linear combination making hidden layers useless. 
* typical nonlinear activation functions are `tanh`, `sigmoid`, `ReLU` (Rectified Linear Unit `_/`)
* apply softmax to output 


## Convolutional Neural Networks (CNN)

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

## Recurrent Neural Networks (RNNs)

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

## Generative Adversarial Networks (GANs)

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

## Transformer Architecture

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

## Capsule Networks (CapsNets)

* CapsNets aim to overcome the limitations of CNNs in handling hierarchical spatial relationships by using capsules, which are groups of neurons representing properties of an entity, such as pose and deformation.
* Strengths: CapsNets show promise in tasks where understanding spatial relationships between parts of objects is crucial, such as object recognition in images with occlusions or transformations.
* Weaknesses: CapsNets are relatively new and less established compared to CNNs, with fewer pre-trained models and benchmark results available.


