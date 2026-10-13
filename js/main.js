(function () {
  'use strict';

  var inputs = document.querySelectorAll('.variant__input');
  var skuEl = document.getElementById('sku');
  var priceEl = document.getElementById('price');
  var oldPriceEl = document.getElementById('old-price');
  var cartBtn = document.getElementById('add-to-cart');

  function formatPrice(value) {
    var num = Number(value);
    var hasFraction = num % 1 !== 0;
    return num.toLocaleString('ru-RU', {
      minimumFractionDigits: hasFraction ? 2 : 0,
      maximumFractionDigits: 2
    }) + ' ₽';
  }

  function update(input) {
    var d = input.dataset;
    var price = Number(d.price);
    var oldPrice = Number(d.oldPrice);

    skuEl.textContent = d.sku;
    priceEl.textContent = formatPrice(price);
    oldPriceEl.hidden = !(oldPrice > price);
    oldPriceEl.textContent = formatPrice(oldPrice);
  }

  function animatePrice() {
    priceEl.classList.remove('is-changed');
    void priceEl.offsetWidth;
    priceEl.classList.add('is-changed');
  }

  inputs.forEach(function (input) {
    input.addEventListener('change', function () {
      update(input);
      animatePrice();
    });
  });

  update(document.querySelector('.variant__input:checked'));

  var timer;
  cartBtn.addEventListener('click', function () {
    cartBtn.textContent = 'Добавлено ✓';
    cartBtn.classList.add('is-added');
    clearTimeout(timer);
    timer = setTimeout(function () {
      cartBtn.textContent = 'В корзину';
      cartBtn.classList.remove('is-added');
    }, 1500);
  });
})();
