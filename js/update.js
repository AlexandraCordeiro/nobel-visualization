let xScale, yScale, originalWidth, originalHeight;

function initializeScales(width, height) {
    xScale = d3.scaleLinear().domain([0, 10]).range([0, width]);
    yScale = d3.scaleLinear().domain([0, 10]).range([0, height]);
    originalWidth = width;
    originalHeight = height;
}

function adjustScales() {
    const newWidth = window.innerWidth;
    const newHeight = newWidth * (originalHeight / originalWidth);
    svg.attr("width", newWidth).attr("height", newHeight);
    xScale.range([0, newWidth]);
    yScale.range([0, newHeight]);
}



function update() {
    // tooltip
  d3.select('body')
  .append('div')
  .attr('id', 'tooltip')
  .attr('style', 'position: absolute; opacity: 0;')

    const mOver = (e, d) => {
        // e is the mouseEvent
        // d is the data
        //console.log(d);
    
        if(`${d.name}` === "undefined" && `${d.prizeCategory}` === "undefined"){
            d3.select('#tooltip').text("");
        }else{
            d3.select('#tooltip')
                .transition()
                .duration(200)
                .style('opacity', 1)
                .text(`${d.name}\n${d.prizeCategory}\n${d.awardYear}`);
            d3.select(e.currentTarget).style("stroke", "black");
        }
    };
    

    const mOut = function(){
        d3.select(this).style("stroke", "none");
        d3.select('#tooltip').style('opacity', 0).text(" ");
    }
    

    function mouseMove(e, d) {
        d3.select('#tooltip').style('left', (e.pageX+10) + 'px').style('top', (e.pageY+10) + 'px')
    }

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
        .on("mouseover", mOver)
        .on("mouseout", mOut)
        .on('mousemove', (e,d)=>mouseMove(e,d))
        .transition()
        .duration(500)
        .attr("r", (d) => d.r);
}
