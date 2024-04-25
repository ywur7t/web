document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("animation_btn")
    .addEventListener("click", function () {
      Picture_Draw(document.getElementById("setting"));
    });
    //ошибка с начальными координатами

  document.getElementById("clear_btn").addEventListener("click", function () {
    clear_ALL();
  });
});

let svg = d3.select("svg").attr("width", 600).attr("height", 600);
const r = 200;
function Primitive_Draw(X_pos, Y_pos) {
  let primitive = svg.append("g").style("stroke", "#000").style("stroke-width", 1).style("fill", "#000");
  primitive.append("circle").attr("cx", 0).attr("cy", 0).attr("r", 50).style("fill", "#000");
  primitive.append("circle").attr("cx", 0).attr("cy", 0).attr("r", 50).style("fill", "#fff");
  primitive.append("circle").attr("cx", 0).attr("cy", 0).attr("r", 48).style("fill", "#000");
  primitive.append("circle").attr("cx", 0).attr("cy", 0).attr("r", 47).style("fill", "#fff");
  primitive.append("circle").attr("cx", 0).attr("cy", 0).attr("r", 45).style("fill", "#00273B");
  primitive.append("line").style("stroke", "#fff").style("stroke-width", 1).attr("x1", -50).attr("y1", 0).attr("x2", 50).attr("y2", 0);
  primitive.append("line").style("stroke", "#fff").style("stroke-width", 1).attr("x1", 0).attr("y1", -50).attr("x2", 0).attr("y2", 50);
  primitive.append("circle").attr("cx", 0).attr("cy", 0).attr("r", 42).style("fill", "#fff");
  primitive.append("circle").attr("cx", 0).attr("cy", 0).attr("r", 40).style("fill", "#00273B");
  primitive.append("circle").attr("cx", 0).attr("cy", 0).attr("r", 35).style("fill", "#00273B").style("stroke", "#007EBF");
  primitive.append("circle").attr("cx", 0).attr("cy", 0).attr("r", 23).style("fill", "#00AAFF");
  primitive.append("circle").attr("cx", 0).attr("cy", 0).attr("r", 21.5).style("fill", "#00273B");
  primitive.append("circle").attr("cx", 0).attr("cy", 0).attr("r", 21).style("fill", "#fff");
  primitive.append("circle").attr("cx", 0).attr("cy", 0).attr("r", 19.5).style("fill", "#00273B");
  primitive.append("line").style("stroke", "#fff").style("stroke-width", 0.5).attr("x1", 10).attr("y1", -10).attr("x2", -10).attr("y2", 10);
  primitive.append("line").style("stroke", "#fff").style("stroke-width", 1).attr("x1", -50).attr("y1", -50).attr("x2", 50).attr("y2", 50);
  primitive.append("line").style("stroke", "#fff").style("stroke-width", 1).attr("x1", -42).attr("y1", 0).attr("x2", 42).attr("y2", 0);
  primitive.append("line").style("stroke", "#fff").style("stroke-width", 1).attr("x1", -42).attr("y1", 0).attr("x2", 0).attr("y2", -42);
  primitive.append("line").style("stroke", "#fff").style("stroke-width", 1).attr("x1", 0).attr("y1", -42).attr("x2", 42).attr("y2", 0);

  let arc = d3.arc().innerRadius(35).outerRadius(35);
  primitive.append("path").attr("d",arc({ startAngle: (Math.PI / 3) * 2, endAngle: (Math.PI / 3) * 4 })).style("stroke", "brown");
  primitive.attr("transform", `translate(${X_pos},${Y_pos})`);
  return primitive;
}

let Picture_Draw = (dataForm) => {

  let pict = Primitive_Draw(100, 300);
  let path = drawPath(300, 300);
  let speed_animation =
    dataForm.animation_time.value == ""
      ? 6000
      : parseFloat(dataForm.animation_time.value);

    
let degree = dataForm.rotate_checkbox.checked ? dataForm.rotate_degree.value : 0




  pict
    //.attr("transform", `translate(${300}, ${300}`)
    .transition().duration(speed_animation)
    .ease(d3.easeLinear)
     .attr("transform", `translate(${300},${300}) rotate(90)`)
    //.attr("transform",`translate(${300}, ${300})`);
    .attrTween("transform", translateAlong(path.node(),degree))
    
};

let clear_ALL = () => {
  svg.selectAll("*").remove();
};

function create_Path(x_pos, y_pos) {
  let data = [];

  for (let t = Math.PI; t <= Math.PI * 3; t += 0.1) {
    data.push({x: x_pos + r * Math.pow(Math.cos(t), 3),y: y_pos + r * Math.pow(Math.sin(t), 3),});
  }

  return data;
}
let drawPath = (x_pos, y_pos) => {
  const dataPoints = create_Path(x_pos, y_pos);
  const line = d3.line().x((d) => d.x).y((d) => d.y);
  const path = svg.append("path").attr("d", line(dataPoints)).attr("stroke", "black").attr("fill", "none");
  return path;
};

function translateAlong(path,degree) {
  const length = path.getTotalLength();
 let t0 = 0
  return function () {
    return function (t) {
      let { x, y } = path.getPointAtLength(t * length);
      // let p0 = path.getPointAtLength(t0 * length)
      // let p = path.getPointAtLength(t * l)
      let angle_radians = degree *180 / Math.PI
      // t0 = t
      // let centerX = p.x - 24
      // let centerY = p.y - 12
      // alert("translate(" + x + "," +y+ ")rotate(" + angle_radians + " 24" + " 12" +")")
       return `translate(${x},${y}) rotate(${angle_radians*t})`;
      //return "translate(" + centerX + "," + centerY + ")rotate(" + angle_radians + " 24" + " 12" +")";
    };//rotate(${angle_radians})
  };
}

