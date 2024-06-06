import {Neuron} from "../../lilgrad/nn";

describe('Neuron', () => {
    test('basic', () => {
        let n = new Neuron(2)
        // parameters includes weights and biases
        expect(n.parameters().length).toEqual(3);
    });
});