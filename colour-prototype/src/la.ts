
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

const relu: all<number> = (a: number[]) => a.map(x => x > 0 ? x : 0)

export {softmax, relu};
export type {all}
type Vec = number[];
export {Vec};