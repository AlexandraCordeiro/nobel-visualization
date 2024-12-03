 /*Colors*/
 let backColor = '#F7F1E5';
 let yellow = "#FFC100"; //organizations
 let terra = "#B05E27"; //female
 let green1 = "#898121"; //male
 let green2 = "#4C4B16";

function _beeswarm(beeswarmForce, x, chartheight, r) {
  return (
    beeswarmForce()
      .x(d => x(d.value))
      .y(chartheight / 2)
      .r(d => 1 + r(d.size))
  )
}

function mouseOver(e, d) {
  console.log(d.data.comparison)
  d3.select('#tooltip').transition().duration(200).style('opacity', 1).text(`${d.data.value} ${d.data.comparison}%`)
}

function mouseMove(e, d) {
  d3.select('#tooltip').style('left', (e.pageX+10) + 'px').style('top', (e.pageY+10) + 'px')
}

function mouseOut(e, d) {
  d3.select('#tooltip').style('opacity', 0)
}

async function _3(d3, chartwidth, margin, chartheight, x, beeswarm, data, r) {

  d3.map(data, d => {return d.comparison})

  const colorScale = d3.scaleLinear().domain([0, 100]).range([yellow, green2])

  d3.select('body').append('div').attr('id', 'title').append('p').html('Impact Of Global Economic Crises On The Nobel Prize Amount')

  // tooltip
  d3.select('body')
    .append('div')
    .attr('id', 'tooltip')
    .attr('style', 'position: absolute; opacity: 0;')

  // chart svg
  const svg = d3.create("svg")
    .attr("width", chartwidth + margin.left + margin.right)
    .attr("height", chartheight + margin.top + margin.bottom);

  const g = svg.append("g")
    .attr("transform", `translate(${[margin.left, margin.top]})`);

  g.append("g")
    .call(d3.axisTop(x).tickSizeOuter(0).tickFormat(d3.format("d")))
    .attr("transform", `translate(0, ${chartheight / 1.15})`)
    .attr('id', 'x-axis')
    .attr('font-size', "0.8rem")

  g.selectAll("circle")
    .data(d => beeswarm(data))
    .join("circle")
    .attr('fill', d => colorScale(d.data.comparison))
    .attr("fill-opacity", 0.8)
    .attr("cx", d => d.x)
    .attr("cy", d => d.y)
    .attr("r", d => r(d.data.size))
    .on('mouseover', (e, d) => mouseOver(e, d))
    .on('mouseout', (e, d) => mouseOut(e, d))
    .on('mousemove', (e, d) => mouseMove(e, d));

    
  // lines for history events
  const filteredData = data.filter(d => d.label);
  const lines = svg.append("g")
  lines.selectAll("line")
    .data(beeswarm(filteredData))
    .join("line")
    .attr("class", "line")
    .attr("x1", d => x(d.data.value) + margin.left) 
    .attr("x2", d => x(d.data.value) + margin.left)
    .attr("y1", chartheight / 1.15 + 1) 
    .attr("y2", (d, i) => chartheight / 1.15 + (filteredData.length - i) * 20 - 10) 
    .attr("stroke", "black")
    .attr("opacity", 1)
    .attr("stroke-width", 1)

  // add labels (history events)
  const labels = svg.append("g")
  labels.selectAll("text")
    .data(beeswarm(filteredData))
    .join("text")
    .attr("class", "label")
    .attr("x", d => x(d.data.value) + margin.left - 2) // x-position of the line
    .attr("y", (d, i) => (chartheight / 1.15 + (filteredData.length - i) * 20) + 10) // Bottom of the chart
    .text(d => d.data.label)

  
  // add chart explanation
  let chartExplanation = svg.append('g')
    .attr('id', 'chart-explanation')

  let minValue = d3.min(data, d => +d.prizeValue)
  let maxValue = d3.max(data, d => +d.prizeValue)
  let minSize = d3.min(data, d => +d.comparison)
  let maxSize = d3.max(data, d => +d.comparison)

  let monetaryValue = chartExplanation.append('g').attr('id', 'monetary-value')
  
  let money = [{'id': 'minValue', 'value': minValue, 'size': minSize, 'pos': '40vw'}, {'id': 'maxValue', 'value': maxValue, 'size': maxSize, 'pos': '45vw'}]
  monetaryValue.selectAll('circle')
    .data(money)
    .join('circle')
    .attr('id', d => d.id)
    .attr('cx', d => d.pos)
    .attr('cy', (d, i) => (chartheight / 1.15) + (25 * (filteredData.length)))
    .attr('r', d => r(d.size * 7))
    .attr('stroke', 'black')
    .attr('fill', 'none')
    
  
  const colorGradient = chartExplanation.append('g').attr('id', 'color-gradient')

  let colorLine = [{'id': 'colorLine','x1': '50vw', 'x2': '60vw', 'y': (chartheight / 1.15) + (20 * (filteredData.length))}]
  colorGradient.append("foreignObject")
  .attr("x", '50vw') // Adjust x to place it relative to the chartExplanation's transform
  .attr("y", (chartheight / 1.15) + (25 * (filteredData.length))) // Adjust y to fit your layout
  .attr("width", 200)
  .attr("height", 100)
  .append("xhtml:div") // Use the xhtml namespace for the div
  .style("border-image-slice", 1)
  .style("border-width", '5px')
  .style("border-top", "10px solid")
  .style("border-image-source", `linear-gradient(to right, ${yellow}, ${green2})`)


  // monetaryValue.selectAll('circle')
  // only return svg
  return svg.node();


}


function _x(d3, data, chartwidth, margin) {
  console.log("Extent of data:", d3.extent(data, d => d.value));
  console.log("Chart width:", chartwidth);
  return (
    d3.scaleLinear(
      d3.extent(data, d => d.value),
      [0, chartwidth]
    )
  )
}

function _r(d3, width, height) {
  return (
    d3.scaleLog(
      [400, 1000],
      [15, Math.sqrt(width * height) / 30]
    )
  )
}

function _margin(r) {
  return (
    { left: 5 * r.range()[1], right: 5 * r.range()[1], top: 1, bottom: 1 }
  )
}

function _chartwidth(width, margin) {
  return (
    width - margin.left - margin.right
  )
}

function _height() {
  return (
    350
  )
}

function _chartheight(height, margin) {
  return (
    height - margin.top - margin.bottom
  )
}

async function _data(d3, r) {
  let data = []
  const d = await d3.csv('../dataset/prize_amount.csv')
    d.forEach(obj => {
      data.push({value: +obj.year, size: +obj.compared_to_original_amount * 5, label: obj.history_events || "", comparison: +obj.compared_to_original_amount, prizeValue: obj.value_sek_2023})
    })

  return data
}


function _beeswarmForce(d3) {
  return (
    function () {
      let x = d => d[0];
      let y = d => d[1];
      let r = d => d[2];
      let ticks = 300;

      function beeswarm(data) {
        // console.log(data)
        const entries = data.map(d => {
          return {
            x0: typeof x === "function" ? x(d) : x,
            y0: typeof y === "function" ? y(d) : y,
            r: typeof r === "function" ? r(d) : r,
            data: d
          }
        });

        const simulation = d3.forceSimulation(entries)
          .force("x", d3.forceX(d => d.x0))
          .force("y", d3.forceY(d => d.y0))
          .force("collide", d3.forceCollide(d => d.r));

        for (let i = 0; i < ticks; i++) simulation.tick();

        return entries;
      }

      beeswarm.x = f => f ? (x = f, beeswarm) : x;
      beeswarm.y = f => f ? (y = f, beeswarm) : y;
      beeswarm.r = f => f ? (r = f, beeswarm) : r;
      beeswarm.comparison = f => f ? (comparison = f, beeswarm) : comparison;
      beeswarm.ticks = n => n ? (ticks = n, beeswarm) : ticks;

      return beeswarm;
    }
  )
}

export default function define(runtime, observer) {
  const main = runtime.module();
  // main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["d3", "chartwidth", "margin", "chartheight", "x", "beeswarm", "data", "r"], _3);
  main.variable().define("beeswarm", ["beeswarmForce", "x", "chartheight", "r"], _beeswarm);
  main.variable().define("x", ["d3", "data", "chartwidth", "margin"], _x);
  main.variable().define("r", ["d3", "width", "height"], _r);
  main.variable().define("margin", ["r"], _margin);
  main.variable().define("chartwidth", ["width", "margin"], _chartwidth);
  main.variable().define("height", _height);
  main.variable().define("chartheight", ["height", "margin"], _chartheight);
  main.variable().define("data", ["d3", "r"], _data);
  main.variable().define("beeswarmForce", ["d3"], _beeswarmForce);
  return main;
}
