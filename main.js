let shop = document.getElementById("shop");

let shopItemsData = [
  {
    id: "aeou1",
    name: "Casual Shirt",
    price: 45,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
    img: "images/img-1.jpg",
  },
  {
    id: "aeou2",
    name: "Office Shirt",
    price: 100,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
    img: "images/img-2.jpg",
  },
  {
    id: "aeou3",
    name: "T Shirt",
    price: 25,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
    img: "images/img-3.jpg",
  },
  {
    id: "aeou4",
    name: "Men's Suit",
    price: 300,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
    img: "images/img-4.jpg",
  },
];

let basket = JSON.parse(localStorage.getItem("data")) || [];

let generateShop = () => {
  return (shop.innerHTML = shopItemsData
    .map((item) => {
      let { id, name, price, desc, img } = item;
      let searchItemID = basket.find((item) => item.id === id) || [];
      return `<div id=product-id-${id} class="item">
      <img width="220" src=${img} alt="" />
      <div class="details">
        <h3>${name}</h3>
        <p>${desc}</p>
        <div class="price-quantity">
          <h2>$ ${price}</h2>
          <div class="buttons">
            <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
            <div id=${id} class="quantity">${
        searchItemID.quantity === undefined ? 0 : searchItemID.quantity
      }</div>
            <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
          </div>
        </div>
      </div>
    </div>`;
    })
    .join(""));
};

generateShop();

let increment = (id) => {
  let selectedItem = id;
  let basketSearch = basket.find((item) => item.id === selectedItem.id);

  if (basketSearch === undefined) {
    basket.push({
      id: selectedItem.id,
      quantity: 1,
    });
  } else {
    basketSearch.quantity += 1;
  }
  localStorage.setItem("data", JSON.stringify(basket));
  //   console.log(basket);
  update(selectedItem.id);
};

let decrement = (id) => {
  let selectedItem = id;
  let basketSearch = basket.find((item) => item.id === selectedItem.id);

  if (basketSearch.quantity === 0) {
    return;
  } else {
    basketSearch.quantity -= 1;
  }
  localStorage.setItem("data", JSON.stringify(basket));
  //   console.log(basket);
  update(selectedItem.id);
};

let update = (id) => {
  let basketSearch = basket.find((item) => item.id === id);
  // console.log(basketSearch.quantity);
  document.getElementById(id).innerHTML = basketSearch.quantity;
  calculation();
};

let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket
    .map((item) => item.quantity)
    .reduce((a, b) => a + b, 0);
};

calculation();
