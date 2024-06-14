import './App.css';
import React, {useState} from 'react';

import {HslColor, HslColorPicker} from "react-colorful";
import {ColourData, NeuralNet, NnGeometry, softmaxAf, tanhAf, TrainStatus} from "./NeuralNet";
import {getHslData, HslData, labels} from "./rgbdata";
import {MultiLayerPerceptron} from "./lilgrad/nn";

type ColourSetter = (value: (((prevState: HslColor) => HslColor) | HslColor)) => void;

const ColourPicker = ({colour, setColour}: { colour: HslColor, setColour: ColourSetter }) => {
    return <div className="colourpick">
        <HslColorPicker color={colour} onChange={setColour}/>
    </div>
};

function ColourCoordinates({colour}: { colour: HslColor }) {
    return <div className="colourCoordinates">
        <div>Hue: {colour.h}</div>
        <div>Saturation: {colour.s}</div>
        <div>Luminance: {colour.l}</div>
    </div>;
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

export function NeuralNetInfoFromLilGrad({mlp}:{mlp: MultiLayerPerceptron}) {
    return <div>
        {mlp.parameters().map((value, i) => {
            return <p key={`mlp_p_${i}`}>{value.toString()}</p>
        })}
    </div>

}

export function NeuralNetInfo({geometry, trainStatus}: { geometry: NnGeometry, trainStatus: TrainStatus }) {
    let trainClass = trainStatus.running ? "running" : "idle";
    let trainLabel = trainStatus.running ? "running" : "idle";
    let trainPercent = Math.round(trainStatus.nDone * 100 / trainStatus.nTotal);
    return <div className="nnInfo">
        <div>layers: {geometry.layers}</div>
        <div>input nodes: {geometry.inputNodes}</div>
        <div>hidden nodes: {geometry.hiddenNodes}</div>
        <div>output nodes: {geometry.outputNodes}</div>
        <div className="training">
            <span className={trainClass}>{trainLabel}</span>
            <span className="percent">{trainPercent}%</span>
        </div>

    </div>;
}

type ColourDataConsumer = (cd: ColourData) => void;

type TrainHandler = { train: ColourDataConsumer };

function mkColourData(name: string, hslData: HslData[]): ColourData {
    let outputNames: string[] = [...labels(hslData)!];  // force non-null, spread to array
    // TODO PERF don't map twice, use unzip
    return {
        name: name,
        inputs: hslData.map(value => value.hsl),
        outputIndices: hslData.map(value => outputNames.indexOf(value.label)),
        outputNames: outputNames
    }
}

const TRAINING_DATA: ColourData[] = [
    mkColourData("main training data", getHslData())
];

function TrainingControls({train}: TrainHandler) {

    return <div>
        {TRAINING_DATA.map((cd, i) => {
            return <button onClick={e => train(cd)}
                           key={`cd_tb_${i}`}>
                {cd.name}
            </button>;
        })}
    </div>;
}


function App() {
    let startColour: HslColor = {h: 11, s: 78, l: 47};

    const [colour, setColour]: [HslColor, ColourSetter] = useState<HslColor>(startColour);
    const [colourNames, setColourNames] = useState<ColourName[]>(getInitialNames());
    let nn = NeuralNet.random(3, 20, colourNames.length);
    let [geometry, setGeometry] = useState(nn.getGeometry());
    let [examples, setExamples] = useState<number>(0);
    let initStatus: TrainStatus = {running: false, nDone: 0, nTotal: 0};
    const [trainingStatus, setTrainingStatus] = useState<TrainStatus>(initStatus)

    const doTrain = (data: ColourData) => {
        nn.train(data, tanhAf, softmaxAf, setTrainingStatus);
        setGeometry(nn.getGeometry());
    }

    // TODO test neural net on training data it hasn't seen
    // TODO randomise neural net

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
                    <div>
                        <TrainingControls train={doTrain}/>
                        <NeuralNetInfo geometry={geometry} trainStatus={trainingStatus}/>
                    </div>
                </div>
                <div className="nnOutput">
                    <div>
                        <ColourPanel colour={colour}/>
                        <ColourNames colourNames={colourNames} setColourNames={setColourNames}/>
                    </div>
                </div>
            </div>
            <div className="App-body karpathy">
                <div><h5>Lil Grad</h5></div>
                <div className="graph"></div>
            </div>
        </div>
    );
}

export default App;
