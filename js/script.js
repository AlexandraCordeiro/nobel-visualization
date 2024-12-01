import define from "./index.js";
import map from "./map.js";
import {Runtime, Library, Inspector} from "./runtime.js";


let chart = 1

if (chart === 1) {
  const runtime = new Runtime();
  const main = runtime.module(define, Inspector.into(document.body));
}

if (chart === 2) {
  map()
}
