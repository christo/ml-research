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
    let ys = [1.0, -1.0, -1.0, 1.0]; // desired targets
    let ypred = xs.map(x => n.activate(x));
    console.log(ypred);
    // let loss = ys.map(y => )
}

demo1();