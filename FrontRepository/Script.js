const students = [];
const table = document.getElementById("studentsTable");
const tableBody = table.querySelector("tbody");
const form = document.getElementById("studentForm");
const averageDiv = document.getElementById("average");

let editIndex = -1; // Variable para almacenar el índice del estudiante que se está editando

document.getElementById("studentForm").addEventListener("submit", function(e) {
  e.preventDefault(); 

  const firstName = document.getElementById("name").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const grade = parseFloat(document.getElementById("grade").value);

  if (!firstName || !lastName || isNaN(grade) || grade < 1 || grade > 7) {
    alert("Error al ingresar datos. Verifique las calificaciones.");
    return;
  }

  const student = {
    firstName: firstName,
    lastName: lastName,
    grade: grade
  };

  if (editIndex === -1) {
    students.push(student);  // Si no estamos editando, agregar el estudiante
  } else {
    students[editIndex] = student;  // Si estamos editando, actualizamos el estudiante
    editIndex = -1;  // Resetear la variable de edición
  }

  actualizarTabla();
  calcularPromedio();
  this.reset();
});

tableBody.addEventListener("click", function (e) {
  if (e.target.classList.contains("eliminar-btn")) {
    const index = parseInt(e.target.getAttribute("data-index"));
    students.splice(index, 1);
    actualizarTabla();
    calcularPromedio();
  } else if (e.target.classList.contains("editar-btn")) {
    const index = parseInt(e.target.getAttribute("data-index"));
    editarEstudiante(index);
  }
});

function addStudentToTable(student, index) {
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${student.firstName}</td>
    <td>${student.lastName}</td>
    <td>${student.grade}</td>
    <td>
      <button class="btn btn-warning btn-sm editar-btn" data-index="${index}">
        ✏️
      </button>
      <button class="btn btn-danger btn-sm eliminar-btn" data-index="${index}">
        🗑️
      </button>
    </td>
  `;
  tableBody.appendChild(row);
}

function editarEstudiante(index) {
  const student = students[index];
  
  // Llenar el formulario con los datos del estudiante
  document.getElementById("name").value = student.firstName;
  document.getElementById("lastName").value = student.lastName;
  document.getElementById("grade").value = student.grade;

  // Establecer el índice de edición
  editIndex = index;
}

function calcularPromedio() {
  if (students.length === 0) {
    averageDiv.textContent = "0.00";
    return;
  }

  const suma = students.reduce((acc, student) => acc + student.grade, 0);
  const promedio = suma / students.length;

  averageDiv.textContent = `${promedio.toFixed(2)}`;
}

function actualizarTabla() {
  tableBody.innerHTML = "";

  students.forEach((student, index) => {
    addStudentToTable(student, index);
  });
}

