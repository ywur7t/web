function ShowInputForm() {
  let choosen_form = document.getElementById("input_trigon").checked
    ? document.getElementById("input_trigon")
    : document.getElementById("input_algebra").checked
    ? document.getElementById("input_algebra")
    : 0;

  if (choosen_form == 0) SelectRed(document.getElementById("form_list"));
  else {
    ReturnBlack(document.getElementById("form_list"));
    let div_tr = document.getElementById("trigonometric");
    let div_al = document.getElementById("algebra");
    let div_b = document.getElementById("buttons");
    let text_area = document.getElementById("textarea");

    if (choosen_form.id == "input_trigon") {
      div_tr.style.display = "grid";
      div_al.style.display = "none";

      div_b.style.display = "block";
      text_area.style.display = "block";
      Clear_All();
    } else {
      div_tr.style.display = "none";
      div_al.style.display = "grid";

      div_b.style.display = "block";
      text_area.style.display = "block";
      Clear_All();
    }
  }
}

function Clear_All() {
  let input_array = document.querySelectorAll('input[type="number"]');
  input_array.forEach((item) => {
    item.value = "";
  });
  document.getElementsByTagName(textarea).value = "";
}

function SelectRed(...item) {
  for (let i = 0; i < item.length; i++) {
    item[i].style.color = "red";
  }
}
function ReturnBlack(...item) {
  for (let i = 0; i < item.length; i++) {
    item[i].style.color = "black";
  }
}

function ErrorArea(item) {
  item.value = "Missing values";
}
function Compute_Result() {
  let choosen_form = document.getElementById("input_trigon").checked
    ? document.getElementById("input_trigon")
    : document.getElementById("input_algebra").checked
    ? document.getElementById("input_algebra")
    : 0;

  if (choosen_form == 0) SelectRed(document.getElementById("form_list"));
  else {
    if (choosen_form.id == "input_trigon") {
      let select_Element = document.getElementById("select_trigon");
      let selectedOptions = [];
      for (var i = 0; i < select_Element.options.length; i++) {
        let option = select_Element.options[i];
        if (option.selected) selectedOptions.push(option.value);
      }
      if (selectedOptions.length === 0)
        SelectRed(document.getElementById("select_trigon"));
      else {
        ReturnBlack(document.getElementById("select_trigon"));
        let fr = document.getElementById("fr").value;
        let fcos = document.getElementById("fcos").value;
        let fsin = document.getElementById("fsin").value;

        let sr = document.getElementById("sr").value;
        let scos = document.getElementById("scos").value;
        let ssin = document.getElementById("ssin").value;

        let textarea = document.getElementById("textarea");
        textarea.value = "";
        let a = 0,
          b = 0,
          r = 0;

        if (
          fr.length === 0 ||
          fcos.length === 0 ||
          fsin.length === 0 ||
          ssin.length === 0 ||
          scos.length === 0 ||
          sr.length === 0
        ) {
          ErrorArea(textarea);
        } else {
          selectedOptions.forEach((item) => {
            switch (item) {
              case "+":
                a =
                  Math.round(
                    (fr * Math.cos(fcos) + sr * Math.cos(scos)) * 100
                  ) / 100;
                b =
                  Math.round(
                    (fr * Math.sin(fsin) + sr * Math.sin(ssin)) * 100
                  ) / 100;
                if (b > 0) textarea.value += `сумма: ${a} + ${b} i\n`;
                else textarea.value += `сумма: ${a} + ${Math.abs(b)} i\n`;
                break;
              case "-":
                a =
                  Math.round(
                    (fr * Math.cos(fcos) - sr * Math.cos(scos)) * 100
                  ) / 100;
b =
                  Math.round(
                    (fr * Math.sin(fsin) - sr * Math.sin(ssin)) * 100
                  ) / 100                ;
                if (b > 0) textarea.value += `разность: ${a} - ${b} i\n`;
                else textarea.value += `разность: ${a} + ${Math.abs(b)} i\n`;
                break;
              case "*":
                r = fr * sr;
                a = fcos + scos;
                b = scos + ssin;
                textarea.value += `Произведение: ${r} * (cos(${a}) + i sin(${Math.abs(
                  b
                )}))\n`;
                break;
              case "/":
                if (sr != 0) r = fr / sr;
                else r = 0;
                a = fcos - scos;
                b = scos - ssin;
                textarea.value += `Частое: ${r} * (cos(${a}) + i sin(${Math.abs(
                  b
                )}))\n`;
                break;
            }
          });
        }
      }
    } else {
      let select_Element = document.getElementById("select_algebra");
      let selectedOptions = [];
      for (var i = 0; i < select_Element.options.length; i++) {
        let option = select_Element.options[i];
        if (option.selected) selectedOptions.push(option.value);
      }
      let fa = document.getElementById("fa").value;
      let fb = document.getElementById("fb").value;
      let sa = document.getElementById("sa").value;
      let sb = document.getElementById("sb").value;
      if (selectedOptions.length === 0)
        SelectRed(document.getElementById("select_algebra"));
      else {
        ReturnBlack(document.getElementById("select_algebra"));

        let textarea = document.getElementById("textarea");
        textarea.value = "";
        let a = 0,
          b = 0;
        if (
          fa.length === 0 ||
          sa.length === 0 ||
          sb.length === 0 ||
          sb.length === 0
        ) {
          ErrorArea(textarea);
        } else {
          fa = Number(document.getElementById("fa").value);
          fb = Number(document.getElementById("fb").value);
          sa = Number(document.getElementById("sa").value);
          sb = Number(document.getElementById("sb").value);
          selectedOptions.forEach((item) => {
            switch (item) {
              case "+":
                a = Math.round((sa + fa) * 100) / 100;
                b = Math.round((sb + fb) * 100) / 100;
                textarea.value += `сумма: ${a} + ${b} i\n`;
                break;
              case "-":
                a = Math.round((fa - sa) * 100) / 100;
                b = Math.round((fb - sb) * 100) / 100;
                if (b > 0) textarea.value += `разность: ${a} + ${b} i\n`;
                else textarea.value += `разность: ${a} - ${Math.abs(b)} i\n`;
                break;
              case "*":
                a = Math.round((fa * sa - sb * fb) * 100) / 100;
                b = Math.round((fa * sb + sa * fb) * 100) / 100;
                textarea.value += `Произведение: ${a} + ${b} i\n`;
                break;
              case "/":
                a =
                  Math.round(
                    ((fa * sa + fb * sb) / (sa * sa + sb * sb)) * 100
                  ) / 100;
                b =
                  Math.round(
                    ((sa * fb - fa * sb) / (sa * sa + sb * sb)) * 100
                  ) / 100;
                if(((sa * sa + sb * sb)==0 || (sa * sa + sb * sb)==0)) textarea.value += `Частое: Division 0 \n`;
                else textarea.value += `Частое: ${a} + ${b} i\n`;
                break;
            }
          });
        }
      }
    }
  }
}
