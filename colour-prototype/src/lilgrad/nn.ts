// typescript port of karpathy's micrograd https://github.com/karpathy/micrograd
// as explained in https://www.youtube.com/watch?v=VMj-3S1tku0

// the port is pretty close. differences mostly reflect language differences in
// constraints and occasionally preferring ts idioms


import type {NV} from "./engine"
import {Value} from "./engine";

abstract class Module {
    zeroGrad() {
        for (const p of this.parameters()) {
            p.grad = 0;
        }
    }

    abstract parameters(): Value[];
}

class Neuron extends Module {

    w: Value[];
    b: Value;
    private readonly nonlin: boolean;

    /**
     *
     * @param nin number of inputs
     * @param nonlin true iff activation should be nonlinear
     */
    constructor(nin: number, nonlin = true) {
        super();
        this.w = [];
        for (let i = 0; i < nin; i++) {
            this.w.push(new Value(Math.random() * 2 - 1))
        }
        this.b = new Value(Math.random() * 2 - 1);
        this.nonlin = nonlin;
    }

    /**
     * The length of x should be equal to the number of inputs
     * @param x
     */
    activate(x: NV[]): Value {
        if (x.length !== this.w.length) {
            throw Error(`expected length of x (${x.length}) to be same as w: ${this.w.length}`)
        }
        // w (*) x + b where (*) is a dot product
        let act = this.w.map((wi, i) => wi.mul(x[i]))
            .reduce((acc, x) => acc.add(x), this.b);
        // in the video he uses tanh, here if nonlin, he uses relu
        return this.nonlin ? act.relu() : act;
    }

    parameters(): Value[] {
        return [...this.w, this.b];
    }
}

class Layer extends Module {
    private neurons: Neuron[];

    /**
     * @param nin number  of inputs i.e. dimensionality
     * @param nout number of outputs i.e. neurons
     * @param nonlin if the neuron activations should be nonlinear
     */
    constructor(nin: number, nout: number, nonlin: boolean) {
        super();
        this.neurons = [];
        for (let i = 0; i < nout; i++) {
            this.neurons.push(new Neuron(nin, nonlin))
        }
    }

    /**
     * Always returns an array, even when length is 1. Karpathy's implementation
     * returns a single Value instead of an array of 1
     * @param x
     */
    activate(x: NV[]): Value[] {
        return this.neurons.map(n => n.activate(x))
    }

    parameters(): Value[] {
        return this.neurons.flatMap(n => n.parameters());
    }
}

class MultiLayerPerceptron extends Module {
    private layers: Layer[];

    /**
     *
     * @param nin number of inputs
     * @param nouts outputs, sizes of each layer
     */
    constructor(nin: number, nouts: number[]) {
        super();
        let sz = [nin, ...nouts]
        this.layers = []
        for (let i = 0; i < nouts.length; i++) {
            let nonlin = i != nouts.length - 1;
            this.layers.push(new Layer(sz[i], sz[i + 1], nonlin))
        }
    }

    activate(x: NV[]): Value[] {
        let ret: Value[] = [];
        this.layers.forEach(layer => {
            ret = layer.activate(x); // sic
        });
        return ret;
    }

    parameters(): Value[] {
        return this.layers.flatMap(layer => layer.parameters());
    }
}

export {Neuron, Layer, MultiLayerPerceptron};
