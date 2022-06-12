let shop = document.getElementById("shop");

let basket = JSON.parse(localStorage.getItem("data")) || [];

// generateShop() will generate the shop items
let generateShop = () => {
  return (shop.innerHTML = shopItemsData
    .map((item) => {
      // map each item in shopItemsData to a string
      let { id, name, price, desc, img } = item; // destructuring
      let searchItemID = basket.find((item) => item.id === id) || []; // find item in basket
      return ` <div id="product-id-${id}" class="item">
        <img width="220" src=${img} alt="" />
        <div class="details">
          <h3>${name}</h3>
          <p>${desc}</p>
          <div class="price-quantity">
            <h2>$ ${price}</h2>
            <div class="buttons">
              <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
              <div id=${id} class="quantity">
                ${
                  searchItemID.quantity === undefined
                    ? 0
                    : searchItemID.quantity
                }
              </div>
              <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
            </div>
          </div>
        </div>
      </div>`;
    })
    .join(""));
};

generateShop();

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

// calculation() will calculate the total price of the cart
let calculation = () => {
  // get the total price of the cart
  let cartIcon = document.getElementById("cart-amount");
  //   console.log(basket);
  // calculate the total price of the cart
  cartIcon.innerHTML = basket
    .map((item) => item.quantity) // get the quantity of each item
    .reduce((a, b) => a + b, 0); // add the quantity of each item
};

calculation();
