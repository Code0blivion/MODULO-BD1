document.addEventListener("DOMContentLoaded", function () {
  // Obtener el id de la URL actual
  const url = window.location.href;
  const id = url.substring(url.lastIndexOf("/") + 1);

  // Realizar la solicitud al servidor para obtener los datos
  fetch(`/api/requerimientos/${id}`)
    .then((response) => response.json())
    .then((data) => {
      // Actualizar el nombre del usuario en el encabezado
      document.getElementById("username").textContent =
        data.empleado[0] + " " + data.empleado[1];

      // Obtener la fecha actual
      const today = new Date();
      const formattedDate = today.toLocaleDateString();
      document.getElementById("date").textContent = formattedDate;

      // Poblar los links de requerimientos
      const requerimientosContainer = document.getElementById("requerimientos");
      data.requerimientos.forEach((requerimiento) => {
        const link = document.createElement("a");
        if (data.cargo[0] === "002") {
          link.setAttribute("href", `/req/${requerimiento[0]}`);
        } else if (data.cargo[0] === "004") {
          link.setAttribute("href", `/pruebas/${requerimiento[0]}`);
        } else {
          link.setAttribute("href", `/resultados/${requerimiento[0]}`);
        }

        link.classList.add(
          "btn",
          "btn-primary",
          "btn-lg",
          "mb-3",
          "mt-3",
          "btn-block-custom"
        );
        link.textContent = `Requerimiento ${requerimiento[0]}`;
        requerimientosContainer.appendChild(link);
      });
    })
    .catch((error) => {
      console.error("Error al obtener los datos:", error);
      alert("Hubo un error al obtener los datos de requerimientos.");
    });
});
