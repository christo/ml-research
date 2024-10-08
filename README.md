# Human Learning Machine Learning

Notes and code for exploring ML.

* [Research Notes](ml-research.md) collected from various sources.
* [Linear Algebra Notes](linear-algebra.md)
* Idea: [Neural Network in MIT Scratch](scratch-nn.md)
* [Ideas](ideas.md) prompted by developments in machine learning for psychology, philosophy, politics etc.

## Reading List

Several papers recommended by the alphanerds at GPU Mode [ML Systems Onboarding Reading List](https://github.com/gpu-mode/awesomeMLSys)

* Attention
  * [Attention is All You Need](https://arxiv.org/abs/1706.03762)
  * [Online normalizer calculation for softmax](https://arxiv.org/abs/1805.02867): Read before Flash Attention.
  * [Self Attention does not need O(n^2) memory](https://arxiv.org/abs/2112.05682):
  * [Flash Attention 2](https://arxiv.org/abs/2307.08691)
  * [Llama 2 paper](https://arxiv.org/abs/2307.09288)
  * [gpt-fast](https://github.com/pytorch-labs/gpt-fast)
  * [Train Short, Test Long: Attention with Linear Biases Enables Input Length Extrapolation](https://arxiv.org/abs/2108.12409)
* Performance
  * [Towards Efficient Generative Large Language Model Serving: A Survey from Algorithms to Systems](https://arxiv.org/abs/2312.15234): Wonderful survey, start here
  * [Efficiently Scaling transformer inference](https://arxiv.org/abs/2211.05102): Introduced many ideas most notably KV caches
  * [Making Deep Learning go Brrr from First Principles](https://horace.io/brrr_intro.html): One of the best intros to fusions and overhead
* Quantisation
  * [A White Paper on Neural Network Quantization](https://arxiv.org/abs/2106.08295)
  * [LLM.int8](https://arxiv.org/abs/2208.07339): All of Dettmers papers are great but this is a natural intro
  * [FP8 formats for deep learning](https://arxiv.org/abs/2209.05433): For a first hand look of how new number formats come about
  * [Smoothquant](https://arxiv.org/abs/2211.10438): Balancing rounding errors between weights and activations#
* Long Context Length
  * [RoFormer: Enhanced Transformer with Rotary Position Embedding](https://arxiv.org/abs/2104.09864): The paper that introduced rotary positional embeddings
  * [YaRN: Efficient Context Window Extension of Large Language Models](https://arxiv.org/abs/2309.00071): Extend base model context lengths with finetuning
  * [Ring Attention with Blockwise Transformers for Near-Infinite Context](https://arxiv.org/abs/2310.01889): Scale to infinite context lengths as long as you can stack more GPUs
* Sparsity
  * [Venom](https://arxiv.org/pdf/2310.02065): Vectorized N:M Format for sparse tensor cores
  * [Megablocks](https://arxiv.org/pdf/2211.15841): Efficient Sparse training with mixture of experts
  * [ReLu Strikes Back](https://openreview.net/pdf?id=osoWxY8q2E): Activation sparsity in LLMs
  * [Sparse Llama](https://arxiv.org/pdf/2405.03594)
  * [Simple pruning for LLMs](https://arxiv.org/pdf/2306.11695)

## Prototype Project

Colour name classifier without ML library dependency [Colour Prototype](colour-prototype/README.md)

* Only 2-3 input nodes (RGB, HSL or maybe HL)
* output nodes on the order of 10
* prototype Implementation in TypeScript

## Muzaklassifier

Music classifier idea [Muzaklassifier](muzaklassifier/README.md) (pre-larval stage)
