let original_x, original_y, original_width, original_height;
let svg, pref, chosen;

// const fileURL = "";
const fileURL = "https://sambelmonte.github.io/map-of-japan/";
d3.svg(`${fileURL}assets/japanmap.svg`).then((svgMap) => {
  d3.select("body").node().prepend(svgMap.documentElement);
  svg = d3.select("#JPMap");
  const {
    x,
    y,
    width,
    height
  } = document.getElementById("JP").getBBox();
  original_x = x;
  original_y = y;
  original_width = width;
  original_height = height;
  svg.on("click", reset);
  pref = d3.selectAll(".prefecture")
    .on("click", clicked);
  prefColor();
  reset();
});


function reset(event) {
  d3.selectAll(".pref-shape").attr("class", "pref-shape");
  d3.selectAll(".text-eng").attr("class", "text text-eng").raise();
  d3.selectAll(".text-jpn").attr("class", "text text-jpn").raise();
  d3.select("#JP-Lines").attr("class", "").raise();
  chosen = null;
  // prov.classed("selectedlgu", false).classed("lgu", true);
  // provColor();
  // d3.selectAll(".full-lgu").attr('fill', "auto").classed("selectedlgu", false).raise();
  // d3.selectAll(".full-province").attr("display", "none");
  // d3.selectAll(".lgu-city").raise();
  // d3.selectAll(".text").attr("display", "block").classed("text-not-chosen", false).raise();
  // d3.selectAll(".municipality").attr("class", "municipality");
  // if (!event && chosen && chosen !== "") {
  //   show(chosen.provCode, chosen.code);
  // } else {
    // chosen = null;
    // setLabels("","PHILIPPINES","", PHDATA);
    svg.transition()
      .duration(750)
      .attr("viewBox", [original_x, original_y, original_width, original_height]);
  // }
}

function clicked(event) {
  event.stopPropagation();
  const prefId = event.target.parentNode.id.slice(0,5);
  if (chosen === prefId) {
    reset();
  } else {
  chosen = prefId;
    show(prefId);
  }
}

function show(prefId) {
  console.log(prefId);
  const {
    x,
    y,
    width,
    height
  } = document.getElementById(`${prefId}-shape`).getBBox();
  d3.selectAll(".pref-shape").attr("class", "pref-shape");
  d3.selectAll(".text-eng").attr("class", "text text-eng").raise();
  d3.selectAll(".text-jpn").attr("class", "text text-jpn").raise();
  d3.select("#JP-Lines").attr("class", "hide-lines");
  svg.transition().duration(750).attr("viewBox", [x-75, y-75, width+150, height+150]);
  d3.select("#"+prefId).raise();
  d3.select("#"+prefId).selectChild(".pref-shape").attr("class", "pref-shape selectedpref").raise();
  d3.select("#"+prefId).selectChild(".text-eng").attr("class", "text text-eng hide-text");
  d3.select("#"+prefId).selectChild(".text-jpn").attr("class", "text text-jpn hide-text");
}

const colors = {
  pref: ['#FC7E29', '#AF5315', '#E97000', '#C06500', '#E57325', '#C67317', '#CB802C', '#B33E00', '#D08C3F', '#D06922'],
}

function prefColor(){
  pref.each((a, b, c) => {
    const pId = c[b].id;
    const pdata = d3.select(`#${pId}`);
    pdata.attr('fill', colors.pref[b % 10]);
  }); 
}