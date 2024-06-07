import {Value} from "../../lilgrad/engine";

describe('value', () => {
    test('basic arithmetic', () => {
        let a = new Value(2);
        // compact internal disclosure
        expect(a.toString()).toEqual("Value(data=2, grad=0)");
        let b = new Value(3);
        let apb = a.add(b);
        expect(apb.data).toEqual(5);
        let apbma = apb.mul(a);
        expect(apbma.data).toEqual(10);
        let apbmasb = apbma.sub(b);
        expect(apbmasb.data).toEqual(7);
    });

    test("grad starts at zero", () => {
        let a = new Value(1337);
        expect(a.data).toEqual(1337);
        expect(a.grad).toEqual(0);
    });

    test("backward synthetic", () => {
        let a = new Value(3);
        let b = a.mul(66);
        b.grad = 49;
        b._backward();
        console.log(a.grad);
        expect(a.grad).not.toEqual(0);
    });

    test("prev connected correctly", () => {
        let a = new Value(123);
        let b = a.pow(2);
        expect(b.prev.size).toEqual(1);
        expect(a.prev.size).toEqual(0);
    });

    test.skip("backward mul", () => {
        let a = new Value(7);
        let b = new Value(8);
        let c = a.mul(b);
        expect(c.data).toEqual(56);

        c.backward();
        // TODO correct expected value
        expect(a.grad).toEqual(-1);
        expect(b.grad).toEqual(-1);
    });

    test.skip("backward composite", () => {
        let a = new Value(2);
        let b = a.pow(3);
        expect(b.data).toEqual(8);


        // b.backward();


        let c = b.mul(a);
        c.backward();

        console.log(a.grad);
        console.log(b.grad);
        console.log(c.grad);

        // TODO get clear about which grad should be nonzero
        expect(a.grad !== 0 || b.grad !== 0 || c.grad !== 0).toBe(true);





        // TODO correct expected value
        expect(b.grad).toBeCloseTo(6);
    })
});