// noinspection SpellCheckingInspection


import {Mat} from "./Mat";

describe('Mat basics', () => {
    test('at',  () => {
        let mat: Mat = new Mat(2, 3);
        mat.fill(() => 0);
        mat.set(0, 1, 0.1);
        mat.set(1, 2, 0.5);
        expect(mat.at(1, 1)).toBeCloseTo(0);
        expect(mat.at(0, 1)).toBeCloseTo(0.1);
        expect(mat.at(1, 2)).toBeCloseTo(0.5);
    });
    
    test("row", () => {
        let mat: Mat = Mat.bipolarRandom(5, 3);
        let row3 = mat.row(3);
        expect(mat.cols).toEqual(3);
        expect(row3).toHaveLength(mat.cols);
        for (let i = 0; i < row3.length; i++) {
            expect(mat.at(3, i)).toBeCloseTo(row3[i]);
        }
    })
});

describe('dot product', () => {

    let a: Mat = new Mat(2, 3);
    a.setAll([
        2, 5, 1,
        7, 3, 6
    ]);

    let b: Mat = new Mat(3, 2);
    b.setAll([
        1, 8,
        9, 4,
        3, 5
    ]);

    test('sane a and b', () => {
        expect(a.rows).toBe(b.cols);
        expect(a.cols).toBe(b.rows);
        expect(a.isSquare()).toBe(false);
        expect(b.isSquare()).toBe(false);
    });

    test('a dot b', () => {

        let abExpected = new Mat(2, 2);
        abExpected.setAll([
            50, 41,
            52, 98
        ]);

        let actual = a.dot(b);
        expect(actual.isSquare()).toBeTruthy();
        expect(actual.equalsish(abExpected, 0.02)).toBeTruthy();
    });

    test('b dot a', () => {
        let baExpected = new Mat(3, 3);
        baExpected.setAll([
            58, 29, 49,
            46, 57, 33,
            41, 30, 33
        ]);
        let actual = b.dot(a);
        expect(actual.isSquare()).toBeTruthy();
        expect(actual.equalsish(baExpected, 0.02)).toBeTruthy();
    });
});

describe("at corners", () => {
    let m: Mat = new Mat(3, 2);
    m.setAll([
        1, 2,
        3, 4,
        5, 6
    ]);

    test('top left', () => {
        expect(m.at(0, 0)).toBeCloseTo(1);
    });

    test('top right', () => {
        expect(m.at(0, 1)).toBeCloseTo(2);
    });

    test('bottom left', () => {
        expect(m.at(2, 0)).toBeCloseTo(5);
    });

    test('top right', () => {
        expect(m.at(2, 1)).toBeCloseTo(6);
    });
})