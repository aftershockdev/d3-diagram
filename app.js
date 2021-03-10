let margin = { top: 50, right: 50, bottom: 50, left: 50 };

let width = 600 - margin.left - margin.right;
let height = 600 - margin.top - margin.bottom;

let svg = d3
  .select("#visualization")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .attr("fill", "#190df0")
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

let x = d3.scaleBand().range([0, width]);
let y = d3.scaleLinear().range([height, 0]);

d3.select("#visualization")
  .transition()
  .duration(4000)
  .style("background-color", "lightblue")
  .style("border-radius", "50px");

d3.csv("data.csv").then((data) => {
  data.forEach((d) => {
    d.Contributors = +d.Contributors;
  });

  x.domain(data.map((d) => d.Project));
  y.domain([0, d3.max(data, (d) => d.Contributors)]);

  svg
    .selectAll(".bar")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", (d) => x(d.Project))
    .attr("width", x.bandwidth() - 3)
    .attr("y", (d) => y(d.Contributors));

  svg
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  svg.append("g").call(d3.axisLeft(y));

  d3.selectAll(".bar")
    .attr("height", 0)
    .transition()
    .ease(d3.easeLinear)
    .duration(1000)
    .attr("height", (d) => height - y(d.Contributors));
});

d3.select(".title")
  .transition()
  .ease(d3.easeLinear)
  .delay(1000)
  .duration(3000)
  .style("max-width", 100 + "rem");

d3.select(".image")
  .transition()
  .ease(d3.easeLinear)
  .delay(1500)
  .duration(1500)
  .style("transform", "translateX(0)")
  .style("transform", "rotate(180deg)")
  .style("opacity", 1);
