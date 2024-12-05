export function parseText(text) {
  return text.replace(/[\s\(\)\-\.,]/g, '');
}


function mouseOver(e, d) {
  console.log(d[0])
  d3.select('#tooltip').transition().duration(200).style('opacity', 1).text(`${d[0]}`)
}

function mouseMove(e, d) {
  d3.select('#tooltip').style('left', (e.pageX+10) + 'px').style('top', (e.pageY+10) + 'px')
}

function mouseOut(e, d) {
  d3.select('#tooltip').style('opacity', 0)
}

export function map() {



  let margin = 100;
  let width = window.innerWidth - margin;
  let height = width / 1.5;
  
  let svg = d3.select('body').append('svg').attr('width', width).attr('height', height);
  let projection = d3.geoMercator().translate([width / 2, height / 1.4]).scale(width / 6);
  let path = d3.geoPath(projection);
  let g = svg.append('g');

  

  d3.json("https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/countries-110m.json")
    .then(data => {
      const countries = topojson.feature(data, data.objects.countries);
      
      g.selectAll('path')
        .data(countries.features)
        .enter()
          .append('path')
          .attr('class', 'country')
          .attr('d', path)
          .attr('id', (d) => parseText(d.properties.name))

    })

    // tooltip
    d3.select('body')
      .append('div')
      .attr('id', 'tooltip')
      .attr('style', 'position: absolute; opacity: 0;')

    d3.csv('dataset/laureates_data.csv').then(data => {
      data = d3.sort(data, d => -d.birth_country_count)
      let filterData = d3.groups(data.filter(d => d.birth_country_latitude && d.birth_country_longitude), (d) => d.birth_countryNow);
      var bubbles = svg.append("g");
      let radiusScale = d3.scaleLog()
        .domain([1, d3.max(filterData, d => d[1].length)])
        .range([4, 20]);

      bubbles.attr('class', 'bubbles');
      bubbles.selectAll('circle')
      .data(filterData)
      .enter()
        .append('circle')
          .attr('cx', d => projection([+d[1][0].birth_country_longitude, +d[1][0].birth_country_latitude])[0])
          .attr('cy', d => projection([+d[1][0].birth_country_longitude, +d[1][0].birth_country_latitude])[1])
          .attr('fill', 'var(--yellow)')
          .attr('stroke', 'white')
          .attr('r', d => radiusScale(d[1].length))
          .attr('opacity', 1)
          .attr('id', d => d[0])
          .attr('x', d => projection([+d[1][0].birth_country_longitude, +d[1][0].birth_country_latitude])[0])
          .attr('y', d => projection([+d[1][0].birth_country_longitude, +d[1][0].birth_country_latitude])[1])
          .on('mouseover', (d, e) => mouseOver(d, e))
          .on('mouseout', (d, e) => mouseOut(d, e))
          .on('mousemove', (d, e) => mouseMove(d, e))
  })

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

  window.addEventListener('resize', resize);
}



export default map;