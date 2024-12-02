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
    const mOver = (e, d) => {
        // e is the mouseEvent
        // d is the data
        console.log(d);
    
        const element = d3.select(e.currentTarget); // Current SVG element
        const parent = d3.select(element.node().parentNode); // Parent of the SVG element
    
        // Highlight the SVG element
        element
            .style("stroke", "black")
            .style("opacity", 1);
    
        // Array of text properties to display
        const textData = [
            { dy: "100px", text: d.name },
            { dy: "120px", text: d.prizeCategory },
            { dy: "140px", text: d.awardYear }
        ];
    
        // Append text elements dynamically
        textData.forEach(({ dy, text }) => {
            parent.append('text')
                .attr('dy', dy)
                .attr('id', 'temp')
                .attr('fill', 'black')
                .text(text);
        });
    };
    

    const mOut = function(){
        d3.select(this)
            .style("stroke", "none");

        d3.select(this.parentNode).selectAll('#temp').remove('#temp');
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
        .transition()
        .duration(500)
        .attr("r", (d) => d.r);
}
