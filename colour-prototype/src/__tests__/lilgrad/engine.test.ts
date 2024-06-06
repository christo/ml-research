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
});