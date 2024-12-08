/*Monetary Value Code*/

/*Colors*/
let backColor = "#F7F1E5";
let yellow = "#FFC100"; //organizations
let terra = "#B05E27"; //female
let green1 = "#898121"; //male
let green2 = "#4C4B16";

function _beeswarm(beeswarmForce, x, chartheight, r) {
  return beeswarmForce()
    .x((d) => x(d.value))
    .y(chartheight / 2)
    .r((d) => 1 + r(d.size));
}

function mouseOver(e, d) {
  console.log(d.data.comparison);
  d3.select("#tooltip")
    .transition()
    .duration(200)
    .style("opacity", 1)
    .text(`${d.data.value}\n${d.data.comparison}%`);
}

function mouseMove(e, d) {
  d3.select("#tooltip")
    .style("left", e.pageX + 10 + "px")
    .style("top", e.pageY + 10 + "px");
}

function mouseOut(e, d) {
  d3.select("#tooltip").style("opacity", 0);
}

async function _3(d3, chartwidth, margin, chartheight, x, beeswarm, data, r) {
  d3.map(data, (d) => {
    return d.comparison;
  });

  const colorScale = d3.scaleLinear().domain([0, 100]).range([yellow, green2]);

  /* d3.select('body').append('div').attr('id', 'title').append('p').html('Impact Of Global Economic Crises On The Nobel Prize Amount') */

  // tooltip
  d3.select("body")
    .append("div")
    .attr("id", "tooltip")
    .attr("style", "position: absolute; opacity: 0;");

  // chart svg
  const svg = d3
    .create("svg")
    .attr("width", chartwidth + margin.left + margin.right)
    .attr("height", chartheight + margin.top + margin.bottom);

  const g = svg
    .append("g")
    .attr("transform", `translate(${[margin.left, margin.top]})`);

  g.append("g")
    .call(d3.axisTop(x).tickSizeOuter(0).tickFormat(d3.format("d")))
    .attr("transform", `translate(0, ${chartheight / 1.15})`)
    .attr("id", "x-axis")
    .attr("font-size", "0.8rem");

  g.selectAll("circle")
    .data((d) => beeswarm(data))
    .join("circle")
    .attr("fill", (d) => colorScale(d.data.comparison))
    .attr("fill-opacity", 0.1)
    .attr("cx", () => Math.random() * window.innerWidth)
    .attr("cy", () => Math.random() * window.innerHeight)
    .attr("r", 0)

    .on("mouseover", (e, d) => mouseOver(e, d))
    .on("mouseout", (e, d) => mouseOut(e, d))
    .on("mousemove", (e, d) => mouseMove(e, d))
    .transition()
    .attr("r", (d) => r(d.data.size))
    .attr("cx", (d) => d.x)
    .attr("cy", (d) => d.y)
    .style("fill-opacity", 0.9)
    .duration(1000);

  // lines for history events
  const filteredData = data.filter((d) => d.label);
  const lines = svg.append("g");
  lines
    .selectAll("line")
    .data(beeswarm(filteredData))
    .join("line")
    .attr("class", "line")
    .attr("x1", (d) => x(d.data.value) + margin.left)
    .attr("x2", (d) => x(d.data.value) + margin.left)
    .attr("y1", chartheight / 1.15 + 1)
    .attr(
      "y2",
      (d, i) => chartheight / 1.15 + (filteredData.length - i) * 15 - 10
    )
    .attr("stroke", "black")
    .attr("opacity", 1)
    .attr("stroke-width", 1);

  // add labels (history events)
  const labels = svg.append("g");
  labels
    .selectAll("text")
    .data(beeswarm(filteredData))
    .join("text")
    .attr("class", "label")
    .attr("x", (d) => x(d.data.value) + margin.left - 2)
    .attr(
      "y",
      (d, i) => chartheight / 1.15 + (filteredData.length - i) * 15 + 10
    )
    .text((d) => d.data.label);

  // add chart explanation
  let chartExplanation = svg.append("g").attr("id", "chart-explanation");

  chartExplanation.attr("transform", `translate(${10}, ${margin.top})`);
  let minValue = d3.min(data, (d) => +d.prizeValue);
  let maxValue = d3.max(data, (d) => +d.prizeValue);
  let minSize = d3.min(data, (d) => +d.comparison);
  let maxSize = d3.max(data, (d) => +d.comparison);

  let monetaryValue = chartExplanation.append("g").attr("id", "monetary-value");

  let minValuePos, maxValuePos, colorGradientPos, labelsHeight, titleHeight;
  minValuePos = 35;
  maxValuePos = 45;
  colorGradientPos = 55;
  titleHeight = chartheight / 1.15 + 20 * filteredData.length;
  labelsHeight = chartheight / 1.15 + 20 * filteredData.length + 70;
  let money = [
    {
      id: "minValue",
      value: minValue,
      size: minSize,
      pos: `${minValuePos}vw`,
      textPos: `${minValuePos - 5}vw`,
    },
    {
      id: "maxValue",
      value: maxValue,
      size: maxSize,
      pos: `${maxValuePos}vw`,
      textPos: `${maxValuePos}vw`,
    },
  ];

  monetaryValue
    .selectAll("circle")
    .data(money)
    .join("circle")
    .attr("id", (d) => d.id)
    .attr("cx", (d) => d.textPos)
    .attr("cy", labelsHeight)
    .attr("r", (d) => r(d.size * 7))
    .attr("stroke", "black")
    .attr("fill", "none");

  // Append text for minValue and maxValue
  monetaryValue
    .selectAll(".value-text")
    .data(money)
    .join("text")
    .attr("class", "value-text")
    .attr("x", (d) => d.textPos)
    .attr("y", labelsHeight + r(maxValue) / 2)
    .attr("text-anchor", "middle")
    .text((d) => d.value);

  // Title text
  let titleSekValue = ["Monetary Value December 2023 (SEK)"];

  monetaryValue
    .append("foreignObject")
    .attr("x", `${minValuePos - 5}vw`)
    .attr("y", titleHeight)
    .attr("width", "15vw")
    .attr("padding-bottom", "10px")
    .attr("height", 100)
    .attr("class", "text")
    .append("xhtml:div")
    .style("text-align", "center")
    .style("white-space", "wrap")
    .text("Monetary Value December 2023 (SEK)");

  const colorGradient = chartExplanation
    .append("g")
    .attr("id", "color-gradient");

  let group = colorGradient
    .append("foreignObject")
    .attr("x", `${colorGradientPos}vw`)
    .attr("y", labelsHeight)
    .attr("width", "15vw")
    .attr("height", 100)
    .append("xhtml:div")
    .style("display", "flex")
    .style("align-items", "center")
    .style("justify-content", "space-between")
    .style("border-image-slice", 1)
    .style("border-width", "5px")
    .style("border-top", "20px solid")
    .style(
      "border-image-source",
      `linear-gradient(to right, ${yellow}, ${green2})`
    );

  group
    .append("xhtml:p")
    .style("margin", "0")
    .style("padding", "0 1px")
    .text(`${minSize}`)
    .attr("class", "text");

  group
    .append("xhtml:p")
    .style("margin", "0")
    .style("padding", "0 1px")
    .text(`${maxSize}`)
    .attr("class", "text");

  let titleCompared = ["Value in % compared to original amount (in 1901)"];

  colorGradient
    .append("foreignObject")
    .attr("x", `${colorGradientPos}vw`)
    .attr("y", titleHeight)
    .attr("width", "15vw")
    .attr("height", 50)
    .attr("class", "text")
    .append("xhtml:div")
    .style("white-space", "wrap")
    .style("text-align", "center")
    .text(titleCompared);

  // only return svg
  return svg.node();
}

function _x(d3, data, chartwidth, margin) {
  console.log(
    "Extent of data:",
    d3.extent(data, (d) => d.value)
  );
  console.log("Chart width:", chartwidth);
  return d3.scaleLinear(
    d3.extent(data, (d) => d.value),
    [0, chartwidth]
  );
}

function _r(d3, width, height) {
  return d3.scaleLog([100, 1000], [1, Math.sqrt(width * height) / 30]);
}

function _margin(r) {
  return { left: 5 * r.range()[1], right: 5 * r.range()[1], top: 1, bottom: 1 };
}

function _chartwidth(width, margin) {
  return width - margin.left - margin.right;
}

function _height() {
  return 350;
}

function _chartheight(height, margin) {
  return height - margin.top - margin.bottom;
}

async function _data(d3, r) {
  let data = [];
  const d = await d3.csv("../dataset/prize_amount.csv");
  d.forEach((obj) => {
    data.push({
      value: +obj.year,
      size: +obj.compared_to_original_amount * 5,
      label: obj.history_events || "",
      comparison: +obj.compared_to_original_amount,
      prizeValue: obj.value_sek_2023,
    });
  });

  return data;
}

function _beeswarmForce(d3) {
  return function () {
    let x = (d) => d[0];
    let y = (d) => d[1];
    let r = (d) => d[2];
    let ticks = 300;

    function beeswarm(data) {
      // console.log(data)
      const entries = data.map((d) => {
        return {
          x0: typeof x === "function" ? x(d) : x,
          y0: typeof y === "function" ? y(d) : y,
          r: typeof r === "function" ? r(d) : r,
          data: d,
        };
      });

      const simulation = d3
        .forceSimulation(entries)
        .force(
          "x",
          d3.forceX((d) => d.x0)
        )
        .force(
          "y",
          d3.forceY((d) => d.y0)
        )
        .force(
          "collide",
          d3.forceCollide((d) => d.r)
        );

      for (let i = 0; i < ticks; i++) simulation.tick();

      return entries;
    }

    beeswarm.x = (f) => (f ? ((x = f), beeswarm) : x);
    beeswarm.y = (f) => (f ? ((y = f), beeswarm) : y);
    beeswarm.r = (f) => (f ? ((r = f), beeswarm) : r);
    beeswarm.comparison = (f) =>
      f ? ((comparison = f), beeswarm) : comparison;
    beeswarm.ticks = (n) => (n ? ((ticks = n), beeswarm) : ticks);

    return beeswarm;
  };
}

export default function define(runtime, observer) {
  const main = runtime.module();
  // main.variable(observer()).define(["md"], _1);
  main
    .variable(observer())
    .define(
      [
        "d3",
        "chartwidth",
        "margin",
        "chartheight",
        "x",
        "beeswarm",
        "data",
        "r",
      ],
      _3
    );
  main
    .variable()
    .define("beeswarm", ["beeswarmForce", "x", "chartheight", "r"], _beeswarm);
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
