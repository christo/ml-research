
// typescript port of karpathy's micrograd

class Value {
    data: number;
    grad: number;
    private op: string;
    private prev: Set<Value> = new Set();
    private backward: () => void;

    constructor(data: number, children: Value[] = [], op: string = "") {
        this.data = data;
        this.grad = 0;
        this.op = op;
        this.backward = () => {};
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
        let out = new Value(this.data**other, [this], `**${other}`)
        out.backward = () => {
            this.grad += (other * this.data**(other-1)) * out.grad
        }
        return out;
    }
}