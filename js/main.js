'use strict';

// Импорт различных функций в проект
import {togCartStatus, calcCartPrice, getProducts, Card} from './functions.js';

// Вызов функции для рендеринга карточек
getProducts();

window.addEventListener('click', (e) => {

    let cartWrapper = document.querySelector('.cart-wrapper');
    let totalPrice = document.querySelector('.total-price');

    switch (e.target.dataset.action) {
        case 'minus':
        case 'plus':
            const countWrap = e.target.closest(".counter-wrapper");
            const counter = countWrap.querySelector("[data-counter]");
            switch (e.target.dataset.action) {
                case 'plus':
                    ++counter.innerText;
                    calcCartPrice();
                    break;
                case 'minus':
                    if (counter.innerText > 1) {
                        --counter.innerText;
                    }else if (counter.closest('.cart-wrapper') && counter.innerText <= 1) {
                        e.target.closest('.cart-wrapper .cart-item').remove();
                        togCartStatus();
                        totalPrice.innerText = 0;
                    }
                    calcCartPrice();
                    break;
            }
            break;
    }

    if (e.target.hasAttribute("data-cart")) {
        const card = e.target.closest('.card');
        const prodPrice = card.querySelector('.price__currency').innerText.replace('₽', '').trim();
        const prodCount = card.querySelector('.items__current').innerText;

        const prodSumm = +prodCount * +prodPrice;

        let cardObj = new Card(
            card.dataset.id,
            `${card.querySelector('.product-img').src.replace(window.location.href, '')}`,
            card.querySelector('.item-title').innerText,
            card.querySelector('[data-items-in-box]').innerText,
            prodCount,
            prodSumm,
            card.querySelector('.price__weight').innerText
        );

        const itemCart = cartWrapper.querySelector(`[data-id="${cardObj.id}"]`);

        if (itemCart) {
            const countElem = itemCart.querySelector('[data-counter]');
            countElem.innerText = +countElem.innerText + +cardObj.count;
        }else {
            cardObj.addToCart();
            togCartStatus();
        }
        calcCartPrice();
        
        card.querySelector('.items__current').innerText = 1; 
    }
});