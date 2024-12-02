import { loadData } from './data.js';
import { phase1, phase2, phase3, phase4, phase5, phase6 } from './phases.js';
import { resize } from './resize.js';

let phase = 1;
let maxPhase = 6;

window.onload = function () {
  loadData().then(() => {
    window.addEventListener("resize", resize);

    document.addEventListener("keydown", (event) => {
      if (event.key === "ArrowRight") nextPhase();
      if (event.key === "ArrowLeft") previousPhase();
    });

    runPhase(phase);
  });
};

function nextPhase() {
  phase = (phase % maxPhase) + 1;
  runPhase(phase);
}

function previousPhase() {
  phase = (phase - 2 + maxPhase) % maxPhase + 1;
  runPhase(phase);
}

function runPhase(phase) {
  if (phase === 1) phase1();
  if (phase === 2) phase2();
  if (phase === 3) phase3();
  if (phase === 4) phase4();
  if (phase === 5) phase5();
  if (phase === 6) phase6();
}
