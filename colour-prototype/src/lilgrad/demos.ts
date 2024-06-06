import {MultiLayerPerceptron} from "./nn";

function demo1() {
    console.log("running demo1");
    let x = [2.0, 3.0, -1.0];
    let n = new MultiLayerPerceptron(3, [4, 4, 1]);
    let res1 = n.activate(x);
    console.log(res1);
    let xs = [
        [2.0, 3.0, -1.0],
        [3.0, -1.0, 0.5],
        [0.5, 1.0, 1.0],
        [1.0, 1.0, -1.0]
    ];
    // desired targets on matching corresponding xs
    let ys = [1.0, -1.0, -1.0, 1.0];

    console.log("first round predictions");
    let ypred = xs.map(x => n.activate(x));
    console.log(ypred.toString());

    console.log("total loss");
    function calculateLoss() {
        return ys.map((ygt, i) => (ypred[i][0].sub(ygt)).pow(2))
            .reduce((acc, v) => acc.add(v));
    }
    let loss = calculateLoss();
    console.log(loss.data);
    console.log("backprop");
    loss.backward();
    console.log(`grad of 0-0-0: ${n.layers[0].neurons[0].w[0].grad}`);

}

demo1();