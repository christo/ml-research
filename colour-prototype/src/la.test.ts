import {softmax} from "./la";

describe('softmax', () => {
    test('basic', () => {
        let vec = [-1, 0, 3, 5];
        let actual = softmax(vec);
        let expected = [0.002, 0.006, 0.118, 0.874];
        expect(actual.length).toEqual(vec.length);
        for (let i = 0; i < actual.length; i++) {
            expect(actual[i]).toBeCloseTo(expected[i]);
        }
    });
});
