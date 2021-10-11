const getCellId = (row, col) => {
  return row + "-" + col;
};

const getCellValue = (row, col) => {
  return document.getElementById(getCellId(row, col)).innerText;
};

const setCellValue = (row, col, val) => {
  document.getElementById(getCellId(row, col)).innerText = val;
};

const refreshTable = () => {
  rerenderWindow();
  document.getElementById("answer").innerText = "";
};

const rerenderWindow = () => {
  let elementsCount = document.getElementById("elementsCount").value;
  let table = document.createElement("table");

  // Adding Index
  let helperRow = document.createElement("tr");
  let cell = document.createElement("td");
  cell.classList.add("helperValues");
  helperRow.appendChild(cell);
  for (let i = 0; i < elementsCount; i++) {
    let cell = document.createElement("td");
    cell.classList.add("helperValues");
    cell.innerText = i+1;
    helperRow.appendChild(cell);
  }
  table.appendChild(helperRow);

  for (let i = 0; i < elementsCount; i++) {
    let row = document.createElement("tr");

    // Adding the helper
    let cell = document.createElement("td");
    cell.classList.add("helperValues");
    cell.innerText = i+1;
    row.appendChild(cell);

    for (let j = 0; j < elementsCount; j++) {
      // Creating cell and assigning default values
      let cols = document.createElement("td");
      cols.id = getCellId(i, j);
      cols.innerText = 0;

      //  Adding event listener to every cell
      cols.addEventListener("click", (e) => {
        e.target.innerText = e.target.innerText == 0 ? 1 : 0;
      });

      // Appending the cell to the row
      row.appendChild(cols);
    }
    // Adding row to the table
    table.appendChild(row);
  }

  tableContainer.innerHTML = "";
  tableContainer.appendChild(table);
};

const getTransitiveClouser = () => {
  let elementsCount = document.getElementById("elementsCount").value;
  if (elementsCount < 1) return;

  console.log(elementsCount);
  let answerString = "Transitive Closure: ";
  for (let k = 0; k < elementsCount; k++) {
    for (let i = 0; i < elementsCount; i++) {
      if (getCellValue(i, k) == 1) {
        for (let j = 0; j < elementsCount; j++) {
          if (getCellValue(k, j) == 1 && getCellValue(i, j) != 1) {
            setCellValue(i, j, 1);
            answerString += "(" + i + "," + j + ") ";
          }
        }
      }
    }
  }

  document.getElementById("answer").innerText = answerString;
};

const getReflexiveClouser = () => {
  let elementsCount = document.getElementById("elementsCount").value;
  if (elementsCount < 1) return;

  let answerString = "Reflexive Closure: ";

  for (let i = 0; i < elementsCount; i++) {
    if (getCellValue(i, i) != 1) {
      setCellValue(i, i, 1);
      answerString += "(" + i + "," + i + ") ";
    }
  }

  document.getElementById("answer").innerText = answerString;
};

const getSymmetricClouser = () => {
  let elementsCount = document.getElementById("elementsCount").value;
  if (elementsCount < 1) return;

  let answerString = "Symmetric Closure: ";

  for (let i = 0; i < elementsCount; i++) {
    for (let j = 0; j < elementsCount; j++) {
      if (i != j && getCellValue(i, j) == 1 && getCellValue(j, i) != 1) {
        setCellValue(j, i, 1);
        answerString += "(" + j + "," + i + ") ";
      }
    }
  }

  document.getElementById("answer").innerText = answerString;
};

const getAnswer = () => {
  let selectedChoice = document.getElementById("choice");
  let choice = selectedChoice.options[selectedChoice.selectedIndex].value;

  console.log(choice);

  switch (choice) {
    case "transitive":
      getTransitiveClouser();
      break;
    case "reflexive":
      getReflexiveClouser();
      break;
    case "symmetric":
      getSymmetricClouser();
      break;
    default:
      console.log("Unkown Choice!");
  }
};

const tableContainer = document.getElementById("tableContainer");

document
  .getElementById("elementsCount")
  .addEventListener("change", rerenderWindow);

document.getElementById("getAnswerBtn").addEventListener("click", getAnswer);
document.getElementById("refreshBtn").addEventListener("click", refreshTable);

rerenderWindow();
