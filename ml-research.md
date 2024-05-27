# Machine Learning Research

Basic notes from self-directed research in ML and relevant related results and technology.

Other documents in this repo:

* [Linear Algebra Notes](linear-algebra.md) summarising implementation-relevant high school maths.  
* [Building a NN in Scratch](scratch-nn.md) project idea to use MIT Scratch to
  build a neural network for classifying colours with a handful of names. This
  is a challenge because Scratch has very few mathematical primitives and
  significant performance contraints.
* Loosely structured ML-influenced [Ideas](ideas.md) in psychology, philosophy and politics.

## Frameworks / Libraries

* Python is hyperdominant
* CUDA only works on Nvidia hardware
* JAX (new hotness)
* Pytorch
* Tensorflow

## A Hacker's Guide to Language Models

Notes from [Jeremy Howard](https://en.wikipedia.org/wiki/Jeremy_Howard_(entrepreneur)) (of [kaggle](https://www.kaggle.com/), [fast.ai](https://fast.ai/))  excellent video [A Hacker's Guide to Language Models](https://www.youtube.com/watch?v=jkrNMKz9pWU)

* Code Notebook used in this video: [fastai/lm-hackers](https://github.com/fastai/lm-hackers)
* Chat GPT capabilities can be dramatically improved by emphasising in the
  system prompt that preliminary thinking and a step-by-step process should be
  undertaken. The progressive thinking phase builds a context before the meat
  of the answer which functions as scaffolding for more careful logical
  thinking.
* Extremely frequent orthodox problem features may overwhelm a subtly different
  question. e.g. the river crossing goat/cabbage/wolf problem. Changing the
  problem so that both the wolf and the goat would eat the cabbage is ignored
  and GPT repetedly returns the traditional answer.
* Integration with code execution can be done with API 
    * LLM will choose to use code execution only if it decides it is required. 
    * E.g. when asked to OCR an image, GPT implemented a script to use
      Tesseract to do the OCR 
* Google Bard seems to handle for example, OCR API usage internally and
  transparently
    * also offered a comment on the text that was OCR'd
    * also identified the source of the text!
* Buying "Prosumer" Hardware for ML
    * Nvidia 4090s are best but only marginally better than 3090s because
      memory bandwidth is the bottleneck
    * Multiple cards can be put into single machine
    * decent performance is 4 or 5 figures USD
    * High end Macs are slower but scrape by
* GPU services
    * often budget/free commercial GPU services are oversubscribed
    * there are machine sharing services like 
* On HuggingFace 
    * python api 
        * `transformers` for using models
        * `datasets` for using datasets
    * look for the GPTQ discretised variants of models - they work much faster
      on low end hardware
    * You can get models that have not been fine-tuned, but to fine-tune one
      you need to provide prompts and correct responsees in the model-specific
      prompt format, usually explained on the hugging face page for the model. 
* Retrieval Augmented Generation (RAG) (one example)
    * Use a model to decide which document or web page is most useful for answering a question, say a wikipedia page.
    * Fetch wikipedia article on the subject (excluding stuff like references section)
    * Prompt prefixed by `Answer the question with the help of the provided context`, the markdown heading "Context" followed by the wikipedia content
    * "SentenceTransformer" 
        * takes a document and produces a number of activations via `encode`
        * documents that are similar will have similar activations
        * The original prompt should have highest _cosine_similarity_ to the best document to use
        * with a small enough list of candidate documents, you can compare the results of each `encode` call
        * with larger numbers of candidate documents, make or use a vector database.
            * e.g. [h2oGPT](https://github.com/h2oai/h2ogpt)
* [axolotl](https://github.com/OpenAccess-AI-Collective/axolotl) 
* lora is a cool thing that makes models smaller or run on smaller hardware
* working on Mac, check out the following that work well on but are not exclusive to Mac
    * [MLC](https://llm.mlc.ai/) _High-Performance Universal LLM Engine for Cloud and Edge_
    * llama.cpp : has python wrapper, works with models models from hugging face, but make sure to get the GGUF model format 

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


