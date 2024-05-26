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
          body: JSON.stringify({ firstName, lastName, birthdate, joindate, tipoCargo, email, password }),
        });
  
        if (response.ok) {
          alert("Empleado registrado exitosamente");
          window.location.href = "/";
        } else {
          throw new Error("Error registrando empleado");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Hubo un error al registrar el empleado.");
      }
    });
  
    // Cargar tipos de cargo
    fetch("/api/tiposCargo")
      .then(response => response.json())
      .then(data => {
        const tipoCargoSelect = document.getElementById("tipoCargo");
        data.forEach(tipo => {
          const option = document.createElement("option");
          option.value = tipo.idTipoCargo;
          option.text = tipo.descTipoCargo;
          tipoCargoSelect.add(option);
        });
      })
      .catch(error => console.error("Error cargando tipos de cargo:", error));
  });  