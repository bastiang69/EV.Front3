const students = [];
const table = document.getElementById("studentsTable");
const tableBody = table.querySelector("tbody");
const form = document.getElementById("studentForm");
const averageDiv = document.getElementById("average");

let editIndex = -1;

document.getElementById("studentForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const firstName = document.getElementById("name").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const grade = parseFloat(document.getElementById("grade").value);

  if (!firstName || !lastName || isNaN(grade) || grade < 1 || grade > 7) {
    alert("Error al ingresar datos. Verifique las calificaciones.");
    return;
  }

  const student = {
    firstName,
    lastName,
    grade
  };

  if (editIndex === -1) {
    students.push(student);
  } else {
    students[editIndex] = student;
    editIndex = -1;
  }

  actualizarTabla();
  calcularEstadisticas();
  form.reset();
});

tableBody.addEventListener("click", function (e) {
  if (e.target.classList.contains("eliminar-btn")) {
    const index = parseInt(e.target.getAttribute("data-index"));
    students.splice(index, 1);
    actualizarTabla();
    calcularEstadisticas();
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
    <td>${student.grade.toFixed(1)}</td>
    <td>
      <button class="btn btn-warning btn-sm editar-btn" data-index="${index}">
        ✏️ Editar
      </button>
      <button class="btn btn-danger btn-sm eliminar-btn" data-index="${index}">
        🗑️ Eliminar
      </button>
    </td>
  `;
  tableBody.appendChild(row);
}

function editarEstudiante(index) {
  const student = students[index];
  document.getElementById("name").value = student.firstName;
  document.getElementById("lastName").value = student.lastName;
  document.getElementById("grade").value = student.grade;
  editIndex = index;
}

function calcularEstadisticas() {
  if (students.length === 0) {
    averageDiv.innerHTML = `
      Promedio: 0.00<br>
      Total de estudiantes: 0<br>
      Aprobados: 0<br>
      Reprobados: 0
    `;
    return;
  }

  const total = students.length;
  const aprobados = students.filter((s) => s.grade >= 4.0).length;
  const reprobados = total - aprobados;
  const suma = students.reduce((acc, s) => acc + s.grade, 0);
  const promedio = suma / total;

  averageDiv.innerHTML = `
    Promedio: <strong>${promedio.toFixed(2)}</strong><br>
    Total de estudiantes: <strong>${total}</strong><br>
    Aprobados: <strong>${aprobados}</strong><br>
    Reprobados: <strong>${reprobados}</strong>
  `;
}

function actualizarTabla() {
  tableBody.innerHTML = "";
  students.forEach((student, index) => {
    addStudentToTable(student, index);
  });
}
