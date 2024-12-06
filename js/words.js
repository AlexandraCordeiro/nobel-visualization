export function wordCloud(file) {
    // List of words
    d3.select('body').append('div').attr('id', 'word-cloud')
    var myWords = d3.csv(file).then(myWords => {
        console.log(myWords.map(function(d) { return {text: d.text, size:+d.size}; }))
        // set the dimensions and margins of the graph
        var margin = {top: 10, right: 10, bottom: 10, left: 10},
            width = window.innerWidth * 0.6 - margin.left - margin.right,
            height = width;
    
        // append the svg object to the body of the page
        var svg = d3.select("#word-cloud").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            /* .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");
     */
        // Constructs a new cloud layout instance. It run an algorithm to find the position of words that suits your requirements
        // Wordcloud features that are different from one word to the other must be here
        var layout = d3.layout.cloud()
        .size([width, height])
        .words(myWords.map(function(d) { return {text: d.text, size:+d.size}; }))
        .padding(30)        //space between words
        /* .rotate(function() { return ~~(Math.random() * 2) * 90; }) */
        .fontSize(d => d.size)  
        .spiral("archimedean")   
        .on("end", draw);
        layout.start();
        
        function scaleFontSize(size) {
            const scale = d3.scaleLinear()
                .domain([d3.min(myWords, d => d.size), d3.max(myWords, d => d.size)]) // Map from min to max word size
                .range([16, 100])  // Map to desired font size range
                .clamp(true);  // Prevents font size from exceeding the min/max range
            return scale(size);
        }
        
        var simulation = d3.forceSimulation(myWords)
            .force("collide", d3.forceCollide(d => d.radius + 10))  // Avoid collisions
            .force("x", d3.forceX(width / 2).strength(0.1))  // Center the words horizontally
            .force("y", d3.forceY(height / 2).strength(0.1))  // Center the words vertically
            .stop();  // Stop automatically after a fixed number of iterations
    
        // Run the simulation for a few steps
        for (let i = 0; i < myWords.length; i++) {  // Number of simulation iterations
            simulation.tick();
        }
        // This function takes the output of 'layout' above and draw the words
        // Wordcloud features that are THE SAME from one word to the other can be here
        function draw(words) {
            let maxSize = d3.max(words, d => d.size)
        svg
            .append("g")
            .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2.5 + ")")
            .selectAll("text")
                .data(words)
            .enter().append("text")
                .style("font-size", d => `${scaleFontSize(d.size)}px`)
                .style("fill", "var(--yellow)")
                .attr("text-anchor", "middle")
                .style("font-family", "var(--jost")
                .attr("transform", function(d) {
                return "translate(" + [d.x, d.y] + ")";
                })
                .text(function(d) { return d.text; });
        }
    })

}

export default wordCloud;

