
/*
Linear algebra functions as required.
 */

/** Function on all elements of an array implementation of a tensor of T */
type all<T> = (ts:T[]) => T[];

/**
 * https://en.wikipedia.org/wiki/Softmax_function
 * @param a
 */
const softmax: all<number> = (a: number[]) => {
    let denom = a.reduce((a, b) => a + Math.exp(b), 0);
    return a.map(x => Math.exp(x) / denom);
}

const relu: all<number> = (a: number[]) => a.map(x => x > 0 ? x : 0)

export {softmax, relu};
export type {all}
type Vec = number[];
export {Vec};