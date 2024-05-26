function sumbitProfile(empID, reqID, firstDate) {
  const assignProfileForm = document.getElementById("assignProfileForm");

  assignProfileForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const profileSelect = document.getElementById("profileSelect");
    const profileID = profileSelect.value;
    const currentDate = new Date();

    if (!profileID || profileID === "Selecciona una opción") {
      alert("Por favor, selecciona un perfil válido.");
      return;
    }

    fetch("/api/assignProfile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ reqID, empID, profileID, currentDate, firstDate }),
    })
      .then((response) => {
        if (response.ok) {
          return response.text();
        } else {
          throw new Error("Error asignando perfil.");
        }
      })
      .then((message) => {
        alert(message);
        location.reload();
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Hubo un error al asignar el perfil.");
      });
  });
}

function updateConvocatoria(reqID) {
  convocatoriaForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const convocatoriaText = document.getElementById("convocatoriaText").value;
    const currentDate = new Date();

    fetch("/create-convocatoria", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ convocatoriaText, reqID, currentDate }),
    })
      .then((response) => {
        if (response.ok) {
          return response.text();
        } else {
          throw new Error("Error creando la convocatoria.");
        }
      })
      .then((message) => {
        alert(message);
        location.reload();
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Hubo un error al asignar crear la convocatoria.");
      });
  });
}

function getInvitados(reqID, profileID) {
  fetch(`/api/candidates/${reqID}`)
    .then((response) => response.json())
    .then((data) => {
      const candidates = data.invitados;
      console.log(candidates);
      const candidatesAccordion = document.getElementById(
        "invitationAccordion"
      );

      candidates.forEach((candidate, index) => {
        const [
          usuario,
          nombre,
          apellido,
          fechaNacimiento,
          numeroDocumento,
          tipoDocumento,
          titulo,
          cargo,
          estudios,
          institucion,
          disciplina,
        ] = candidate;

        const formattedFechaNacimiento = new Date(
          fechaNacimiento
        ).toLocaleDateString("es-ES");

        const candidateAccordion = document.createElement("div");
        candidateAccordion.className = "accordion-item mb-3";

        const candidateHeader = document.createElement("h2");
        candidateHeader.className = "accordion-header";
        candidateHeader.id = `candidateHeading${index}`;

        const headerDiv = document.createElement("div");
        headerDiv.className = "d-flex align-items-center";

        const candidateCheckbox = document.createElement("input");
        candidateCheckbox.type = "checkbox";
        candidateCheckbox.className = "form-check-input me-2";
        candidateCheckbox.id = `candidateCheckbox${index}`;
        candidateCheckbox.value = usuario;

        const candidateButton = document.createElement("button");
        candidateButton.className = "accordion-button collapsed flex-grow-1";
        candidateButton.type = "button";
        candidateButton.dataset.bsToggle = "collapse";
        candidateButton.dataset.bsTarget = `#candidateCollapse${index}`;
        candidateButton.ariaExpanded = "false";
        candidateButton.ariaControls = `candidateCollapse${index}`;
        candidateButton.textContent = `${nombre} ${apellido}`;

        const candidateCollapse = document.createElement("div");
        candidateCollapse.id = `candidateCollapse${index}`;
        candidateCollapse.className = "accordion-collapse collapse";
        candidateCollapse.ariaLabelledby = `candidateHeading${index}`;
        candidateCollapse.dataset.bsParent = "#invitationAccordion";

        const candidateBody = document.createElement("div");
        candidateBody.className = "accordion-body";
        candidateBody.innerHTML = `
          <p><strong>Nombre:</strong> ${nombre} ${apellido}</p>
          <p><strong>Fecha de Nacimiento:</strong> ${formattedFechaNacimiento}</p>
          <p><strong>Documento:</strong> ${numeroDocumento} (${tipoDocumento})</p>
          <p><strong>Título:</strong> ${titulo}</p>
          <p><strong>Cargo:</strong> ${cargo}</p>
          <p><strong>Estudios:</strong> ${estudios}</p>
          <p><strong>Institución:</strong> ${institucion}</p>
          <p><strong>Disciplina:</strong> ${disciplina}</p>
        `;

        headerDiv.appendChild(candidateCheckbox);
        headerDiv.appendChild(candidateButton);
        candidateHeader.appendChild(headerDiv);
        candidateAccordion.appendChild(candidateHeader);
        candidateAccordion.appendChild(candidateCollapse);
        candidateCollapse.appendChild(candidateBody);

        candidatesAccordion.appendChild(candidateAccordion);
      });
    })
    .catch((error) => console.error("Error fetching candidates:", error));

  document
    .getElementById("invitationForm")
    .addEventListener("submit", async (e) => {
      e.preventDefault();

      const invitationDetails = e.target.querySelector("textarea").value;
      const invitationDateTime = e.target.querySelector(
        "#invitationDateTime"
      ).value;

      // Obtener los checkboxes seleccionados de los acordeones internos
      const checkboxes = document.querySelectorAll(
        "#invitationAccordion input[type='checkbox']:checked"
      );
      const selectedCandidates = Array.from(checkboxes).map(
        (checkbox) => checkbox.value
      );

      try {
        const currentDate = new Date();
        const response = await fetch("/api/invitation", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            reqID,
            invitationDetails,
            currentDate,
            invitationDateTime,
            selectedCandidates,
            profileID,
          }),
        });

        if (response.ok) {
          alert("Invitación enviada exitosamente");
        } else {
          alert("Error al enviar la invitación");
        }
        location.reload();
      } catch (error) {
        console.error("Error:", error);
        alert("Error al enviar la invitación");
      }
    });
}

function getPreseleccionados(reqID, profileID) {
  fetch(`/api/preseleccionados/${reqID}`)
    .then((response) => response.json())
    .then((data) => {
      const candidates = data.preseleccionados;

      const preselectionAccordion = document.getElementById(
        "preselectionAccordion"
      );

      candidates.forEach((candidate, index) => {
        const [
          usuario,
          nombre,
          apellido,
          fechaNacimiento,
          numeroDocumento,
          tipoDocumento,
          titulo,
          cargo,
          estudios,
          institucion,
          disciplina,
        ] = candidate;

        const formattedFechaNacimiento = new Date(
          fechaNacimiento
        ).toLocaleDateString("es-ES");

        const candidateAccordion = document.createElement("div");
        candidateAccordion.className = "accordion-item mb-3";

        const candidateHeader = document.createElement("h2");
        candidateHeader.className = "accordion-header";
        candidateHeader.id = `preselectionHeading${index}`;

        const candidateButtonContainer = document.createElement("div");
        candidateButtonContainer.className = "d-flex align-items-center";

        const candidateCheckbox = document.createElement("input");
        candidateCheckbox.type = "checkbox";
        candidateCheckbox.id = `preselectionCheckbox${index}`;
        candidateCheckbox.className = "form-check-input me-2";
        candidateCheckbox.value = usuario;

        const candidateButton = document.createElement("button");
        candidateButton.className = "accordion-button collapsed flex-grow-1";
        candidateButton.type = "button";
        candidateButton.dataset.bsToggle = "collapse";
        candidateButton.dataset.bsTarget = `#preselectionCollapse${index}`;
        candidateButton.ariaExpanded = "false";
        candidateButton.ariaControls = `preselectionCollapse${index}`;
        candidateButton.textContent = `${nombre} ${apellido}`;

        candidateButtonContainer.appendChild(candidateCheckbox);
        candidateButtonContainer.appendChild(candidateButton);

        const candidateCollapse = document.createElement("div");
        candidateCollapse.id = `preselectionCollapse${index}`;
        candidateCollapse.className = "accordion-collapse collapse";
        candidateCollapse.ariaLabelledby = `preselectionHeading${index}`;
        candidateCollapse.dataset.bsParent = "#preselectionAccordion";

        const candidateBody = document.createElement("div");
        candidateBody.className = "accordion-body";
        candidateBody.innerHTML = `
          <p><strong>Nombre:</strong> ${nombre} ${apellido}</p>
          <p><strong>Fecha de Nacimiento:</strong> ${formattedFechaNacimiento}</p>
          <p><strong>Documento:</strong> ${numeroDocumento} (${tipoDocumento})</p>
          <p><strong>Título:</strong> ${titulo}</p>
          <p><strong>Cargo:</strong> ${cargo}</p>
          <p><strong>Estudios:</strong> ${estudios}</p>
          <p><strong>Institución:</strong> ${institucion}</p>
          <p><strong>Disciplina:</strong> ${disciplina}</p>
        `;

        candidateHeader.appendChild(candidateButtonContainer);
        candidateAccordion.appendChild(candidateHeader);
        candidateAccordion.appendChild(candidateCollapse);
        candidateCollapse.appendChild(candidateBody);

        preselectionAccordion.appendChild(candidateAccordion);
      });
    });

  // Enviar el formulario de preselección
  document
    .getElementById("preselectionForm")
    .addEventListener("submit", async (e) => {
      e.preventDefault();

      // Obtener los checkboxes seleccionados de los acordeones internos
      const checkboxes = document.querySelectorAll(
        "#preselectionAccordion input[type='checkbox']:checked"
      );
      const selectedCandidates = Array.from(checkboxes).map(
        (checkbox) => checkbox.value
      );

      // Enviar la solicitud POST al endpoint del servidor
      try {
        const currentDate = new Date();
        const response = await fetch("/api/preseleccion", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            reqID,
            currentDate,
            selectedCandidates,
            profileID,
          }),
        });

        if (response.ok) {
          alert("Preselección enviada exitosamente");
          location.reload();
        } else {
          alert("Error al enviar la preselección");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Error al enviar la preselección");
      }
    });
}

async function getDetails() {
  const path = window.location.pathname;
  const parts = path.split("/");
  const reqID = parts[parts.length - 1];

  // Hacer un fetch al endpoint para obtener más detalles
  fetch(`/api/req/${reqID}`)
    .then((response) => response.json())
    .then((data) => {
      const details = data["reque"][0];
      let fase = Number(data["fase"][0]);
      let startDate;
      if (data["fase"][2] === undefined) {
        startDate = new Date(details[0]);
      } else {
        startDate = new Date(data["fase"][2]);
      }

      // Formatear la fecha y la hora según tus preferencias
      const formattedDate = startDate.toLocaleDateString();
      const formattedTime = startDate.toLocaleTimeString();

      document.getElementById("username").textContent =
        data.empleado[0] + " " + data.empleado[1];
      document.getElementById("date").textContent =
        new Date().toLocaleDateString("es-ES");

      document.getElementById("currentPhase").textContent =
        fase + " - " + data["fase"][1];
      // Desplegar la fecha y la hora en el elemento startDate
      document.getElementById(
        "startDate"
      ).textContent = `${formattedDate} - ${formattedTime}`;
      document.getElementById(
        "maxSalary"
      ).textContent = `$${details[1].toLocaleString()}`;
      document.getElementById(
        "minSalary"
      ).textContent = `$${details[2].toLocaleString()}`;
      document.getElementById("convocatoria").textContent =
        data["convocatoria"];
      document.getElementById("invitacion").textContent = data["invitacion"];
      document.getElementById("jobDescription").textContent = details[3];
      document.getElementById("careerDescription").textContent = details[4];
      document.getElementById("vacancyNumber").textContent = details[5];

      if (fase === 2) {
        document.getElementById("perfil").textContent =
          "No se ha definido un perfil";
        document.getElementById("disciplina").textContent =
          "No se ha definido una disciplina";
      } else {
        console.log(data.perfil);
        document.getElementById("perfil").textContent = data.perfil[1];
        document.getElementById("disciplina").textContent = data.perfil[2];
      }

      const accordions = document.querySelectorAll(
        ".accordion-item > .accordion-header > .accordion-button"
      );

      const setGreenBackground = (index) => {
        if (accordions[index]) {
          accordions[index].style.backgroundColor = "#37f150";
        }
      };

      const disableAccordion = (index) => {
        if (accordions[index]) {
          accordions[index].classList.add("disabled");
          accordions[index].setAttribute("aria-disabled", "true");
          accordions[index].setAttribute("tabindex", "-1");
          accordions[index].removeAttribute("data-bs-toggle");
        }
      };

      switch (fase) {
        case 2:
          disableAccordion(1);
          disableAccordion(2);
          disableAccordion(3);
          setGreenBackground(0);

          const profileSelect = document.getElementById("profileSelect");

          profileSelect.innerHTML =
            "<option selected>Selecciona una opción</option>";
          data.perfil.forEach((perfil) => {
            const option = document.createElement("option");
            option.value = perfil[0];
            option.textContent = perfil[1] + " - " + perfil[2];
            profileSelect.appendChild(option);
          });

          sumbitProfile(details[6], reqID, startDate);

          break;

        case 3:
          disableAccordion(0);
          disableAccordion(2);
          disableAccordion(3);
          setGreenBackground(1);
          updateConvocatoria(reqID);
          break;

        case 4:
          disableAccordion(0);
          disableAccordion(1);
          disableAccordion(3);
          setGreenBackground(2);
          getInvitados(reqID, data.perfil[0]);
          break;

        case 5:
          disableAccordion(0);
          disableAccordion(1);
          disableAccordion(2);
          setGreenBackground(3);
          getPreseleccionados(reqID, data.perfil[0]);
          break;

        default:
          if (fase > 5) {
            // Deshabilitar todos los acordeones
            accordions.forEach((accordion, index) => {
              disableAccordion(index);
            });
            /*
            if (fase > 5) {
              accordions.forEach((accordion, index) => {
                setGreenBackground(index);
              });
            }*/
          }
          break;
      }

      const buttons = document.querySelectorAll(
        ".accordion-item > .accordion-header > .accordion-button"
      );

      if (fase >= 3) {
        for (let i = 0; i < fase - 2; i++) {
          if (buttons[i]) {
            buttons[i].textContent += " - FASE COMPLETADA";
          }
        }
      }
    })
    .catch((error) => console.error("Error:", error));
}

getDetails();
