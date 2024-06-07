// typescript port of karpathy's micrograd https://github.com/karpathy/micrograd
// as explained in https://www.youtube.com/watch?v=VMj-3S1tku0

type NV = Value | number;

/**
 * Stores a single scalar value and its gradient
 */
class Value {
    data: number;
    grad: number;
    prev: Set<Value> = new Set();
    private op: string;
    private label: string;
    _backward: () => void;

    constructor(data: number, children: Value[] = [], op: string = "", label = '') {
        this.data = data;
        this.grad = 0;
        this.prev = new Set(children);
        this.op = op; // the op that produced this node, for graphvis / debugging / etc.
        this.label = label;
        this._backward = () => {};
    }

    add(otherThing: Value | number): Value {
        const other = otherThing instanceof Value ? otherThing : new Value(otherThing);
        let out = new Value(this.data + other.data, [this, other], "+");
        let this1 = this;
        out._backward = function () {
            console.log(`backward for add ${this1.data} + ${other.data}`);
            this1.grad += out.grad;
            other.grad += out.grad;
        }
        return out;
    }

    mul(otherThing: Value | number): Value {
        const other = otherThing instanceof Value ? otherThing : new Value(otherThing);
        let out = new Value(this.data * other.data, [this, other], "*");
        let this1 = this;
        out._backward = () => {
            console.log(`backward for mul ${this1.data} * ${other.data}`);
            this1.grad += other.data * out.grad;
            other.grad += this1.data * out.grad;
        }
        return out;
    }

    /**
     * Raise this to the power of a number
     * @param other a number not a value
     * @return this^other
     */
    pow(other: number): Value {
        let out = new Value(this.data ** other, [this], `**${other}`);
        let this1 = this;
        out._backward = function () {
            console.log(`backward for pow ${this1.data}^${other}`);
            this1.grad += (other * this1.data ** (other - 1)) * out.grad;
        }
        return out;
    }

    /**
     * Alternative nonlinear activation stage niladic function.
     */
    tanh(): Value {
        let x = this.data;
        let e2x = Math.exp(2*x);
        let t = (e2x - 1) / (e2x + 1);
        let out = new Value(t, [this], "tanh");
        let this1 = this;
        out._backward = function() {
            this1.grad = (1 - t**2) * out.grad;
        }
        return out;
    }

    /**
     * Rectified Linear Unit, common nonlinear activation stage function
     */
    relu(): Value {
        let out = new Value(this.data < 0 ? 0 : this.data, [this], "ReLU");
        let this1 = this;
        out._backward = () => this1.grad += ((out.data > 0) ? 1 : 0) * out.grad
        return out;
    }

    backward() {
        console.log("running default backward()");
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

    /**
     * Negation
     * @return this * -1
     */
    neg(): Value {
        return this.mul(-1);
    }

    /**
     * Subtraction
     * @param otherThing
     * @return this - otherThing
     */
    sub(otherThing: Value | number): Value {
        const other = otherThing instanceof Value ? otherThing : new Value(otherThing);
        return this.add(other.neg());
    }

    /**
     * Division
     * @param otherThing
     * @return this / otherThing
     */
    div(otherThing: Value | number): Value {
        const other = otherThing instanceof Value ? otherThing : new Value(otherThing);
        return this.mul(other.pow(-1));
    }

    toString(): string {
        return `Value(data=${this.data}, grad=${this.grad})`;
    }
}

export {Value};
export type {NV};