const inputs = document.querySelectorAll(".inp");
const bill_inp = document.querySelector("#bill");
const count_people = document.querySelector("#count-pepole");
const btn_tips = document.querySelectorAll(".btn-tip");

let resetBtn = document.querySelector("#reset");
let tip_amount = document.querySelector("#tip-amount");
let total = document.querySelector("#total");
inputs.forEach((el) => {
  el.addEventListener("focus", (e) => {
    el.parentElement.classList.add("focusInp");
    el.parentElement.parentElement.classList.remove("error");
  });
  el.addEventListener("blur", (e) => {
    el.parentElement.classList.remove("focusInp");
    finalCheck(el);
  });
});
let statment = {
  bill: 0,
  tip: 0,
  count: 0,
};
function setValue(el) {
  let val = el.value.trim();
  if (isNaN(val)) el.value = val.slice(0, val.length - 1);
  if (checkInputs(el)) {
    if (el.id == "bill") statment.bill = el.value.trim();
    else if (el.id == "count-pepole") statment.count = el.value.trim();
    else {
      btn_tips.forEach((el) => {
        el.classList.remove("activeBtn");
      });
      el.classList.add("activeBtn");
      statment.tip = el.value.trim();
    }
  }
  calculate();
}
function finalCheck(el) {
  let val = el.value.trim();
  if (val[val.length - 1] == ".") el.value = val.slice(0, val.length - 1);
  setValue(el);
}
function calculate() {
  if (statment.bill != 0 && statment.count != 0 && statment.tip != 0) {
    resetBtn.removeAttribute("disabled");

    let tipAmount = ((+statment.tip / 100) * +statment.bill) / +statment.count;
    tip_amount.textContent = tipAmount.toString().slice(0, 4);
    let _total = +statment.bill / +statment.count + +tipAmount;
    // let _total = +statment.bill - +tipAmount;

    total.textContent = _total.toString().slice(0, 5);
  } else resetBtn.setAttribute("disabled", true);
}
function resetValues() {
  statment.bill = 0;
  statment.tip = 0;
  statment.count = 0;
  inputs.forEach((el) => (el.value = null));
  btn_tips.forEach((el) => el.classList.remove("activeBtn"));
  total.textContent = "0.00";
  tip_amount.textContent = "0.00";
  resetBtn.setAttribute("disabled", true);
}

function checkInputs(...inputs) {
  let checkerBool = true;
  inputs.forEach((el) => {
    let val = +el.value.trim();

    if (val <= 0) {
      errorMessage(el, "can't be zero");
      return false;
    } else if (isNaN(val) || isEmpty(val)) return false;
    else el.parentElement.parentElement.classList.remove("error");
  });
  return checkerBool;
  function isEmpty(element) {
    if (element === "" || element === " " || element === null) return true;
    else return false;
  }
  function errorMessage(element, message) {
    element.parentElement.parentElement.classList.add("error");
    let errorMessage =
      element.parentElement.parentElement.querySelector(".errorMessage");
    errorMessage != undefined ? (errorMessage.textContent = message) : "";
  }
}
