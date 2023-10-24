const addButton = document.getElementById("add-course-button");
const calculateButton = document.getElementById("calculate-button");
const tableBody = document.getElementById("table-body");
const estimatedCgpaTable = document.getElementById("estimated-cgpa-table");
const totalCreditPointsCell = document.getElementById("total-credit-points");
const totalUnitsCell = document.getElementById("total-units");
const estimatedCgpaCell = document.getElementById("estimated-cgpa");

addButton.addEventListener("click", () => {
    const newRow = document.createElement("tr");

    const newNoCell = document.createElement("td");
    newNoCell.textContent = tableBody.children.length + 1;

    const newCourseCell = document.createElement("td");
    const courseInput = document.createElement("input");
    courseInput.type = "text";
    courseInput.classList.add("table-input");
    newCourseCell.appendChild(courseInput);

    const newUnitCell = document.createElement("td");
    const unitInput = document.createElement("input");
    unitInput.type = "number";
    unitInput.classList.add("table-input");
    newUnitCell.appendChild(unitInput);

    const newStatusCell = document.createElement("td");
    const statusInput = document.createElement("input");
    statusInput.type = "text";
    statusInput.classList.add("table-input");
    newStatusCell.appendChild(statusInput);

    const newGpCell = document.createElement("td");
    const gpInput = document.createElement("input");
    gpInput.type = "number";
    gpInput.classList.add("table-input");
    gpInput.addEventListener("input", calculateCreditPoints);
    newGpCell.appendChild(gpInput);

    const newCpCell = document.createElement("td");
    newCpCell.classList.add("table-input");

    newRow.appendChild(newNoCell);
    newRow.appendChild(newCourseCell);
    newRow.appendChild(newUnitCell);
    newRow.appendChild(newStatusCell);
    newRow.appendChild(newGpCell);
    newRow.appendChild(newCpCell);

    tableBody.appendChild(newRow);
});

calculateButton.addEventListener("click", calculateEstimatedCgpa);

function calculateCreditPoints(event) {
    const gpInput = event.target;
    const row = gpInput.parentNode.parentNode;
    const unitInput = row.querySelector('td:nth-child(3) input');
    const newCpCell = row.querySelector('td:nth-child(6)');
    const unit = parseFloat(unitInput.value);
    const gp = parseFloat(gpInput.value);
    const creditPoints = unit * gp;
    if (!isNaN(creditPoints)) {
        newCpCell.textContent = creditPoints;
    }
}

function calculateEstimatedCgpa() {
    const rows = tableBody.children;
    let totalCreditPoints = 0;
    let totalUnits = 0;

    for (let i = 0; i < rows.length; i++) {
        const unitInput = rows[i].querySelector('td:nth-child(3) input');
        const gpInput = rows[i].querySelector('td:nth-child(5) input');
        const unit = parseFloat(unitInput.value) || 0;
        const gp = parseFloat(gpInput.value) || 0;

        totalCreditPoints += unit * gp;
        totalUnits += unit;
    }

    totalCreditPointsCell.textContent = totalCreditPoints;
    totalUnitsCell.textContent = totalUnits;

    if (totalUnits === 0) {
        estimatedCgpaCell.textContent = "0.0";
    } else {
        const estimatedCgpa = (totalCreditPoints / totalUnits).toFixed(2);
        estimatedCgpaCell.textContent = estimatedCgpa;
    }
}
