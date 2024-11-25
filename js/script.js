let margin = 100;
let width = window.innerWidth - margin;
let height = width / 1.5;

let svg = d3.select('body').append('svg').attr('width', width).attr('height', height);

let projection = d3.geoMercator().translate([width / 2, height / 1.4]).scale(width / 6);
let path = d3.geoPath(projection);
let g = svg.append('g');

function drawMap() {

  d3.json("https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/countries-110m.json")
    .then(data => {
      // console.log(data.objects)
      const countries = topojson.feature(data, data.objects.countries);
      g.selectAll('path').data(countries.features).enter().append('path').attr('class', 'country').attr('d', path);
    })
}

function resize() {
  width = window.innerWidth - margin;
  height = width / 1.5;

  svg.attr('width', width).attr('height', height);

  projection.translate([width / 2, height / 1.4]).scale(width / 7);

  g.selectAll('path').attr('d', path);

  svg.selectAll('circle')
    .attr('cx', d => projection([+d.country_longitude, +d.country_latitude])[0])
    .attr('cy', d => projection([+d.country_longitude, +d.country_latitude])[1])

  svg.selectAll('circle')
  .attr('cx', d => projection([+d.birth_country_longitude, +d.birth_country_latitude])[0])
  .attr('cy', d => projection([+d.birth_country_longitude, +d.birth_country_latitude])[1]);
}


function drawBubbles() {
  let dataset = d3.csv('dataset/new_laureates.csv').then(data => {
    
    filterData = data.filter(d => d.birth_country_latitude && d.birth_country_longitude);
    console.log(filterData)
    svg.selectAll('circle')
    .data(filterData)
    .enter()
      .each((d, i) => {
        console.log(`Element index: ${i}, Data:`, d.birth_country_latitude, d.birth_country_longitude);
      })
      .append('circle')
      .attr('cx', d => projection([+d.birth_country_longitude, +d.birth_country_latitude])[0])
      .attr('cy', d => projection([+d.birth_country_longitude, +d.birth_country_latitude])[1])
      .attr('fill', '#E9DF69')
      .attr('r', d => Math.sqrt(+d.birth_country_count / 2 * Math.PI) * 1.5)
      .attr('opacity', 1);
  })
}


drawMap();
drawBubbles();
window.addEventListener('resize', resize);