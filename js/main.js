let svg;
let phase = 1;
let maxPhase=19;
//let totalCircles = 0;
const width = window.innerWidth;
const height = window.innerHeight;
import {initializePhases, runPhase} from "./phases.js";
//import { initializeScales, adjustScales } from "./update.js";
import { initializeScales} from "./update.js";
import { loadDataset } from "./data.js";



window.onload = function () {
    svg = d3.select("svg");
    svg.attr("width", width).attr("height", height);

    initializeScales(width, height);
    initializePhases();

    window.addEventListener("resize", resize);
    document.addEventListener("keydown", handleKeyEvents);

    loadDataset(() => {
        runPhase(1);
    });
};

function resize() {
    adjustScales();
    update();
}

function handleKeyEvents(event) {
    if (event.key === "ArrowRight") nextPhase();
    if (event.key === "ArrowLeft") previousPhase();
}

function nextPhase() {
    phase++;
    if (phase > maxPhase) phase = 1;
    runPhase(phase);
}

function previousPhase() {
    phase--;
    if (phase < 1) phase = maxPhase;
    runPhase(phase);
}
