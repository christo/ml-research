#!/bin/zsh


# https://huggingface.co/lykong-fdu/Meta-Llama-3-70B-Instruct-Q4_K_M-GGUF
# works fine on macbook pro 64Gb with m1 max

# TODO make paths work by referencing from this script's directory


llama-cli \
    --hf-repo lykong-fdu/Meta-Llama-3-70B-Instruct-Q4_K_M-GGUF \
    --hf-file meta-llama-3-70b-instruct-q4_k_m.gguf \
    -t 16 \
    -f prompts/granny-scamtarget.txt \
    -i 

