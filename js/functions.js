const cartWrap = document.querySelector('.cart-wrapper');
const cartEmpty = document.querySelector('[data-cart-empty]');
const orderForm = document.getElementById('order-form');
const products = document.querySelector('.products__wrapper');


// Создание чертежа(класса) обьекта для карточек
export class Card {

	// Конструктор для инициализации св-в обьекта
	constructor(id, image, title, piece, count, price, gramms) {
		this.id = id;
		this.image = image;
		this.title = title;
        this.piece = piece;
		this.count = count;
        this.price = price;
		this.gramms = gramms;
	}

	// Добавление обьекта карточки
	addToCart() {
        cartWrap.insertAdjacentHTML('beforeend', `
            <div class="cart-item" data-id=${this.id}>
                <div class="cart-item__top">

                    <div class="cart-item__img">
                        <img src='${this.image}' alt="">
                    </div>

                    <div class="cart-item__desc">
                        <div class="cart-item__title">${this.title}</div>
                        <div class="cart-item__weight">${this.piece} / ${this.gramms}</div>

                        <div class="cart-item__details">

                            <div class="items items--small counter-wrapper">
                                <div class="items__control" data-action="minus">-</div>
                                <div class="items__current" data-counter="1">${this.count}</div>
                                <div class="items__control" data-action="plus">+</div>
                            </div>

                            <div class="price">
                                <div class="price__currency">${this.price}</div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        `);
	}
}
export function togCartStatus() {

    if (cartWrap.children.length > 0) {

        cartEmpty.classList.add('hidden');
        orderForm.classList.remove('hidden');

    }else {

        cartEmpty.classList.remove('hidden');
        orderForm.classList.add('hidden');

    }

}
export function calcCartPrice() {
    
    let cardTotalPrice = 0;

    const totalPrice = document.querySelector('.total-price');
    const cartItems = document.querySelectorAll('.cart-item');

    cartItems.forEach((item) => {
        const amElem = item.querySelector('[data-counter]');
        const priceElem = item.querySelector('.price__currency');
        
        cardTotalPrice += +amElem.innerText * +priceElem.innerText.replace("₽", "").trim();
        totalPrice.innerText = cardTotalPrice;
    }); 
}
export async function getProducts() {
    
    let responce = await fetch('./js/products.json');
    let productsArray = await responce.json();

    productsArray.forEach(function (item) {
        const productHTML = `
            <div class="col-md-6">
                <div class="card mb-4" data-id="${item.id}">
                    <img class="product-img" src="img/roll/${item.imgSrc}" alt="">
                    <div class="card-body text-center">
                        <h4 class="item-title">${item.title}</h4>
                        <p><small data-items-in-box class="text-muted">${item.itemsInBox} шт.</small></p>

                        <div class="details-wrapper">
                            <div class="items counter-wrapper">
                                <div class="items__control" data-action="minus">-</div>
                                <div class="items__current" data-counter>1</div>
                                <div class="items__control" data-action="plus">+</div>
                            </div>

                            <div class="price">
                                <div class="price__weight">${item.weight}г.</div>
                                <div class="price__currency">${item.price} ₽</div>
                            </div>
                        </div>

                        <button data-cart type="button" class="btn btn-block btn-outline-warning">в корзину</button>

                    </div>
                </div>
            </div>
        `;
        products.insertAdjacentHTML("beforeend", productHTML);
    });
}