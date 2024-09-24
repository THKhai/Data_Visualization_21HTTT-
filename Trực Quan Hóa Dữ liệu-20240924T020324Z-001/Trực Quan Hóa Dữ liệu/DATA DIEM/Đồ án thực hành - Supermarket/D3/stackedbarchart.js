// set the dimensions and margins of the graph
let margin1 = { top1: 10, right1: 30, bottom1: 20, left1: 50 },
  width1 = 460 - margin1.left1 - margin1.right1,
  height1 = 400 - margin1.top1 - margin1.bottom1;

// append the svg object to the body of the page
let svg1 = d3
  .select("#stackedBarChart")
  .append("svg")
  .attr("width", width1 + margin1.left1 + margin1.right1)
  .attr("height", height1 + margin1.top1 + margin1.bottom1)
  .append("g")
  .attr("transform", "translate(" + margin1.left1 + "," + margin1.top1 + ")");

// Parse the Data
d3.csv("totalInvoice.csv", function (data) {
  // List of subgroups = header of the csv files = soil condition here
  var subgroups = data.columns.slice(1);

  // List of groups = species here = value of the first column called group -> I show them on the X axis
  var groups = d3
    .map(data, function (d) {
      return d.Branch;
    })
    .keys();

  // Add X axis
  var x = d3.scaleBand().domain(groups).range([0, width1]).padding([0.2]);
  svg1
    .append("g")
    .attr("transform", "translate(0," + height1 + ")")
    .call(d3.axisBottom(x).tickSizeOuter(0));

  // Add Y axis
  var y = d3.scaleLinear().domain([0, 400]).range([height1, 0]);
  svg1.append("g").call(d3.axisLeft(y));

  // color palette = one color per subgroup
  var color = d3
    .scaleOrdinal()
    .domain(subgroups)
    .range(["#e41a1c", "#377eb8", "#4daf4a"]);

  //stack the data? --> stack per subgroup
  var stackedData = d3.stack().keys(subgroups)(data);

  // Show the bars
  svg1
    .append("g")
    .selectAll("g")
    // Enter in the stack data = loop key per key = group per group
    .data(stackedData)
    .enter()
    .append("g")
    .attr("fill", function (d) {
      return color(d.key);
    })
    .selectAll("rect")
    // enter a second time = loop subgroup per subgroup to add all rectangles
    .data(function (d) {
      return d;
    })
    .enter()
    .append("rect")
    .attr("x", function (d) {
      return x(d.data.Branch);
    })
    .attr("y", function (d) {
      return y(d[1]);
    })
    .attr("height", function (d) {
      return y(d[0]) - y(d[1]);
    })
    .attr("width", x.bandwidth());
});
