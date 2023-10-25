const addButton = document.getElementById("add-course-button");
const calculateButton = document.getElementById("calculate-button");
const tableBody = document.getElementById("table-body");
const estimatedCgpaTable = document.getElementById("estimated-cgpa-table");
const totalCreditPointsCell = document.getElementById("total-credit-points");
const totalUnitsCell = document.getElementById("total-units");
const estimatedCgpaCell = document.getElementById("estimated-cgpa");

const addCourseModal = document.getElementById("add-course-modal");
const editCourseModal = document.getElementById("edit-course-modal");
const noCourseMessage = document.getElementById("no-course-message");

addButton.onclick = () => {
    addCourseModal.style.display = "block";
}

calculateButton.addEventListener("click", calculateEstimatedCgpa);

document.getElementById("edit-course-modal-close-btn").onclick = () => {
    editCourseModal.style.display = "none";
}

document.getElementById("add-course-modal-close-btn").onclick = () => {
    addCourseModal.style.display = "none";
}

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

const addCourseForm = document.getElementById("add-course-modal-form");

addCourseForm.onsubmit = (event) => {
    event.preventDefault();

    noCourseMessage.style.display = "none";

    const id = tableBody.children.length + 1;

    const newRow = document.createElement("tr");
    newRow.id = `table-row-${id}`;

    const newNoCell = document.createElement("td");
    newNoCell.textContent = id;

    const newCourseCell = document.createElement("td");
    const courseInput = document.createElement("input");
    courseInput.type = "text";
    courseInput.value = document.getElementById("add-course-modal-course-input").value;
    courseInput.classList.add("table-input");
    newCourseCell.appendChild(courseInput);

    const newUnitCell = document.createElement("td");
    newUnitCell.classList.add("desktop-only")
    const unitInput = document.createElement("input");
    unitInput.type = "number";
    unitInput.value = document.getElementById("add-course-modal-unit-input").value;
    unitInput.classList.add("table-input");
    unitInput.addEventListener("input", calculateCreditPoints);
    newUnitCell.appendChild(unitInput);

    const newStatusCell = document.createElement("td");
    newStatusCell.classList.add("desktop-only")
    const statusInput = document.createElement("input");
    statusInput.type = "text";
    statusInput.value = document.getElementById("add-course-modal-status-input").value;
    statusInput.classList.add("table-input");
    newStatusCell.appendChild(statusInput);

    const newGpCell = document.createElement("td");
    newGpCell.classList.add("desktop-only")
    const gpInput = document.createElement("input");
    gpInput.type = "number";
    gpInput.value = document.getElementById("add-course-modal-gp-input").value;
    gpInput.classList.add("table-input");
    gpInput.addEventListener("input", calculateCreditPoints);
    newGpCell.appendChild(gpInput);

    const newCpCell = document.createElement("td");
    newCpCell.classList.add("desktop-only")
    newCpCell.classList.add("table-input");

    const unit = parseFloat(unitInput.value);
    const gp = parseFloat(gpInput.value);
    const creditPoints = unit * gp;
    if (!isNaN(creditPoints)) {
        newCpCell.textContent = creditPoints;
    }

    const editCell = document.createElement("td");
    editCell.classList.add("mobile-only")

    editCell.textContent = "Edit";
    editCell.style.cursor = "pointer";
    editCell.onclick = () => {
        editCourseModal.style.display = "block";

        document.getElementById("edit-course-modal-id-value").textContent = document.querySelector(`#table-row-${id}`).querySelector('td:nth-child(1)').textContent;

        document.getElementById("edit-course-modal-course-input").value = document.querySelector(`#table-row-${id}`).querySelector('td:nth-child(2) input').value;

        document.getElementById("edit-course-modal-unit-input").value = document.querySelector(`#table-row-${id}`).querySelector('td:nth-child(3) input').value;
        document.getElementById("edit-course-modal-unit-input").addEventListener("input", (event) => {
            const gp = parseFloat(document.getElementById("edit-course-modal-gp-input").value);
            const unit = parseFloat(event.target.value);

            const creditPoints = unit * gp;
            if (!isNaN(creditPoints)) {
                document.getElementById("edit-course-modal-credit-point-value").textContent = creditPoints;
            }
        })

        document.getElementById("edit-course-modal-status-input").value = document.querySelector(`#table-row-${id}`).querySelector('td:nth-child(4) input').value;

        document.getElementById("edit-course-modal-gp-input").value = document.querySelector(`#table-row-${id}`).querySelector('td:nth-child(5) input').value;
        document.getElementById("edit-course-modal-gp-input").addEventListener("input", (event) => {
            const unit = parseFloat(document.getElementById("edit-course-modal-unit-input").value);
            const gp = parseFloat(event.target.value);

            const creditPoints = unit * gp;
            if (!isNaN(creditPoints)) {
                document.getElementById("edit-course-modal-credit-point-value").textContent = creditPoints;
            }
        })

        document.getElementById("edit-course-modal-credit-point-value").textContent = document.querySelector(`#table-row-${id}`).querySelector('td:nth-child(6)').textContent;
    }

    newRow.appendChild(newNoCell);
    newRow.appendChild(newCourseCell);
    newRow.appendChild(newUnitCell);
    newRow.appendChild(newStatusCell);
    newRow.appendChild(newGpCell);
    newRow.appendChild(newCpCell);
    newRow.appendChild(editCell);

    tableBody.appendChild(newRow);
    addCourseModal.style.display = "none";

    document.getElementById("add-course-modal-course-input").value = "";
    document.getElementById("add-course-modal-unit-input").value = ""
    document.getElementById("add-course-modal-status-input").value = ""
    document.getElementById("add-course-modal-gp-input").value = ""
}

editCourseModal.onsubmit = (event) => {
    event.preventDefault();

    const id = document.getElementById("edit-course-modal-id-value").textContent;

    document.querySelector(`#table-row-${id}`).querySelector('td:nth-child(2) input').value = document.getElementById("edit-course-modal-course-input").value;
    document.querySelector(`#table-row-${id}`).querySelector('td:nth-child(3) input').value = document.getElementById("edit-course-modal-unit-input").value;
    document.querySelector(`#table-row-${id}`).querySelector('td:nth-child(4) input').value = document.getElementById("edit-course-modal-status-input").value;
    document.querySelector(`#table-row-${id}`).querySelector('td:nth-child(5) input').value = document.getElementById("edit-course-modal-gp-input").value;
    document.querySelector(`#table-row-${id}`).querySelector('td:nth-child(6)').textContent = document.getElementById("edit-course-modal-credit-point-value").textContent;

    editCourseModal.style.display = "none";
}