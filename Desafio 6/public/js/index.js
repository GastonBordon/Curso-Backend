const socket = io.connect();

const button = document.getElementById("addProduct");

button.addEventListener("click", (event) => {
  let title = document.getElementById("title").value;
  let price = document.getElementById("price").value;
  let thumbnail = document.getElementById("img").value;
  let id = "54564313";
  socket.emit("product", { title, price, thumbnail, id });
});

socket.on("productos", (data) => {
  let listaProductos = "";
  data.forEach((producto) => {
    listaProductos += `
    <tr class="text-center align-middle">
        <th scope="row" class="text-center align-middle">${producto.id}</th>
        <td class="text-center align-middle">${producto.title}</td>
        <td class="text-center align-middle">$ ${producto.price}</td>
        <td class="text-center align-middle"><img src="${producto.thumbnail}" alt="${producto.title}" class="w-25"></td>
    </tr>
`;
  });
  document.getElementById("listadoProductos").innerHTML = listaProductos;
});

const btnEnviar = document.getElementById("btnEnviar");

btnEnviar.addEventListener("click", (event) => {
  event.preventDefault();
  let email = document.getElementById("email").value;
  let mensaje = document.getElementById("mensaje").value;
  if (email && mensaje) {
    let fecha = new Date();
    socket.emit("nuevoMensaje", { email, mensaje, fecha });
  }
});

socket.on("chat", (mensajes) => {
  let chat = "";
  mensajes.forEach((mensaje) => {
    chat += `<li><p>
     <span class="fw-bold" style="color: blue">${mensaje.email}</span>
     <span style="color: brown">(${mensaje.fecha})</span>: 
     <span style="color: green" class="fst-italic">${mensaje.mensaje}</span> 
     </p>
     </li>`;
  });
  document.getElementById("mensajes").innerHTML = chat;
});
