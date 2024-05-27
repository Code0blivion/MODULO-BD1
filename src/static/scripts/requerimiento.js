document.addEventListener("DOMContentLoaded", async function () {
  const analystsContainer = document.getElementById("analystsContainer");
  try {
    const response = await fetch("/api/analistas");
    const data = await response.json();
    const analysts = data.analistas;

    analysts.forEach((analyst) => {
      const analystHTML = `
          <div class="form-check">
            <input class="form-check-input" type="radio" name="analyst" id="analyst_${analyst[0]}" value="${analyst[0]}" required>
            <label class="form-check-label" for="analyst_${analyst[0]}">
              ${analyst[1]}
            </label>
          </div>
        `;
      analystsContainer.innerHTML += analystHTML;
    });
  } catch (error) {
    console.error("Error al cargar analistas:", error);
  }
});

const form = document.querySelector("form");
form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const salarioMin = document.getElementById("minSalary").value;
  const salarioMax = document.getElementById("maxSalary").value;
  const descFuncion = document.getElementById("jobDescription").value;
  const descCarreras = document.getElementById("careerDescription").value;
  const nVvacantes = document.getElementById("vacancies").value;
  const Emp_codEmpleado = document.querySelector(
    'input[name="analyst"]:checked'
  ).value;

  // Obtener el ID de la URL actual
  const urlParts = window.location.pathname.split("/");
  const codEmpleadoReque = urlParts[urlParts.length - 1]; // Asume que el ID es el último segmento de la URL

  const requerimiento = {
    salarioMin,
    salarioMax,
    descFuncion,
    descCarreras,
    nVvacantes,
    codEmpleadoReque,
    Emp_codEmpleado,
  };

  try {
    const response = await fetch(`/api/requerimiento/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requerimiento),
    });

    if (response.ok) {
      alert("Requerimiento creado exitosamente");
      window.location.reload(); // Recargar la página
    } else {
      alert("Error al crear el requerimiento");
    }
  } catch (error) {
    console.error("Error al enviar el formulario:", error);
    alert("Error al enviar el formulario");
  }
});
