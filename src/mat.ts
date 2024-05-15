/**
 * Matrix class.
 */
class Mat {
    readonly rows: number;
    readonly cols: number;
    private data: any[];

    constructor(rows: number, cols: number) {
        this.rows = rows;
        this.cols = cols;
        this.data = new Array(rows * cols);
    }

    /**
     * Returns the number at the given row and column.
     * @param row
     * @param col
     */
    at(row: number, col: number): number {
        return this.data[row * this.cols + col];
    }

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

    isSquare(): boolean {
        return this.rows === this.cols;
    }

    fill(value: number) {
        for (let i = 0; i < this.data.length; i++) {
            this.data[i] = value;
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
}

export {Mat};