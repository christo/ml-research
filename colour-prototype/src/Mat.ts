import {all, Vec} from "./la";

2

/**
 * Matrix class.
 */
class Mat {
    readonly rows: number;
    readonly cols: number;

    /** Entries stored in row major order https://en.wikipedia.org/wiki/Row-_and_column-major_order */
    private data: any[];

    static bipolarRandom(rows: number, cols: number) {
        let m = new Mat(rows, cols);
        m.fill((x) => Math.random() * 2 - 1);
        return m;
    }

    static unipolarRandom(rows: number, cols: number) {
        let m = new Mat(rows, cols);
        m.fill((x) => Math.random());
        return m;
    }

    /**
     * Makes a Matrix of the given dimensions, filled with zeroes.
     */
    constructor(rows: number, cols: number) {
        this.rows = rows;
        this.cols = cols;
        this.data = new Array(rows * cols);
        this.fill(x => 0);
    }

    /**
     * Returns the number at the given row and column.
     * @param row
     * @param col
     */
    at(row: number, col: number): number {
        return this.data[row * this.cols + col];
    }

    // noinspection JSUnusedGlobalSymbols
    /**
     * Intended for debugging only.
     */
    dump(): string {
        //calculate the cell width based on the widest value plus padding
        const cellWidth = 2 + this.data.map(x => x.toString().length)
            .reduce((a, b) => Math.max(a, b), 0);
        let s = "";
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                let value = `${this.at(row, col)}`;
                s += value;
                // trailing spaces for cell
                s += " ".repeat(cellWidth - value.length);
            }
            s += "\n";
        }
        return s;
    }


    /**
     * Dot product. This is on the left hand side so it must have
     * the same number of rows as the rhs has cols.
     * @param rhs right hand side of dot product
     * @return new matrix as result
     */
    dot(rhs: Mat): Mat {

        // a =  2  5  1    b = 1  8
        //      7  3  6        9  4
        //                     3  5
        //
        // a       (rows x cols)  = (2x3)
        // b       (rows x cols)  = (3x2)
        // a dot b (rows x cols)  = (2x2)
        // b dot a (rows x cols)  = (3x3)

        //
        // adotb[0,0] = a[0,0] * b[0,0] + a[0,1] * b[1,0] + a[0,2] * b[2,0]
        //            =      2 * 1      +      5 * 9      +      1 * 3
        // adotb[0,1] = a[0,0] * b[0,1] + a[0,1] * b[1,1] + a[0,2] * b[2,1]
        //            =      2 * 8      +      5 * 4      +      1 * 5
        // adotb[1,0] = a[1,0] * b[0,0] + a[1,1] * b[1,0] + a[1,2] * b[2,0]
        //            =      7 * 1      +      3 * 9      +      6 * 3
        // adotb[1,1] = a[1,0] * b[0,1] + a[1,1] * b[1,1] + a[1,2] * b[2,1]
        //            =      7 * 8      +      3 * 4      +      6 * 5

        // the result[R,C] uses a[R, ?] * b[

        // a dot b = 50  41
        //           52  98
        //
        // b dot a = 58  29  49
        //           46  57  33
        //           41  30  33

        if (this.rows !== rhs.cols || this.cols !== rhs.rows) {
            throw new Error("LHS rows must equal RHS cols and vice versa");
        }
        // result is square
        const result = new Mat(this.rows, rhs.cols);
        for (let r = 0; r < result.rows; r++) {
            for (let c = 0; c < result.cols; c++) {
                // console.log(`calculating result[${r},${c}]`);
                // lhs row is r
                // lhs col goes from 0 to lhs.cols
                // rhs row goes from 0 to rhs.rows (same as lhs.cols)
                // rhs col is c
                let sum = 0;
                for (let i = 0; i < this.cols; i++) {
                    let lhsRi = this.at(r, i);
                    let rhsIc = rhs.at(i, c);
                    let product = lhsRi * rhsIc;
                    sum += product;
                    // console.log(`LHS[${r},${i}]xRHS[${i},${c}] = ${lhsRi}x${rhsIc} = ${product} cum-sum[${r}, ${c}]=${sum}`);
                }
                result.set(r, c, sum);
            }
        }
        return result;
    }

    /**
     * Matrix addition with vector.
     * @param rhs
     */
    vplus(rhs: number[]): Mat {
        throw Error("unimplemented");
    }

    /**
     * Applies the given linear algebra function to all elements
     * @param f
     * @return this
     */
    lf(f: all<number>): Mat {
        // TODO decide whether to mutate or return a copy
        this.data = f(this.data);
        return this;
    }

    /**
     * Get column n as a Vec.
     */
    col(n: number): Vec {
        let result: Vec = []
        for (let i = n; i < this.data.length; i += this.cols) {
            result.push(this.data[i]);
        }
        return result;
    }

    /**
     * Get row n as a Vec.
     */
    row(n: number): Vec {
        let rowStart = n * this.cols;
        return this.data.slice(rowStart, rowStart + this.cols);
    }

    /**
     * Matrix transform.
     */
    transform(): void {
        throw Error("unimplemented");
    }

    isSquare(): boolean {
        return this.rows === this.cols;
    }

    fill(filler: (n: number, i?: number) => number): void {
        for (let i = 0; i < this.data.length; i++) {
            this.data[i] = filler(this.data[i], i);
        }
    }

    set(row: number, col: number, value: number) {
        if (row >= this.rows || col >= this.cols || row < 0 || col < 0) {
            throw Error(`Out of range: [${row},${col}]`);
        }
        this.data[row * this.cols + col] = value;
    }

    setAll(data: number[]) {
        if (data.length !== this.data.length) {
            throw Error(`Out of range: expected data length ${this.data.length}`);
        }
        this.data = data.slice(); // defensive copy
    }

    /**
     * Elementwise equality with delta.
     * @param other
     * @param maxDelta
     */
    equalsish(other: Mat, maxDelta: number) {
        for (let i = 0; i < this.data.length; i++) {
            if (isNaN(this.data[i]) || isNaN(other.data[i])) {
                // NaN is never equal because we never want it!
                return false;
            }
            if (Math.abs(this.data[i] - other.data[i]) > maxDelta) {
                return false;
            }
        }
        return true;
    }

    randomise(lower: number, upper: number) {
        this.data = new Array(this.rows * this.cols);
        let range = upper - lower;
        if (range <= 0) {
            throw Error(`Nonpositive range: [${lower},${upper}]`);
        }
        for (let i = 0; i < this.data.length; i++) {
            this.data[i] = Math.random() * (range) + lower;
        }
    }
}

export {Mat};