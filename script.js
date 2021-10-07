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
  let elements = document.getElementById("elementsCount").value;
  let table = document.createElement("table");

  // Adding Index
  let helperRow = document.createElement("tr");
  let cell = document.createElement("td");
  cell.classList.add("helperValues");
  helperRow.appendChild(cell);
  for (let i = 0; i < elements; i++) {
    let cell = document.createElement("td");
    cell.classList.add("helperValues");
    cell.innerText = i;
    helperRow.appendChild(cell);
  }
  table.appendChild(helperRow);

  for (let i = 0; i < elements; i++) {
    let row = document.createElement("tr");

    // Adding the helper
    let cell = document.createElement("td");
    cell.classList.add("helperValues");
    cell.innerText = i;
    row.appendChild(cell);

    for (let j = 0; j < elements; j++) {
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

const getAnswer = () => {
  let elements = document.getElementById("elementsCount").value;
  if(elements < 1) return;
  
  console.log(elements);
  let answerString = "Transitive Closure: ";
  for (let k = 0; k < elements; k++) {
    for (let i = 0; i < elements; i++) {
      if (getCellValue(k, i) == 1) {
        for (let j = 0; j < elements; j++) {
          if (getCellValue(j, k) == 1 && getCellValue(i, j) != 1) {
            setCellValue(i, j, 1);
            answerString += "(" + i + "," + j + ") ";
          }
        }
      }
    }
  }

  document.getElementById("answer").innerText = answerString;
};

const tableContainer = document.getElementById("tableContainer");

document
  .getElementById("elementsCount")
  .addEventListener("change", rerenderWindow);

document.getElementById("getAnswerBtn").addEventListener("click", getAnswer);
document.getElementById("refreshBtn").addEventListener("click", refreshTable);

rerenderWindow();
