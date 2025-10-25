const productos = [
  { id: 1, nombre: "Hoodie 'Black Street'", precio: 120000, imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4FK-mAB241SJEzFhFW1LtpUAAqAVf1ys2UA&s" },
  { id: 2, nombre: "Hoodie 'Retro Gray'", precio: 115000, imagen: "https://www.youngwar.com/cdn/shop/files/LightVintgageGreyHoodieproductshot_1024x1024@2x.png?v=1706224190" },
  { id: 3, nombre: "Gorra 'NYC Flat'", precio: 75000, imagen: "https://static.caphunters.ro/37928-large_default/new-era-flat-brim-59fifty-championships-new-york-yankees-mlb-white-and-black-fitted-cap.webp" },
  { id: 4, nombre: "Gorra 'Classic White'", precio: 70000, imagen: "https://armatura.com.co/cdn/shop/files/01_6a57d04c-ea26-44c7-8f27-b5fe795e6291.jpg?v=1715714251&width=1080" },
  { id: 5, nombre: "Buso Oversize 'Storm'", precio: 95000, imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmm1mhSLwGJyIUYrugm8jEVs2gl8Vf2sGmCg&s" },
  { id: 6, nombre: "Buso Oversize 'Skyline'", precio: 99000, imagen: "https://andamishop.co/cdn/shop/files/skyline_1.jpg?v=1714151361&width=1920" }
];

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const contenedorProductos = document.getElementById("productos");
const listaCarrito = document.getElementById("lista-carrito");
const totalCarrito = document.getElementById("total");

function mostrarProductos() {
  productos.forEach(prod => {
    const div = document.createElement("div");
    div.className = "producto";
    div.innerHTML = `
      <img src="${prod.imagen}" alt="${prod.nombre}">
      <h3>${prod.nombre}</h3>
      <p>${new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(prod.precio)}</p>
      <button onclick="agregarAlCarrito(${prod.id})">Agregar al carrito</button>
    `;
    contenedorProductos.appendChild(div);
  });
}

function agregarAlCarrito(id) {
  const productoExistente = carrito.find(p => p.id === id);
  if (productoExistente) {
    productoExistente.cantidad++;
  } else {
    const producto = productos.find(p => p.id === id);
    carrito.push({ ...producto, cantidad: 1 });
  }
  guardarCarrito();
  actualizarCarrito();
}

function actualizarCarrito() {
  listaCarrito.innerHTML = "";
  let total = 0;

  carrito.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.nombre} x${item.cantidad} - ${new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(item.precio * item.cantidad)}`;
    listaCarrito.appendChild(li);
    total += item.precio * item.cantidad;
  });

  totalCarrito.textContent = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(total);
}

function vaciarCarrito() {
  if (confirm("¿Vaciar carrito?")) {
    carrito = [];
    guardarCarrito();
    actualizarCarrito();
  }
}

function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

mostrarProductos();
actualizarCarrito();
