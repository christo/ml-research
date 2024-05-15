
/*
Linear algebra functions as required.
 */

/**
 * https://en.wikipedia.org/wiki/Softmax_function
 * @param vec
 */
function softmax(vec: number[]) {
    let denom = vec.reduce((a, b) => a + Math.exp(b), 0);
    return vec.map(x => Math.exp(x) / denom);
}

export {softmax};