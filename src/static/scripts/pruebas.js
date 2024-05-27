document.addEventListener("DOMContentLoaded", async () => {
  try {
    // Obtener el ID de la URL actual
    const urlParts = window.location.pathname.split("/");
    const id = urlParts[urlParts.length - 1]; // Asume que el ID es el último segmento de la URL

    // Construir la URL del endpoint con el ID
    const endpointUrl = `/api/pruebas/${id}`;

    // Realizar la solicitud fetch al endpoint
    const response = await fetch(endpointUrl);
    const data = await response.json();
    const pruebas = data.pruebas;
    document.getElementById("username").textContent =
      data.empleado[0] + " " + data.empleado[1];
    document.getElementById("date").textContent = new Date().toLocaleDateString(
      "es-ES"
    );
    const testsAccordion = document.getElementById("testsAccordion");

    pruebas.forEach((prueba, index) => {
      const accordionItem = document.createElement("div");
      accordionItem.className = "accordion-item";

      const headerId = `testHeading${index}`;
      const collapseId = `testCollapse${index}`;
      const radioId = `testRadio${index}`;

      accordionItem.innerHTML = `
                <h2 class="accordion-header" id="${headerId}">
                    <div class="d-flex align-items-center">
                        <input type="radio" id="${radioId}" name="testRadio" value="${
        prueba.idPrueba
      }" class="form-check-input" />
                        <button class="accordion-button collapsed flex-grow-1" type="button" data-bs-toggle="collapse"
                            data-bs-target="#${collapseId}" aria-expanded="true" aria-controls="${collapseId}">
                            ${prueba.descPrueba}
                        </button>
                    </div>
                </h2>
                <div id="${collapseId}" class="accordion-collapse collapse" aria-labelledby="${headerId}" data-bs-parent="#testsAccordion">
                    <div class="accordion-body">
                        <p><strong>Disciplina:</strong> ${prueba.disciplina}</p>
                        <p><strong>Tipo de Prueba:</strong> ${
                          prueba.tipoPrueba
                        }</p>
                        <p><strong>Fecha Creada:</strong> ${new Date(
                          prueba.fechaCreada
                        ).toLocaleDateString()}</p>
                        <div>
                            <strong>Preguntas:</strong>
                            <ul>
                                ${prueba.preguntas
                                  .map(
                                    (pregunta) => `
                                    <li>
                                        <p><strong>${
                                          pregunta.descPregunta
                                        }</strong> (${
                                      pregunta.tipoPregunta
                                    })</p>
                                        ${
                                          pregunta.respuestas.length > 0
                                            ? `
                                        <ul>
                                            ${pregunta.respuestas
                                              .map(
                                                (respuesta) =>
                                                  `<li>${respuesta}</li>`
                                              )
                                              .join("")}
                                        </ul>`
                                            : "<p>No hay respuestas</p>"
                                        }
                                    </li>
                                `
                                  )
                                  .join("")}
                            </ul>
                        </div>
                        <label for="fecha-${
                          prueba.idPrueba
                        }">Asignar Fecha Prueba</label>
                        <input type="datetime-local" id="fecha-${
                          prueba.idPrueba
                        }" name="fecha-${
        prueba.idPrueba
      }" class="form-control mb-3" />
                    </div>
                </div>
            `;

      testsAccordion.appendChild(accordionItem);
    });

    // Asignar evento de submit al formulario
    document.querySelector("form").addEventListener("submit", function (event) {
      event.preventDefault();

      const selectedRadio = document.querySelector(
        'input[name="testRadio"]:checked'
      );
      if (!selectedRadio) {
        alert("Seleccione una prueba");
        return;
      }

      const selectedPruebaId = selectedRadio.value;
      const fechaInput = document.querySelector(
        `input[name="fecha-${selectedPruebaId}"]`
      );
      if (!fechaInput.value) {
        alert("Seleccione una fecha");
        return;
      }

      const fecha = fechaInput.value;
      const currentDate = new Date().toISOString();

      console.log("Prueba ID:", selectedPruebaId);
      console.log("Fecha:", fecha);

      fetch(`/api/pruebas/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ selectedPruebaId, fecha, currentDate, id }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error en la solicitud");
          }
          // Mostrar el modal de confirmación
          const confirmationModal = new bootstrap.Modal(
            document.getElementById("confirmationModal")
          );
          confirmationModal.show();

          // Redirigir después de cerrar el modal
          document
            .getElementById("confirmationModal")
            .addEventListener("hidden.bs.modal", () => {
              window.location.href = "/lista_requerimientos/" + id;
            });
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    });
  } catch (error) {
    console.error("Error fetching pruebas:", error);
  }
});
