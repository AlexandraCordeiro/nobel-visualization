import { svg, data } from './data.js';

export function update() {
  const circles = svg.selectAll("circle").data(data, (d) => d.id);

  circles.exit().transition().duration(500).attr("r", 0).remove();

  circles
    .transition()
    .duration(500)
    .attr("cx", (d) => d.x)
    .attr("cy", (d) => d.y)
    .attr("r", (d) => d.r)
    .attr("fill", (d) => d.color);

  circles
    .enter()
    .append("circle")
    .attr("cx", (d) => d.x)
    .attr("cy", (d) => d.y)
    .attr("r", 0)
    .attr("fill", (d) => d.color)
    .transition()
    .duration(500)
    .attr("r", (d) => d.r);
}
