// ---------- Menu data (array of objects) ----------
const menu = [
  { id: 1, name: "Masala Chai", price: 15 },
  { id: 2, name: "Ginger Tea", price: 20 },
  { id: 3, name: "Coffee", price: 25 },
  { id: 4, name: "Samosa", price: 15 },
  { id: 5, name: "Bread Pakora", price: 20 },
  { id: 6, name: "Maggi", price: 40 },
  { id: 7, name: "Veg Sandwich", price: 50 },
  { id: 8, name: "Cold Coffee", price: 45 },
  { id: 9, name: "Bun Maska", price: 25 }
];

// ---------- Cart (loaded from localStorage, or empty) ----------
let cart = JSON.parse(localStorage.getItem("chaiCart")) || [];

// ---------- Get HTML elements ----------
const menuItems = document.getElementById("menu-items");
const cartList = document.getElementById("cart-list");
const emptyMsg = document.getElementById("empty-msg");
const subtotalEl = document.getElementById("subtotal");
const gstEl = document.getElementById("gst");
const totalEl = document.getElementById("total");

// ---------- Show menu cards on the page ----------
const showMenu = () => {
  menuItems.innerHTML = "";
  menu.forEach((item) => {
    menuItems.innerHTML += `
      <div class="menu-card">
        <h3>${item.name}</h3>
        <p>₹${item.price}</p>
        <button onclick="addToCart(${item.id})">Add</button>
      </div>
    `;
  });
};

// ---------- Add an item to the cart ----------
const addToCart = (id) => {
  const item = menu.find((m) => m.id === id);
  const existing = cart.find((c) => c.id === id);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id: item.id, name: item.name, price: item.price, qty: 1 });
  }

  showCart();
};

// ---------- Show cart items and update the bill ----------
const showCart = () => {
  cartList.innerHTML = "";

  cart.forEach((c) => {
    cartList.innerHTML += `
      <li>
        <span>${c.name} (₹${c.price} x ${c.qty})</span>
        <span>₹${c.price * c.qty} <button onclick="removeFromCart(${c.id})">✕</button></span>
      </li>
    `;
  });

  localStorage.setItem("chaiCart", JSON.stringify(cart));

  emptyMsg.style.display = cart.length === 0 ? "block" : "none";

  const subtotal = cart.reduce((sum, c) => sum + c.price * c.qty, 0);
  const gst = subtotal * 0.05;
  const total = subtotal + gst;

  subtotalEl.textContent = subtotal.toFixed(2);
  gstEl.textContent = gst.toFixed(2);
  totalEl.textContent = total.toFixed(2);
};

// ---------- Remove one item from the cart ----------
const removeFromCart = (id) => {
  cart = cart.filter((c) => c.id !== id);
  showCart();
};

// ---------- Clear Cart button ----------
document.getElementById("clear-btn").addEventListener("click", () => {
  cart = [];
  showCart();
});

// ---------- Print Bill button ----------
document.getElementById("print-btn").addEventListener("click", () => {
  const name = document.getElementById("customer-name").value.trim();

  if (cart.length === 0) {
    alert("Your cart is empty. Add some items first!");
    return;
  }

  if (name === "") {
    alert("Please enter the customer name.");
    return;
  }

  window.print();
});

// ---------- Run when the page loads ----------
showMenu();
showCart();