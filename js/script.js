let margin = 100;
let width = window.innerWidth - margin;
let height = width / 1.5;

let svg = d3.select('body').append('svg').attr('width', width).attr('height', height);

let projection = d3.geoMercator().translate([width / 2, height / 1.4]).scale(width / 6);
let path = d3.geoPath(projection);
let g = svg.append('g');


function parseText(text) {
  return text.replace(/[\s\(\)\-\.,]/g, '');
}

function drawMap() {

  d3.json("https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/countries-110m.json")
    .then(data => {
      // console.log(data.objects)
      const countries = topojson.feature(data, data.objects.countries);
      // console.log(countries.features);
      g.selectAll('path')
        .data(countries.features)
        .enter()
          .append('path')
          .attr('class', 'country')
          .attr('d', path)
          .attr('id', (d) => parseText(d.properties.name))

    })
}




function resize() {
  width = window.innerWidth - margin;
  height = width / 1.5;

  svg.attr('width', width).attr('height', height);

  projection.translate([width / 2, height / 1.4]).scale(width / 7);

  g.selectAll('path').attr('d', path);

  svg.selectAll('circle')
    .attr('cx', d => projection([+d[1][0].birth_country_longitude, +d[1][0].birth_country_latitude])[0])
    .attr('cy', d => projection([+d[1][0].birth_country_longitude, +d[1][0].birth_country_latitude])[1])
}


function paintCountries() {
  let dataset = d3.csv('dataset/new_laureates.csv').then(data => {
    filterData = d3.groups(data.filter(d => d.birth_country_latitude && d.birth_country_longitude), (d) => d.birth_countryNow);
    // console.log(filterData)
    // console.log(filterData)
    var bubbles = svg.append("g");
    bubbles.attr('class', 'bubbles');

    bubbles.selectAll('circle')
    .data(filterData)
    .enter()
      .each((d, i) => {
        // console.log(`Element index: ${i}, Data:`,d[0]);
        country = d3.select("#" + parseText(d[0]))
      })
      .append('circle')
        .attr('cx', d => projection([+d[1][0].birth_country_longitude, +d[1][0].birth_country_latitude])[0])
        .attr('cy', d => projection([+d[1][0].birth_country_longitude, +d[1][0].birth_country_latitude])[1])
        .attr('fill', '#E9DF69')
        .attr('stroke', 'white')
        .attr('r', d => Math.sqrt(+d[1][0].birth_country_count / 2 * Math.PI) * 1.5)
        .attr('opacity', 1)
      .append('text')
        .attr('x', d => projection([+d[1][0].birth_country_longitude, +d[1][0].birth_country_latitude])[0])
        .attr('y', d => projection([+d[1][0].birth_country_longitude, +d[1][0].birth_country_latitude])[1])
        .text(d => d[0]);
      
    
  })
}

function prizeAmounts() {
  let data = d3.csv('dataset/prize_amount.csv').then(data => {
    years = data.map(d => +d.year)
    values = data.map(d => +d.value_sek_2023)
    historyEvents = data.map(d => d.history_events)
    compared_to_original_amounts = data.map(d => +d.compared_to_original_amount)

    console.log(years)
    console.log(values)
    console.log(historyEvents)
    am5.ready(function() {

      // Create D3 simulation and collision force
      var simulation = d3.forceSimulation();
      var collisionForce = d3.forceCollide();
      
      // Update bullet positions on tick
      simulation.on("tick", function() {
        updatePositions();
      });
      
      // Updated bullet positions
      function updatePositions() {
        am5.array.each(nodes, function(node) {
          var circle = node.circle;
          
          // Instead of setting `y` we use `dy`, as `y` is set by the chart
          // each time chart changes its size or something else changes
          circle.setAll({
            dy: node.y - circle.y()
          });
      
          node.fx = circle.x(); // `y` might change when div changes its size
        });
      }
      
      
      // Nodes array which will be used by simulation
      var nodes = [];
      
      // Adds nodes to the nodes array
      function addNode(dataItem) {
        var bullets = dataItem.bullets;
        if (bullets) {
          var bullet = bullets[0];
          if (bullet) {
            var circle = bullet.get("sprite");
      
            if (circle) {
              // We use `fx` for horizontal position as we don't want `x` to change.
              // For a vertical chart, set `fx` instead of `fy`
              var node = {
                fx: circle.x(),
                y: circle.y(),
                circle: circle
              };
              nodes.push(node);
            }
          }
        }
      }
      
      // Updates collision forces
      function updateForces() {
        simulation.force("collision", collisionForce);
      
        collisionForce.radius(function(node) {
          var circle = node.circle;
          return circle.get("radius", 1) + 1; // 1 add 1 for padding
        });
      }
      
      
      // Create root element
      // https://www.amcharts.com/docs/v5/getting-started/#Root_element
      var root = am5.Root.new("chartdiv");
      
      root.numberFormatter.setAll({
        numberFormat: "#",
        numericFields: ["x"]
      })
      
      // Set themes
      // https://www.amcharts.com/docs/v5/concepts/themes/
      root.setThemes([
        am5themes_Animated.new(root)
      ]);
      
      
      // Create chart
      // https://www.amcharts.com/docs/v5/charts/xy-chart/
      var chart = root.container.children.push(am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        /* wheelY: "zoomXY",
        pinchZoomX: false,
        pinchZoomY: false */
      }));
      
      
      // Create axes
      // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
      var xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererX.new(root, {
          minGridDistance:30
        }),
        extraMin:0.01,
        extraMax:0.01,
      
      }));
      
      xAxis.get("renderer").grid.template.set("forceHidden", false);

      var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {}),
        visible: false
      }));
      
      yAxis.get("renderer").grid.template.set("forceHidden", true);
      
      // Create series
      // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
      var series = chart.series.push(am5xy.LineSeries.new(root, {
        calculateAggregates: true,
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "y",
        valueXField: "x",
        valueField: "value"
      }));
      
      series.strokes.template.set("visible", false);
      
      
      // Add bullet
      // https://www.amcharts.com/docs/v5/charts/xy-chart/series/#Bullets
      var circleTemplate = am5.Template.new({});
      
      series.bullets.push(function() {
        var bulletCircle = am5.Circle.new(root, {
          fill: series.set("fill", am5.color(0xE9DF69)),
          fillOpacity: 0.8,
          tooltipText: "[fontFamily: Times New Roman]{value}%",
          tooltipY: 0,
        }, circleTemplate);
      
        bulletCircle.states.create("hover", {
          fill: chart.set("fill", am5.color(0x888888))
        })
      
        return am5.Bullet.new(root, {
          sprite: bulletCircle
        });
      });
      
      
      // Add heat rule
      // https://www.amcharts.com/docs/v5/concepts/settings/heat-rules/
      // this makes radius different, depending on the value.
      // remove if you want all circles to be of the same size
      series.set("heatRules", [{
        target: circleTemplate,
        min: width * 0.005,
        max: width * 0.02,
        dataField: "value",
        key: "radius"
      }]);
      
      // Set data
      // https://www.amcharts.com/docs/v5/charts/xy-chart/series/#Setting_data
      
      // Generate random data
      var data = [];
      for (var i = 0; i < years.length; i++) {
        data.push({
          x: years[i],
          y: 0,
          value: compared_to_original_amounts[i]
        });
      }
      
      series.data.setAll(data);
      
      // Update forces whenever data is parsed
      series.events.on("datavalidated", function() {
        // Needs a timeout as bullets are created a bit later
        setTimeout(function() {
          am5.array.each(series.dataItems, function(dataItem) {
            addNode(dataItem);
          })
          simulation.nodes(nodes);
          updateForces();
        }, years.length)
      });
      
      // Update bullet positions when chart bounds change
      chart.plotContainer.events.on("boundschanged", function() {
        updateForces();
        simulation.restart();
      });
      
      
      // Make stuff animate on load
      // https://www.amcharts.com/docs/v5/concepts/animations/
      chart.appear(1000, 100);
      
      }); // end am5.ready()
  })
}


/* drawMap();
paintCountries(); */
prizeAmounts()
window.addEventListener('resize', resize);