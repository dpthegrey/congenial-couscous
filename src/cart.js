let basket = JSON.parse(localStorage.getItem("data")) || [];

let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket
    .map((item) => item.quantity)
    .reduce((a, b) => a + b, 0);
};

calculation();
