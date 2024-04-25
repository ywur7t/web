let createTable = (data, idTable) => {
    let table = document.getElementById(idTable);
    var tr = document.createElement("tr");
  
    for (key in data[0]) {
      let th = document.createElement("th");
      th.innerHTML = key;
      tr.append(th);
    }
    table.append(tr);
  
    data.forEach((item) => {
      tr = document.createElement("tr");
  
      for (value in item) {
        let td = document.createElement("td");
        td.innerHTML = item[value];
        tr.append(td);
      }
  
      table.append(tr);
    });
  };
document.addEventListener("DOMContentLoaded", function () {
  createTable(Tree_Array, "list");
  setSortSelects(Tree_Array[0], document.getElementById("sort"));

  let searchButton = document.getElementById("search");
  searchButton.addEventListener("click", function () {
      let dataForm = document.getElementById("filter");
      filterTable(Tree_Array, "list", dataForm);
  });

  let clearButton = document.getElementById("clear");
  clearButton.addEventListener("click", function(){clearFilter()});

  //ChangeState(document.getElementById("graph_form"))

  


  let SortButton = document.getElementById("Sort_btn");
  SortButton.addEventListener("click", function () {
    let dataForm = document.getElementById("sort");
    sortTable("list",dataForm)
  });

  let First_Set = document.getElementById("fieldsFirst");
  First_Set.addEventListener("change", function () {
    changeNextSelect("fieldsSecond", First_Set);
  });
  let Second_Set = document.getElementById("fieldsSecond");
  Second_Set.addEventListener("change", function () {
    changeNextSelect("fieldsThird", Second_Set);
  });

  let clearsort = document.getElementById("Clear_Sort_btnf")
  clearsort.addEventListener("click", function(){
    resetSort("list")
    clearTable(tableid);
    createTable(Tree_Array, tableid);
  })



});
let dataFilter = (dataForm) => {
  let dictFilter = {};
  for (let j = 0; j < dataForm.elements.length; j++) {
    let item = dataForm.elements[j];
    let valInput = item.value;

    if (item.type == "text") {
      valInput = valInput.toLowerCase();
    } else if (item.type == "number") {
      if (valInput !== "") {
        valInput = parseFloat(valInput);
      } else {
        if (item.id.includes("From")) {
          valInput = Number.NEGATIVE_INFINITY;
        } else if (item.id.includes("To")) {
          valInput = Number.POSITIVE_INFINITY;
        }
      }
    }
    dictFilter[item.id] = valInput;
  }

  return dictFilter;
};
let filterTable = (data, idTable, dataForm) => {
  
  let datafilter = dataFilter(dataForm);
  let tableFilter = data.filter((item) => {
    let result = true;
    for (let key in item) {
      let val = item[key];

      if (typeof val == "string") {
        if(key in correspond){
          val = item[key].toLowerCase();
          result &&= val.indexOf(datafilter[correspond[key]]) != -1;
        }
      } else if (typeof val == "number") {
        if(key in correspond)
          result &&= datafilter[correspond[key][0]] <= val && val <= datafilter[correspond[key][1]];
      } 
    }
    return result;
  });
  
  clearTable(idTable);
  createTable(tableFilter, idTable);
};
let clearFilter = () => {
  document.getElementById("filter").reset();
  clearTable("list");
  createTable(Tree_Array, "list");
};
function clearTable(idTable) {
  let table = document.getElementById(idTable);
  while (table.rows.length > 0) {
    table.deleteRow(0);
  }
}
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
let createOption = (str, val) => {
  let item = document.createElement("option");
  item.text = str;
  item.value = val;
  return item;
};
// формирование полей со списком из заголовков таблицы
// параметры – массив из заголовков таблицы и элемент select
let setSortSelect = (head, sortSelect) => {
  // создаем OPTION Нет и добавляем ее в SELECT
  sortSelect.append(createOption("Нет", 0));
  // перебираем все ключи переданного элемента массива данных
  for (let i in head) {
    // создаем OPTION из очередного ключа и добавляем в SELECT
    // значение атрибута VAL увеличиваем на 1, так как значение 0 имеет опция Нет
    sortSelect.append(createOption(head[i], Number(i) + 1));
  }
};
// формируем поля со списком для многоуровневой сортировки
let setSortSelects = (data, dataForm) => {
  let head = Object.keys(data);
  //document.write()
  let allSelect = dataForm.getElementsByTagName("select");
  for (let j = 0; j < allSelect.length; j++) {
    setSortSelect(head, allSelect[j]);
    if (j != 0) {
      // Если это не первый select, делаем его неизменяемым
      allSelect[j].setAttribute("disabled", "disabled");
    }
  }
};

// настраиваем поле для следующего уровня сортировки
let changeNextSelect = (nextSelectId, curSelect) => {

  let nextSelect = document.getElementById(nextSelectId);

  if(curSelect.value == 0 ) {
    let allselect = document.getElementsByTagName('select')
    let foundCurrent = false;

    for (let i = 0; i < allselect.length; i++) {
      if (foundCurrent) {
        allselect[i].disabled = true;
      } else if (allselect[i] === curSelect) {
        foundCurrent = true;
      }
    }
    //nextSelect.disabled = true;
    //document.write(nextSelect.disabled)
    //document.getElementById("fieldsThird").disabled = true;
  }
  else{

  

  nextSelect.disabled = false;
  // в следующем SELECT выводим те же option, что и в текущем
  nextSelect.innerHTML = curSelect.innerHTML;
  
  // удаляем в следующем SELECT уже выбранную в текущем опцию
  // если это не первая опция - отсутствие сортировки

  let selectedOption = curSelect.options[curSelect.selectedIndex];
    
  // Удаляем выбранную опцию из следующего списка
  for (var i = 0; i < nextSelect.options.length; i++) {
      if (nextSelect.options[i].value === selectedOption.value) {
          nextSelect.remove(i);
          break;
      }
  }


  }









  // if (curSelect.value != 0) {
  //   nextSelect.remove(curSelect.value);
  // } else {
  //   nextSelect.disabled = true;
  // }
  // if(curSelect.value==2)document.write(nextSelect.innerHTML)
};

/*формируем массив для сортировки по уровням вида: 
[ {column: номер столбца, order: порядок сортировки (true по убыванию, false по возрастанию) }, 
  {column: номер столбца, order: порядок сортировки } ] */
let createSortArr = (data) => {
  
  let sortArr = [];
  
  let sortSelects = data.getElementsByTagName("select");
  
  for (let i = 0; i < sortSelects.length; i++) {
    // получаем номер выбранной опции
    let keySort = sortSelects[i].value;
    // в случае, если выбрана опция Нет, заканчиваем формировать массив
    if (keySort == 0) {
      break;
    }
    // получаем номер значение флажка для порядка сортировки
    // имя флажка сформировано как имя поля SELECT и слова Desc
    let desc = document.getElementById(sortSelects[i].id + "Desc").checked;
    if(desc==true) sortArr.push({ column: keySort - 1, order: true });
    else sortArr.push({ column: keySort - 1, order: false });
  }
  
  return sortArr;
};

let sortTable = (idTable, data) => {




  // формируем управляющий массив для сортировки
  let sortArr = createSortArr(data);
  //sortArr.forEach((item) => {document.write()})
  // сортировать таблицу не нужно, во всех полях выбрана опция Нет
  if (sortArr.length === 0) {
    return false;
  }
  
  //находим нужную таблицу
  let table = document.getElementById(idTable);
  // преобразуем строки таблицы в массив
  let rowData = Array.from(table.rows);
  // удаляем элемент с заголовками таблицы
  rowData.shift();

  //сортируем данные по возрастанию по всем уровням сортировки
  rowData.sort((first, second) => {

    // let First_Checkbox = (document.getElementById('fieldsFirstDesc').checked)? -1 : 1
    // let Second_Checkbox = (document.getElementById('fieldsSecondDesc').checked)? -1 : 1
    // let Third_Checkbox = (document.getElementById('fieldsThirdDesc').checked)? -1 : 1
    
    for (let i in sortArr) {
      let key = sortArr[i].column; 
      let order = sortArr[i].order ? -1 : 1;

      if (first.cells[key].innerHTML > second.cells[key].innerHTML) return 1 * order
      else if (first.cells[key].innerHTML < second.cells[key].innerHTML) return -1 * order
      
    }
    return 0;
  });
  //выводим отсортированную таблицу на страницу
  table.innerHTML = table.rows[0].innerHTML;
  rowData.forEach((item) => {
    
    table.append(item);
  });
};


let resetSort = (tableid) => {
  //document.write(`<h3>${tableid}</h3>`)
  let table = document.getElementById(tableid)
  document.getElementById("sort").reset();
  document.getElementById("fieldsSecond").disabled = true;


  document.getElementById("fieldsThird").disabled = true;
  
  //setSortSelects(buildings[0], document.getElementById("sort"));
}


//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
function What_is(data){
  if(data.oy[0].checked ) return 0
  if(data.oy[1].checked ) return 0
  if(data.oy[2].checked ) return 1
  if(data.oy[3].checked ) return 1
  if(data.oy[4].checked ) return 2
  if(data.oy[5].checked ) return 2

}

// d3.select("input#showTable").on("click", function () {
//   let buttonValue = d3.select(this);
//   if (buttonValue.property("value") === "Показать таблицу") {
//     buttonValue.attr("value", "Скрыть таблицу");
//     // создание таблицы
//     let table = d3.select("div.table").select("table");
//     // сформировать таблицу на основе массива buildings;
//     // стр. 11-12 теоретического материала ...
//     // создание строк таблицы (столько, сколько элементов в массиве books)
//     let rows = table
//       .select("tbody")
//       .selectAll("tr")
//       .data(Tree_Array)
//       .enter()
//       .append("tr")
//       .style("display", "");
//     // создание ячеек каждой строки на основе каждого элемента массива books
//     let cells = rows
//       .selectAll("td")
//       .data((d) => Object.values(d))
//       .enter()
//       .append("td")
//       .text((d) => d);
//     // создание шапки таблицы
//     let head = table
//       .select("thead")
//       .selectAll("th")
//       .data((d) => Object.keys(Tree_Array[0]))
//       .enter()
//       .append("td")
//       .text((d) => d);
//   } else {
//     buttonValue.attr("value", "Показать таблицу");
//     d3.select("div.table").select("table").selectAll("tr").remove();
//     d3.select("div.table").select("table").selectAll("td").remove();
//   }
// });

function createArrGraph(data, key,number) {
  let what = number==0?'price':number==1?'ndvi':'age'
  groupObj = d3.group(data, (d) => d[key]);
  
  return Array.from(groupObj, ([labelX, values]) => ({
    labelX,
    values: d3.extent(values, d => d[what])
    
  })); 
}

const marginX = 50;
const marginY = 50;
const height = 400;
const width = 800;
let svg = d3.select("svg").attr("height", height).attr("width", width);

function drawGraph(data) {

  // значения по оси ОХ
  const keyX = data.ox.value;
  
  // значения по оси ОУ
  const number = What_is(data)
  const isMin = data.oy[0].checked || data.oy[3].checked || data.oy[4].checked
  const isMax = data.oy[1].checked || data.oy[2].checked || data.oy[5].checked

  if (!isMin && !isMax) 
    alert("OY выбери дэбил");
  else {
    // создаем массив для построения графика
    const arrGraph = createArrGraph(Tree_Array, keyX,number);

    svg.selectAll("*").remove();
    // создаем шкалы преобразования и выводим оси
    const [scX, scY]  = createAxis(arrGraph, isMin, isMax);
    // рисуем графики
    
    if (isMax) {
      // alert('fweomfwe')
      createChart(arrGraph, scX, scY, 1, "red");
    }
    if (isMin) {
      createChart(arrGraph, scX, scY, 0, "blue");
    }
  }
}

function createAxis(data, isFirst, isSecond) {
  // в зависимости от выбранных пользователем данных по OY
  // находим интервал значений по оси OY

  let firstRange = d3.extent(data.map((d) => d.values[0]));
  let secondRange = d3.extent(data.map((d) => d.values[1]));
  // alert(secondRange)
  let min = firstRange[0];
  let max = secondRange[1];

  if (!isFirst && isSecond) {
    min = secondRange[0];
    max = secondRange[1];
  } else if (isFirst && !isSecond) {
    min = firstRange[0];
    max = firstRange[1];
    // alert(`${min}, ${max}`)
  }
  // функция интерполяции значений на оси
  let scaleX = d3
    .scaleBand()
    .domain(data.map((d) => d.labelX))
    .range([0, width - 2 * marginX]);
  let scaleY = d3
    .scaleLinear()
    .domain([min * 0.85, max * 1.1])
    .range([height - 2 * marginY, 0]);
  // создание осей
  let axisX = d3.axisBottom(scaleX);
  // горизонтальная
  let axisY = d3.axisLeft(scaleY);
  // вертикальная
  // отрисовка осей в SVG-элементе
  svg
    .append("g")
    .attr("transform", `translate(${marginX}, ${height - marginY})`)
    .call(axisX)
    .selectAll("text")
    // подписи на оси - наклонные
    .style("text-anchor", "end")
    .attr("dx", "-.8em")
    .attr("dy", ".15em")
    .attr("transform", (d) => "rotate(-45)");
  svg
    .append("g")

    .attr("transform", `translate(${marginX}, ${marginY})`)
    .call(axisY);
  return [scaleX, scaleY];
}

function createChart(data, scaleX, scaleY, index, color) {
  const r = 4;
  // чтобы точки не накладывались, сдвинем их по вертикали
  // let ident = index == 0 ? -r / 2 : r / 2;
  // let select_option = d3.select('#select_type').property('value');
  // if(select_option == 1)
    // svg.selectAll(".dot").data(data).enter().append("circle")
    //     .attr("r", r)
    //     .attr("cx", (d) => scaleX(d.labelX) + scaleX.bandwidth() / 2)
    //     .attr("cy", (d) => scaleY(d.values[index]) + ident)
    //     .attr("transform", `translate(${marginX}, ${marginY})`)
    //     .style("fill", color);
  // else
    svg.selectAll(".dot").data(data).enter().append("rect").attr("class", "rect")

        .attr("x", d => scaleX(d.labelX))
        .attr("y", d => scaleY(d.values[index])-marginY)

        .attr("width", scaleX.bandwidth()-5)
        .attr("height", d => height - scaleY(d.values[index]) - marginY)

        .attr("transform", `translate(${marginX}, ${marginY})`)
        .style("fill", color);
}


function changeState(form, value){
  // alert(form.oy[0].value)
  for(let i=0;i<6;++i){
    
    if(!form.oy[i].value.includes(value)) form.oy[i].checked=false
  }
}