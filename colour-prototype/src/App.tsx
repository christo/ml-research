import './App.css';
import React, {useState} from 'react';

import {HslColor, HslColorPicker} from "react-colorful";
import {Mat} from "./Mat";

type ColourSetter = (value: (((prevState: HslColor) => HslColor) | HslColor)) => void;

const ColourPicker = ({colour, setColour}: { colour: HslColor, setColour: ColourSetter }) => {
    return <div className="colourpick">
        <HslColorPicker color={colour} onChange={setColour}/>
    </div>
};

function ColourCoordinates({colour}: { colour: HslColor }) {
    return <div className="colour_coordinates">
        <div>Hue: {colour.h}</div>
        <div>Saturation: {colour.s}</div>
        <div>Luminance: {colour.l}</div>
    </div>;
}

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

type Vec = number[];

type NnGeometry = {
    layers: number;
    inputNodes: number;
    hiddenNodes: number;
    outputNodes: number;
}
class NeuralNet {
    private nHidden: number;
    private bHidden: Vec;
    private nOutput: number;
    private bOutput: Vec;
    private wInputHidden: Mat;
    private wHiddenOutput: Mat;
    private nInput: number;

    /**
     * Neural network constructed with all weights and biases zeroed. Single hidden layer for now.
     * @param nInput number of input nodes
     * @param nHidden number of hidden nodes
     * @param nOutput number of output nodes
     */
    constructor(nInput: number, nHidden: number, nOutput: number) {
        if (nInput < 1 || nHidden < 1) {
            throw Error("Need at least 1 input and hidden layer");
        }
        if (nOutput < 2) {
            throw Error("Need at least 2 output layers");
        }
        if (nInput !== Math.round(nInput) || nHidden !== Math.round(nHidden) || nOutput !== Math.round(nOutput)) {
            throw Error("Layer counts must be integral");
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
        this.wInputHidden.fill(0);
        this.wHiddenOutput = new Mat(nHidden, nOutput);
        this.wHiddenOutput.fill(0);
    }

    geometry():NnGeometry {
        return {
            layers: 3,
            inputNodes: this.nInput,
            hiddenNodes: this.nHidden,
            outputNodes: this.nOutput,
        }
    }

    /**
     * Randomise the neural network
     */
    randomise() {
        // weights are between -1 and 1
        this.wInputHidden.randomise(-1, 1);
        this.wHiddenOutput.randomise(-1, 1);
        // biases are between 0-1
        for (let i = 0; i < this.nHidden; i++) {
            this.bHidden[i] = Math.random();
        }
        for (let i = 0; i < this.nOutput; i++) {
            this.bOutput[i] = Math.random();
        }
    }
}

interface ColourName {
    name: string;
    score: number;
}

/**
 * Sorts by score descending
 */
function compareColourNameByScore(lhs: ColourName, rhs: ColourName): number {
    return rhs.score - lhs.score;
}

function ColourNames({colourNames, setColourNames}: {
    colourNames: ColourName[],
    setColourNames: (value: (((prevState: ColourName[]) => ColourName[]) | ColourName[])) => void
}) {
    let renderColourName = (n: ColourName, i: number) => {
        return <div className="colourNames" key={`cn_${i}`}>
            <span className="colourScore">{n.score}</span>
            <span className="colourName">{n.name}</span>
        </div>;
    };
    return <div>
        <div>
        {colourNames.map(renderColourName)}
        </div>
    </div>;
}

function NeuralNetInfo({neuralNet}: { neuralNet: NeuralNet }) {
    let geometry = neuralNet.geometry();

    return <div className="nnInfo">
        <div>layers: {geometry.layers}</div>
        <div>input nodes: {geometry.inputNodes}</div>
        <div>hidden nodes: {geometry.hiddenNodes}</div>
        <div>output nodes: {geometry.outputNodes}</div>
    </div>;
}

function getInitialNames() {
    let INITIAL_NAMES = [
        "red", "yellow", "pink", "green", "purple", "orange", "blue"
    ].map((n, i) => ({name: n, score: i}) as ColourName).sort(compareColourNameByScore);
    return INITIAL_NAMES;
}

function ColourPanel({colour}: { colour: HslColor }) {
    function toCss(colour: HslColor) {
        return `hsl(${colour.h}deg ${colour.s}% ${colour.l}%)`
    }

    return <div className="colourPanel" style={{backgroundColor: toCss(colour)}}>
        &nbsp;
    </div>;
}

function App() {
    let startColour: HslColor = {h: 11, s: 78, l: 47};

    const [colour, setColour]: [HslColor, ColourSetter] = useState<HslColor>(startColour);
    const [colourNames, setColourNames] = useState<ColourName[]>(getInitialNames());

    let [neuralNet, setNeuralNet] = useState(new NeuralNet(3, 20, colourNames.length));
    neuralNet.randomise();

    return (
        <div className="App">
            <header className="App-header">

                <h1>Colour Prototype</h1>
            </header>
            <div className="App-body">
                <div className="nnInput">
                    <h2>input</h2>
                    <ColourPicker colour={colour} setColour={setColour}/>
                    <ColourCoordinates colour={colour}/>
                </div>
                <div className="nnInfo">
                    <div><h2>neural net</h2>
                        <NeuralNetInfo neuralNet={neuralNet}/>
                    </div>
                </div>
                <div className="nnOutput">
                    <div>
                        <ColourPanel colour={colour}/>
                        <ColourNames colourNames={colourNames} setColourNames={setColourNames}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
