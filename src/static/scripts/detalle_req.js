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

function getInvitados(reqID) {
  fetch(`/api/candidates/${reqID}`)
    .then((response) => response.json())
    .then((candidates) => {
      console.log(candidates);
      const candidatesAccordion = document.getElementById(
        "invitationAccordion"
      );

      candidates.forEach((candidate) => {
        const candidateAccordion = document.createElement("div");
        candidateAccordion.className = "accordion-item mb-3";

        const candidateHeader = document.createElement("h2");
        candidateHeader.className = "accordion-header";

        const candidateButton = document.createElement("button");
        candidateButton.className = "accordion-button collapsed";
        candidateButton.type = "button";
        candidateButton.dataset.bsToggle = "collapse";
        candidateButton.ariaExpanded = "false";
        candidateButton.textContent = candidate.name;

        const candidateCollapse = document.createElement("div");
        candidateCollapse.className = "accordion-collapse collapse";

        const candidateBody = document.createElement("div");
        candidateBody.className = "accordion-body";

        // Checkbox para el candidato
        const candidateCheckbox = document.createElement("input");
        candidateCheckbox.type = "checkbox";
        candidateCheckbox.id = `candidateCheckbox${candidate.id}`;
        candidateCheckbox.className = "form-check-input me-2";

        // Label para el checkbox
        const candidateLabel = document.createElement("label");
        candidateLabel.htmlFor = `candidateCheckbox${candidate.id}`;
        candidateLabel.className = "form-check-label";
        candidateLabel.textContent = "Seleccionar";

        // Contenido del acordeón
        candidateBody.innerHTML = `
        ${candidate.details}
        <div class="form-check">
          ${candidateCheckbox.outerHTML}
          ${candidateLabel.outerHTML}
        </div>
      `;

        candidateHeader.appendChild(candidateButton);
        candidateAccordion.appendChild(candidateHeader);
        candidateAccordion.appendChild(candidateCollapse);
        candidateCollapse.appendChild(candidateBody);

        candidatesAccordion.appendChild(candidateAccordion);
      });
    });

  document
    .getElementById("invitationForm")
    .addEventListener("submit", async (e) => {
      e.preventDefault();

      const invitationDetails = e.target.querySelector("textarea").value;
      const invitationDateTime = e.target.querySelector(
        "#invitationDateTime"
      ).value;

      const response = await fetch("/api/invitation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          reqID,
          invitationDetails,
          invitationDateTime,
        }),
      });

      if (response.ok) {
        alert("Invitación enviada exitosamente");
      } else {
        alert("Error al enviar la invitación");
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

      const profileSelect = document.getElementById("profileSelect");

      if (fase === 2) {
        profileSelect.innerHTML =
          "<option selected>Selecciona una opción</option>";
        data.perfil.forEach((perfil) => {
          const option = document.createElement("option");
          option.value = perfil[0];
          option.textContent = perfil[1] + " - " + perfil[2];
          profileSelect.appendChild(option);
        });
        sumbitProfile(details[6], reqID, startDate);
      } else {
        const perfil = data.perfil;
        const option = document.createElement("option");
        option.textContent = perfil[0] + " - " + perfil[1];
        option.selected = true;
        profileSelect.appendChild(option);
        profileSelect.disabled = true;
        document.querySelector(
          '#assignProfileForm button[type="submit"]'
        ).disabled = true;
      }

      const accordions = document.querySelectorAll(
        ".accordion-item > .accordion-header > .accordion-button"
      );

      const setGreenBackground = (index) => {
        if (accordions[index]) {
          accordions[index].style.backgroundColor = "#37f150";
        }
      };

      switch (fase) {
        case 3:
          accordions[1].classList.add("disabled");
          accordions[1].setAttribute("aria-disabled", "true");
          accordions[1].setAttribute("tabindex", "-1");
          accordions[1].removeAttribute("data-bs-toggle");

          accordions[2].classList.add("disabled");
          accordions[2].setAttribute("aria-disabled", "true");
          accordions[2].setAttribute("tabindex", "-1");
          accordions[2].removeAttribute("data-bs-toggle");
          updateConvocatoria(reqID);
          setGreenBackground(0);
          break;
        case 4:
          accordions[0].classList.add("disabled");
          accordions[0].setAttribute("aria-disabled", "true");
          accordions[0].setAttribute("tabindex", "-1");
          accordions[0].removeAttribute("data-bs-toggle");

          accordions[2].classList.add("disabled");
          accordions[2].setAttribute("aria-disabled", "true");
          accordions[2].setAttribute("tabindex", "-1");
          accordions[2].removeAttribute("data-bs-toggle");

          setGreenBackground(1);
          getInvitados(reqID);
          break;
        case 5:
          accordions[0].classList.add("disabled");
          accordions[0].setAttribute("aria-disabled", "true");
          accordions[0].setAttribute("tabindex", "-1");
          accordions[0].removeAttribute("data-bs-toggle");

          accordions[1].classList.add("disabled");
          accordions[1].setAttribute("aria-disabled", "true");
          accordions[1].setAttribute("tabindex", "-1");
          accordions[1].removeAttribute("data-bs-toggle");
          setGreenBackground(2);
          break;

        default:
          if (fase == 2 || fase > 5) {
            // Deshabilitar todos los acordeones
            accordions.forEach((button) => {
              button.classList.add("disabled");
              button.setAttribute("aria-disabled", "true");
              button.setAttribute("tabindex", "-1");
              button.removeAttribute("data-bs-toggle");
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
    })
    .catch((error) => console.error("Error:", error));
}

getDetails();
