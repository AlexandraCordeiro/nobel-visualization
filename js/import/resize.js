import { svg, data } from './data.js';

let originalWidth = window.innerWidth;
let originalHeight = window.innerHeight;
let Ratio = originalHeight / originalWidth;

export function resize() {
  let newWidth = window.innerWidth;
  let newHeight = newWidth * Ratio;

  svg.attr("width", newWidth).attr("height", newHeight);

  data.forEach((d) => {
    d.x = (d.x / originalWidth) * newWidth;
    d.y = (d.y / originalHeight) * newHeight;
  });

  originalWidth = newWidth;
  originalHeight = newHeight;
}
