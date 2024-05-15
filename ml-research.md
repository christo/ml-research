# Machine Learning Research

Basic notes about my current research in ML and relevant related results and technology.



## The API Line

There's a meme going around to explain who wins and who loses in the AI revolution.

> Above vs below The API Line is the new white collar / blue collar class distinction. 

The _API Line_ demarcates two groups of people: those who tell the machines what to do and those who are told what to do by the machines. This seems to voice what many people have been thinking as they reel from the realisation that they may not be on top in the near future.

In this conception, the human machine interface is characterised as a single phase transition between "above" (high status) and "below" (low status), that appears to merely version bump the lingo of Marxist class distinctions. Are people's identities defined by singular membership in this binary pair? The typical example given is of a delivery driver who responds to directions provided by an app. These people are said to be below the API because they are "told what to do" by the machine whereas someone somewhere else is placing an order and this person is said to be above the API.

While the API Line idea doesn't preclude the possibility that being above or below the API may change over time or across circumstances, the aim of the meme appears to be familiar appeal, reusing traditional class strata and attempting to advise people to position themselves for upward mobility with STEM knowledge and market value for a future where their present knowledge work may be automated away by services too cheap to meter.

Clearly people benefit from an accurate anticipation of their future. 

A more useful model might be a "horizontal" network of API interfaces that people interact across, exchanging competitive value on a case by case basis. If a person drives a car, it might seem clear they are "above the API" of the car but they may request navigation through an API and the route could be chosen by an opaque algorithm that serves the needs of nearby fast food advertisers, toll road operators or particularly successful neighbourhood lobbyists who want less traffic. Each person may intrinsically value certain activities - for some it is driving a car - and each person has different needs, resources and different access to and skilled understanding of the APIs and different awareness of the people and organisations on the other side of the API.

Given all these differences, what's most important for any agent in this API network is their specific relative negotiating power and viable alternative options. When we "Add to Cart", we do not expect to be able to propose a chaper price, while we might be offered one by a retailer. Does this imply relative power? Consider how likely it is we will be offered a deal when shopping with a retailer operating in a highly competitive market whose customers expectably have dozens of tabs open to evaluate their many alternatives.

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


