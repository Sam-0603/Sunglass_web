const products = document.querySelectorAll('.product-card');
const filterType = document.getElementById('filterType');
const sortProducts = document.getElementById('sortProducts');

filterType.addEventListener('change', () => {
  const value = filterType.value;

  products.forEach(product => {
    product.style.display =
      value === 'all' || product.dataset.type === value
      ? 'block'
      : 'none';
  });
});

sortProducts.addEventListener('change', () => {
  const container = document.querySelector('.new-products');
  const items = [...products];

  let sorted;

  if (sortProducts.value === 'price-low') {
    sorted = items.sort((a,b) => a.dataset.price - b.dataset.price);
  } 
  else if (sortProducts.value === 'price-high') {
    sorted = items.sort((a,b) => b.dataset.price - a.dataset.price);
  } 
  else if (sortProducts.value === 'name') {
    sorted = items.sort((a,b) => 
      a.dataset.name.localeCompare(b.dataset.name)
    );
  } 
  else return;

  sorted.forEach(item => container.appendChild(item));
});

/* ADD TO CART */
let cart = JSON.parse(localStorage.getItem('cart')) || [];

document.querySelectorAll('.add-cart-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {

    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (isLoggedIn !== "true") {
      alert("Please login to add items to cart");
      window.location.href = "login.html";
      return;
    }

    const card = e.target.closest('.product-card');

    const product = {
      name: card.dataset.name,
      price: card.dataset.price
    };

    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));

    alert("Added to cart 🛒");
  });
});
