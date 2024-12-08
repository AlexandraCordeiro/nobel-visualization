let phase = 1;
let totalCircles = 0;
const width = window.innerWidth;
const height = window.innerHeight;

window.onload = function () {
    svg = d3.select("svg");
    svg.attr("width", width).attr("height", height);

    initializeScales(width, height);
    initializePhases();

    window.addEventListener("resize", resize);

    loadDataset(() => {
        runPhase(1);
    });
};

function resize() {
    adjustScales();
    update();
}