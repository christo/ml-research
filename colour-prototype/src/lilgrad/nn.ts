
// typescript port of karpathy's micrograd https://github.com/karpathy/micrograd


class Module {
    zeroGrad() {
        for (const p of this.parameters()) {
            p.grad = 0;
        }
    }

    parameters(): Value[] {
        return []
    }
}

class Neuron extends Module {

    w: Value[];
    b: Value;
    private readonly nonlin: boolean;

    constructor(nin: number, nonlin = true) {
        super();
        this.w = [];
        for (let i = 0; i < nin; i++) {
            this.w.push(new Value(Math.random() * 2 - 1))
        }
        this.b = new Value(0);
        this.nonlin = nonlin;
    }

    activate(x: Value[]): Value {
        let act = this.w.map((wi, i) => wi.mul(x[i]))
            .reduce((acc: Value, x: Value) => acc.add(x), new Value(0));
        return this.nonlin ? act.relu() : act;
    }

    parameters(): Value[] {
        return [...this.w, this.b];
    }
}

class Layer extends Module {
    private neurons: Neuron[];

    constructor(nin: number, nout: number) {
        super();
        this.neurons = [];
        for (let i = 0; i < nout; i++) {
            this.neurons.push(new Neuron(nin))
        }
    }

    activate(x: Value[]): Value[] {
        return this.neurons.map(n => n.activate(x))
    }

    parameters(): Value[] {
        let params: Value[] = []
        this.neurons.forEach(n => n.parameters().forEach(np => params.push(np)));
        return params;
    }
}

class MultiLayerPerceptron extends Module {
    private layers: Layer[];

    constructor(nin: number, nouts: Value[]) {
        super();
        this.layers = []

    }

    activate(x: Value[]): Value[] {
        this.layers.forEach(layer => {
            x = layer.activate(x); // sic
        });
        return x;
    }

    parameters(): Value[] {
        return super.parameters();
    }
}
