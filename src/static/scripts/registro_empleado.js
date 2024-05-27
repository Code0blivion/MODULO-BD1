document.addEventListener("DOMContentLoaded", () => {
  const registroEmpleadoForm = document.getElementById("registroEmpleadoForm");

  registroEmpleadoForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const birthdate = document.getElementById("birthdate").value;
    const joindate = document.getElementById("joindate").value;
    const tipoCargo = document.getElementById("tipoCargo").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    try {
      const response = await fetch("/api/registroEmpleado", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          birthdate,
          joindate,
          tipoCargo,
          email,
          password,
        }),
      });

      if (response.ok) {
        const responseData = await response.json();
        const redirUrl = responseData.redirectUrl || "/";

        const successModal = new bootstrap.Modal(
          document.getElementById("successModal")
        );
        successModal.show();

        document
          .getElementById("successModal")
          .addEventListener("hidden.bs.modal", function () {
            location.href = redirUrl;
          });
      } else {
        const errorData = await response.json();
        alert(`Error registrando empleado: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Hubo un error al registrar el empleado.");
    }
  });

  // Cargar tipos de cargo
  fetch("/api/tiposCargo")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al cargar tipos de cargo");
      }
      return response.json();
    })
    .then((data) => {
      const tipoCargoSelect = document.getElementById("tipoCargo");
      data.cargos.forEach((tipo) => {
        const option = document.createElement("option");
        option.value = tipo[0];
        option.textContent = tipo[1];
        tipoCargoSelect.appendChild(option);
      });
    })
    .catch((error) => console.error("Error cargando tipos de cargo:", error));
});
