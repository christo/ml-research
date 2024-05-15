import './App.css';
import React, {useState} from 'react';

import {HslColor, HslColorPicker} from "react-colorful";
import {Mat} from "../../src/mat";

type ColourSetter = (value: (((prevState: HslColor) => HslColor) | HslColor)) => void;

const ColourPicker = ({colour, setColour}: {colour: HslColor, setColour: ColourSetter}) => {
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

class NeuralNet {
    private nHidden: number;
    private hiddenBiases: number[];
    private nOutput: number;
    private outputBiases: number[];
    private hiddenWeights: Mat;

    constructor(nHidden: number, nOutput: number) {
        this.nHidden = nHidden;
        this.nOutput = nOutput;
        this.hiddenBiases = [];
        this.outputBiases = [];
        this.hiddenWeights = new Mat(nHidden, )
    }

    random() {

    }
}

function App() {
    let startColour: HslColor = {h:11,s:78,l:47};

    const [colour, setColour]: [HslColor, ColourSetter] = useState(startColour);

    return (
        <div className="App">
            <header className="App-header">

                <h1>Colour Prototype</h1>
            </header>
            <div className="App-body">
                <div className="nnInput">
                    <ColourPicker colour={colour} setColour={setColour}/>
                    <ColourCoordinates colour={colour}/>
                </div>
                <div className="nnInfo">
                    <div>neural net info</div>
                </div>
                <div className="nnOutput">
                    <div>output</div>
                </div>
            </div>
        </div>
    );
}

export default App;
