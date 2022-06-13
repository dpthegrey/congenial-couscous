let label = document.getElementById("label"); // get the label
let shoppingCart = document.getElementById("shopping-cart");

// parse the basket from localStorage
let basket = JSON.parse(localStorage.getItem("data")) || [];

// calculation() will calculate the total price of the cart
let calculation = () => {
  let cartIcon = document.getElementById("cart-amount");
  cartIcon.innerHTML = basket
    .map((item) => item.quantity)
    .reduce((a, b) => a + b, 0);
};

calculation();

// generateCartItems() will generate the cart items
let generateCartItems = () => {
  if (basket.length !== 0) {
    // if basket is not empty
    return (shoppingCart.innerHTML = basket
      .map((item) => {
        // map each item in basket to a string
        let { id, quantity, name, img, price } = item; // destructuring
        // get the id and quantity of each item
        let searchItemID = shopItemsData.find((item) => item.id === id) || [];
        return `<div class="cart-item">
          <img width="100" src=${searchItemID.img} alt="" />
          <div class="details">
            <div class="title-price-x">
              <h4 class="title-price">
                <p>${searchItemID.name}</p>
                <p class="cart-item-price">$ ${searchItemID.price}</p>
              </h4>
              <i onclick="removeItem(${id})" class="bi bi-x-lg"></i>
            </div>

            <div class="buttons">
              <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
              <div id=${id} class="quantity">${quantity}</div>
              <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
            </div>

            <h3>$ ${quantity * searchItemID.price}</h3>  
          </div>
        </div>`;
      })
      .join(""));
  } else {
    // if basket is empty
    shoppingCart.innerHTML = ``;
    label.innerHTML = html`
      <h2>Your cart is empty</h2>
      <a href="index.html">
        <button class="home-btn">Back to home</button>
      </a>
    `;
  }
};

generateCartItems();

// increment() will increment the quantity of the item
let increment = (id) => {
  let selectedItem = id; // get the id of the item
  let basketSearch = basket.find((item) => item.id === selectedItem.id); // find the item in the basket

  if (basketSearch === undefined) {
    // if the item is not in the basket
    basket.push({
      id: selectedItem.id,
      quantity: 1,
    });
  } else {
    // if the item is in the basket
    basketSearch.quantity += 1;
  }

  generateCartItems();
  // update the quantity of the item
  update(selectedItem.id);
  // update the localStorage with the new basket
  localStorage.setItem("data", JSON.stringify(basket));
};

// decrement() will decrement the quantity of the item
let decrement = (id) => {
  let selectedItem = id; // get the id of the item
  let basketSearch = basket.find((item) => item.id === selectedItem.id); // find the item in the basket

  if (basketSearch === undefined || basketSearch.quantity === 0) {
    // if the item is not in the basket or the quantity is 0
    return;
  } else {
    // if the item is in the basket and the quantity is not 0
    basketSearch.quantity -= 1; // decrement the quantity
  }
  // update the quantity of the item
  update(selectedItem.id);
  // remove item from basket if quantity is 0
  basket = basket.filter((item) => item.quantity > 0);
  generateCartItems();
  // update the localStorage with the new basket
  localStorage.setItem("data", JSON.stringify(basket));
};

// update() will update the quantity of the item
let update = (id) => {
  // get the id of the item
  let basketSearch = basket.find((item) => item.id === id);
  //   console.log(basketSearch);
  // find the item in the basket
  document.getElementById(id).innerHTML = basketSearch.quantity;
  calculation();
};

let removeItem = (id) => {
  let selectedItem = id;
  // console.log(selectedItem.id);
  basket = basket.filter((x) => x.id !== selectedItem.id);
  // re-render all cards on selecting X button
  generateCartItems();
  // update the localStorage with the new basket
  localStorage.setItem("data", JSON.stringify(basket));
};
