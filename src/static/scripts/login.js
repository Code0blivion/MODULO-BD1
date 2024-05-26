document.getElementById("loginForm").addEventListener("submit", (event) => {
  event.preventDefault();

  const usuario = document.getElementById("username").value;
  const contrasena = document.getElementById("password").value;

  if (!usuario || !contrasena) {
    alert("Por favor, ingresa usuario y contraseña.");
    return;
  }

  fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ usuario, contrasena }),
  })
    .then((response) => {
      if (response.status === 401) {
        console.log("Credenciales incorrectas, mostrando modal de error.");
        const errorModal = new bootstrap.Modal(
          document.getElementById("errorModal")
        );
        errorModal.show();
        return;
      }
      return response.json();
    })
    .then((data) => {
      console.log("Datos recibidos:", data);
      if (data) {
        location.href = data.redir;
      }
    })
    .catch((error) => {
      console.error("Error en el bloque catch:", error);
      alert("Hubo un error al iniciar sesión.");
    });
});

// Agregar evento para recargar la página cuando se cierre el modal de error
document
  .getElementById("errorModal")
  .addEventListener("hidden.bs.modal", function () {
    location.reload();
  });
