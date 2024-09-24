// set the dimensions and margins of the graph
let margin = { top: 30, right: 30, bottom: 70, left: 60 },
  width = 460 - margin.left - margin.right,
  height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
let svg = d3
  .select("#barchart")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.csv("revenueAllBranch.csv", function (data) {
  // sort data
  // data.sort(function (b, a) {
  //   return a.total - b.total;
  // });

  // X axis
  var x = d3
    .scaleBand()
    .range([0, width])
    .domain(
      data.map(function (d) {
        return d.branch;
      })
    )
    .padding(0.2);
  svg
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");

  // Add Y axis
  var y = d3.scaleLinear().domain([0, 150000]).range([height, 0]);
  svg.append("g").call(d3.axisLeft(y));

  svg
    .selectAll("mybar")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", function (d, i) {
      return x(d.branch);
    })
    .attr("y", function (d) {
      return y(d.total);
    })
    .attr("width", x.bandwidth())
    .attr("height", function (d) {
      return height - y(d.total);
    })
    .attr("fill", function (d, i) {
      return ["#e41a1c", "#377eb8", "#4daf4a"][i];
    });
});
