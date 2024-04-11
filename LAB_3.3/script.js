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