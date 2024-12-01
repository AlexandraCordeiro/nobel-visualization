export function parseText(text) {
  return text.replace(/[\s\(\)\-\.,]/g, '');
}

export function drawMap() {

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


export function resize() {
  width = window.innerWidth - margin;
  height = width / 1.5;

  svg.attr('width', width).attr('height', height);

  projection.translate([width / 2, height / 1.4]).scale(width / 7);

  g.selectAll('path').attr('d', path);

  svg.selectAll('circle')
    .attr('cx', d => projection([+d[1][0].birth_country_longitude, +d[1][0].birth_country_latitude])[0])
    .attr('cy', d => projection([+d[1][0].birth_country_longitude, +d[1][0].birth_country_latitude])[1])
}


export function paintCountries() {
  let dataset = d3.csv('dataset/laureates_data.csv').then(data => {
    let filterData = d3.groups(data.filter(d => d.birth_country_latitude && d.birth_country_longitude), (d) => d.birth_countryNow);
    // console.log(filterData)
    // console.log(filterData)
    var bubbles = svg.append("g");
    bubbles.attr('class', 'bubbles');

    bubbles.selectAll('circle')
    .data(filterData)
    .enter()
      .each((d, i) => {
        // console.log(`Element index: ${i}, Data:`,d[0]);
        let country = d3.select("#" + parseText(d[0]))
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

export function map() {
    let margin = 100;
    let width = window.innerWidth - margin;
    let height = width / 1.5;
    
    let svg = d3.select('body').append('svg').attr('width', width).attr('height', height);
    let projection = d3.geoMercator().translate([width / 2, height / 1.4]).scale(width / 6);
    let path = d3.geoPath(projection);
    let g = svg.append('g');

    drawMap()
    paintCountries()
    window.addEventListener('resize', resize);
}

/* const funcs = {
    paintCountries,
    drawMap,
    resize
} */

export default map;