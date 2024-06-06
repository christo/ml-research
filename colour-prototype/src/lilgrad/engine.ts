// typescript port of karpathy's micrograd https://github.com/karpathy/micrograd
// as explained in https://www.youtube.com/watch?v=VMj-3S1tku0

type NV = Value | number;

/**
 * Stores a single scalar value and its gradient
 */
class Value {
    data: number;
    grad: number;
    private op: string;
    private prev: Set<Value> = new Set();
    private label: string;

    constructor(data: number, children: Value[] = [], op: string = "", label='') {
        this.data = data;
        this.grad = 0;
        this.prev = new Set(children);
        this.op = op; // the op that produced this node, for graphvis / debugging / etc.
        this.label = label;
    }

    add(otherThing: Value | number) {
        const other = otherThing instanceof Value ? otherThing : new Value(otherThing);
        let out = new Value(this.data + other.data, [this, other], "+");
        out.backward = () => {
            this.grad += out.grad;
            other.grad += out.grad;
        }
        return out;
    }

    mul(otherThing: Value | number) {
        const other = otherThing instanceof Value ? otherThing : new Value(otherThing);
        let out = new Value(this.data * other.data, [this, other], "*");
        out.backward = () => {
            this.grad += other.data * out.grad;
            other.grad += this.data * out.grad;
        }
        return out;
    }

    pow(other: number) {
        let out = new Value(this.data ** other, [this], `**${other}`)
        out.backward = () => this.grad += (other * this.data ** (other - 1)) * out.grad
        return out;
    }

    relu() {
        let out = new Value(this.data < 0 ? 0 : this.data, [this], "ReLU");
        out.backward = () => this.grad += ((out.data > 0) ? 1 : 0) * out.grad
        return out;
    }

    backward() {
        // topological order all of the children in the graph
        let topo: Value[] = [];
        let visited = new Set<Value>();
        let buildTopo = (v: Value) => {
            if (!visited.has(v)) {
                visited.add(v);
                this.prev.forEach(buildTopo);
                topo.push(v);
            }
        }
        // go one variable at a time and apply the chain rule to get its gradient
        this.grad = 1;
        topo.reverse().forEach((v: Value) => v.backward())
    }

    neg() {
        return this.mul(-1);
    }

    sub(otherThing: Value | number) {
        const other = otherThing instanceof Value ? otherThing : new Value(otherThing);
        return this.add(other.neg());
    }

    div(otherThing: Value | number) {
        const other = otherThing instanceof Value ? otherThing : new Value(otherThing);
        return this.mul(other.pow(-1));
    }

    toString() {
        return `Value(data=${this.data}, grad=${this.grad})`;
    }
}

export {Value};
export type {NV};