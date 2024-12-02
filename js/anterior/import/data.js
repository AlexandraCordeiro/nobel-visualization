import { update } from './update.js';

export let laureates = [];
export let svg = null;
export let data = [];

export function loadData() {
  svg = d3.select("svg");
  let width = window.innerWidth;
  let height = window.innerHeight;

  svg.attr("width", width).attr("height", height);

  return d3.csv("../../dataset/laureates_data.csv", (d) => ({
    id: +d.id,
    name: d.knownName,
    prizeCategory: d.category,
    awardYear: d.awardYear,
    gender: d.gender,
  }))
    .then((loadedData) => {
      laureates = loadedData;
      update();
    })
    .catch((error) => console.error("Erro ao carregar os dados:", error));
}
