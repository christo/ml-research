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
LLAMA3_8B_UNCENSORED="$MODELS/Meta-Llama-3-8B-Instruct-abliterated-v3.Q8_0.gguf"
# capybara-2.5-mistral 7b 4-bit
MISTRAL_7B_4BIT="$MODELS/capybarahermes-2.5-mistral-7b.Q4_K_S.gguf"
# quantised llama 3 70B - pretty slow
LLAMA3_70B_4BIT="$MODELS/meta-llama-3-70b-instruct-q4_k_m.gguf"

# set the model here
MODEL="$LLAMA3_8B_UNCENSORED"

echo starting llama server
llama-server $XOPTS -m "$MODEL"

# uncensored llama 3.1 70B model
# (64Gb machine reports not enough memory)
#llama-server $XOPTS \
#  --hf-repo mlabonne/Llama-3.1-70B-Instruct-lorablated-GGUF \
#  --hf-file llama-3.1-70b-instruct-lorablated.Q2_K_M.gguf

