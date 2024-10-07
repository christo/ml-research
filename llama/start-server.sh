#!/usr/bin/env zsh

# start the server with a hugging face model reference
# this will be downloaded on-demand to a system-specific
# cache location, on linux under $HOME/.cache/llama.cpp 
# and on mac, in $HOME/Library/Caches/llama.cpp/

# hf repos to try:
# mlabonne/Llama-3.1-70B-Instruct-lorablated-GGUF


XOPTS='--log-colors'

MODELS="$(dirname $0)/models"
# uncensored quantized llama 8B 
llama-server $XOPTS -m "$MODELS/Meta-Llama-3-8B-Instruct-abliterated-v3.Q8_0.gguf"

# capybara-2.5-mistral 7b 4-bit
# llama-server $XOPTS -m "$MODELS/capybarahermes-2.5-mistral-7b.Q4_K_S.gguf"

# uncensored llama 3.1 70B model
# (not enough memory)
#llama-server $XOPTS \
#  --hf-repo mlabonne/Llama-3.1-70B-Instruct-lorablated-GGUF \
#  --hf-file llama-3.1-70b-instruct-lorablated.Q2_K_M.gguf

# quantised llama 3 70B
#llama-server $XOPTS -m "$MODELS/meta-llama-3-70b-instruct-q4_k_m.gguf"
