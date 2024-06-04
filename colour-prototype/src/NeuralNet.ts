import {Mat} from "./Mat";
import {Vec, relu, softmax} from "./la";
import {HslColor} from "react-colorful";

/*
use Matrix for weights between each layer
and Vector for biases in each non-input layer:

     w   b    w   b
L0  -->  L1  -->  L2
L0 input layer with N nodes
L1 hidden layer with M nodes
L2 output layer with Q nodes
L0 -> L1 weights NxM matrix
L1 -> L2 weights MxQ matrix



 */

/**
 * Converts an HslColor domain object into a normalised input vector.
 */
const normaliseHsl = (hsl: HslColor): number[] => [hsl.h / 360, hsl.s / 100, hsl.l / 100];


/**
 * A set of training data with inputs, expected outputs and their labels and a name for convenience.
 * Length of inputs should always equal length of outputs.
 */
interface ColourData {
    name: string;
    /** Input colours */
    inputs: HslColor[];
    /** Labels for colours in training data, used to draw UI */
    outputNames: string[];
    /** Correct index into outputNames for each input */
    outputIndices: number[]
}

interface ActFunc<T extends Mat | number[]> {
    activate(t: T): T;

    backward(t: T, learningRate: number): T;

    name(): string;
}

const tanhAf: ActFunc<Mat> = {
    name: () => "tanh",
    activate(t: Mat): Mat {
        return t.lf((xs: number[]) => xs.map(Math.tanh));
    },

    backward(t: Mat): Mat {
        // TODO implement
        return t;
    }
};

const reluAf: ActFunc<Mat> = {
    name: () => "ReLU",
    activate(t: Mat): Mat {
        return t.lf(relu);
    },

    backward(t: Mat): Mat {
        return t.lf((xs) => xs.map(x => x > 0 ? 1 : 0));
    }
};

const softmaxAf: ActFunc<Vec> = {
    name: () => "softmax",
    activate(v: Vec): Vec {
        return softmax(v);
    },
    backward(t: Vec): Vec {
        throw new Error("unimplemented")
    }
};

export interface TrainStatus {
    running: boolean;
    nDone: number;
    nTotal: number;
}

/** Multi-Layer Perceptron (MLP) with hard-coded 3 (1 hidden) layer architecture */
export class NeuralNet {
    private readonly nHidden: number;
    /** hidden layer biases */
    private bHidden: Vec;
    private readonly nOutput: number;
    /** output layer biases */
    private bOutput: Vec;
    /**
     * Weights from input to hidden layer w1
     * @private
     */
    private wInputHidden: Mat;
    /**
     * Weights from hidden to output w2
     * @private
     */
    private wHiddenOutput: Mat;
    private nInput: number;

    static random(nInput: number, nHidden: number, nOutput: number): NeuralNet {
        let nn = new NeuralNet(nInput, nHidden, nOutput);
        // random weights
        nn.wInputHidden.randomise(-1, 1);
        nn.wHiddenOutput.randomise(-1, 1);
        // random biases
        nn.bHidden.map(() => Math.random());
        nn.bOutput.map(() => Math.random());
        return nn;
    }

    /**
     * Neural network constructed with all weights and biases zeroed. Single hidden layer for now.
     * @param nInput number of input nodes
     * @param nHidden number of hidden nodes
     * @param nOutput number of output nodes
     * @param alpha learning rate in range (0, 1)
     */
    constructor(nInput: number, nHidden: number, nOutput: number, alpha = 0.1) {
        if (nInput < 1 || nHidden < 1) {
            throw Error("Need at least 1 input and hidden layer");
        }
        if (nOutput < 2) {
            throw Error("Need at least 2 output layers");
        }
        if (nInput !== Math.round(nInput) || nHidden !== Math.round(nHidden) || nOutput !== Math.round(nOutput)) {
            throw Error("Layer counts must be integral");
        }
        if (alpha <= 0 || alpha >= 1) {
            throw Error("learning rate should be between 0 and 1 exclusive");
        }
        this.nInput = nInput;
        this.nHidden = nHidden;
        this.nOutput = nOutput;
        this.bHidden = [];
        this.bHidden.fill(0, 0, nHidden);
        this.bOutput = [];
        this.bOutput.fill(0, 0, nOutput);
        // input layers are rows, output layers are columns
        this.wInputHidden = new Mat(nInput, nHidden);
        this.wHiddenOutput = new Mat(nHidden, nOutput);
    }

    setInput(inputMatrix: Mat) {
        // TODO implement as way to set input from ui
        //this.inputMatrix = inputMatrix;
    }

    /**
     * Runs forward propagation for the input, resulting in values at the output nodes.
     */
    forward(): void {
        // clearly I am confused about the use of matrices to represent the weights and biases...

        // TODO what is the input matrix, why a matrix and not a vector?
        // TODO confirm hidden weights should be a vector
        let inputMatrix = this.getInputMatrix();
        // TODO parametise activation function for hidden layer
        // TODO parametise activation function for output layer?
        // TODO parametise number of hidden layers
        let actHidden = tanhAf.activate(this.wInputHidden.dot(inputMatrix).vplus(this.bHidden))
        // TODO write this down and fix confusion about the dimension
        let actOutput = softmaxAf.activate(this.wHiddenOutput.dot(actHidden).vplus(this.bOutput).col(0));
        // calculate the weighted sum, each input from previous layer multiplied by corresponding weights,
        // plus the bias for one neuron. Then same for all neurons in the non-input layer. Feed into activation
        // funciton and then this produces a matrix for the activation inputs of the next layer
    }

    backward() {
        // TODO implement using derivative of the corresponding function
    }

    getInputMatrix(): Mat {
        if ("".length === 0) {
            throw Error("unimplemented");
        }
        return new Mat(2, 2);
    }

    getGeometry(): NnGeometry {
        return {
            layers: 3,
            inputNodes: this.nInput,
            hiddenNodes: this.nHidden,
            outputNodes: this.nOutput,
        }
    }

    /**
     * Changes weights and biases using all the training data.
     * @param data to use for training
     * @param hiddenAf hidden layer activation function
     * @param outputAf output layer activation function (should be probability dist)
     * @param monitor callback for TrainingStatus updates
     */
    train(data: ColourData, hiddenAf: ActFunc<Mat>, outputAf: ActFunc<number[]>, monitor: (status: TrainStatus) => void){
        // TODO implement
        let status: TrainStatus ={
            running: false,
            nTotal: data.inputs.length,
            nDone: data.inputs.length,
        }
        monitor(status);
    }

    /**
     * Reports accuracy against training data
     * @param data
     * @param hiddenAf hidden layer activation function
     * @param outputAf output layer activation function (should be probability dist)
     */
    test(data: ColourData, hiddenAf: ActFunc<Mat>, outputAf: ActFunc<number[]>): number {
        // TODO implement
        return -1;
    }
}

type NnGeometry = {
    layers: number;
    inputNodes: number;
    hiddenNodes: number;
    outputNodes: number;
}

export {softmaxAf, reluAf, tanhAf, ColourData};
export type {NnGeometry};