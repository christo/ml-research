#!/bin/zsh


# https://huggingface.co/lykong-fdu/Meta-Llama-3-70B-Instruct-Q4_K_M-GGUF

# works fine on macbook pro with m1 max
llama-cli \
    --hf-repo lykong-fdu/Meta-Llama-3-70B-Instruct-Q4_K_M-GGUF \
    --hf-file meta-llama-3-70b-instruct-q4_k_m.gguf \
    -t 16 \
    -f prompts/gamerbrain.txt \
    -r "human:" --in-prefix " " \
    --in-suffix "gamerbrain:" \
    -i 

