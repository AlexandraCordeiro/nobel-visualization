import define from "./index.js";
import map from "./map.js";
import wordCloud from "./words.js"
import {Runtime, Library, Inspector} from "./runtime.js";


let chart = 2

if (chart === 1) {
  const runtime = new Runtime();
  const main = runtime.module(define, Inspector.into(document.body));
}

if (chart === 2) {
  map()
}


if (chart === 3) {
  wordCloud("../dataset/pronouns_word_cloud.csv");
}

