import { IProductCardData, IProductCard } from '../../interfaces/product.interface';
import { AvailabilityOptions } from '../../types/card.types';
import { Numbers, INITIAL_STEP, MAX_VISIBLE_CARDS_AMOUNT } from '../../constants/numbers';
import { SortingType } from '../../types/card.types';
import { Sort } from '../../constants/strings';
import { buttonShowMore, sectionCards } from '../../pages/main/index';

export class ProductCard implements IProductCard {
  public counterVisibleCards: number;
  readonly allProductCards: IProductCardData[];
  public curentRenderCards: IProductCardData[];

  constructor(allProductCards: IProductCardData[], curentRenderCards: IProductCardData[]) {
    this.allProductCards = allProductCards;
    this.curentRenderCards = curentRenderCards;
    this.counterVisibleCards = MAX_VISIBLE_CARDS_AMOUNT;
  }

  createProductRating(rating: number): string {
    let starsBlock = '';

    for (let i = INITIAL_STEP; i < Numbers.five; i++) {
      let star = '';
      i < rating
        ? (star = `<li class="position__star position__star_yellow _icon-cart-star"></li>`)
        : (star = `<li class="position__star _icon-cart-star"></li>`);
      starsBlock += star;
    }

    return starsBlock;
  }

  checkAvailability(amount: number): AvailabilityOptions {
    let availabilityText = '<p class="position__text position__text_green">in stock</p>' as string;
    let availabilityIcon = './assets/images/svg/in-stock.svg' as string;
    let basketClass = 'card__add-to-basket _icon-basket';
    if (amount == Numbers.zero) {
      availabilityText = '<p class="position__text position__text_red">check availability</p>';
      availabilityIcon = './assets/images/svg/check-availability.svg';
      basketClass = 'card__add-to-basket _empty _icon-basket';
    }

    return { text: availabilityText, icon: availabilityIcon, basketClass: basketClass };
  }

  createСard(productData: IProductCardData): HTMLDivElement {
    const { text, icon } = this.checkAvailability(productData.amount);
    let { basketClass } = this.checkAvailability(productData.amount);
    let cardClass = 'cards__card card';
    let oldPrice: string | number;

    if (productData.favorite) {
      cardClass += ' _active';
      basketClass += ' _active';
    }

    productData.oldPrice
      ? (oldPrice = '$' + productData.oldPrice)
      : (oldPrice = productData.oldPrice);

    return (`
          <div class="${cardClass}" data-color="${productData.color}" data-popular="${
      productData.popular
    }" data-brend="${productData.brend}" data-year="${productData.year}" data-price="${
      productData.price
    } "data-src="${productData.src}" data-details="${productData.details.toString()}" data-name="${
      productData.name
    }" data-favorite="${productData.favorite}">
            <ul class="card__container">
              <li class="card__availability">
                <img src="${icon}" alt="availability icon">
                ${text}
              </li>
              <li class="card__image-block">
                <a class="card__link" href="">
                  <img class="card__image" src="${productData.src} "alt="product image">
                </a>
              </li>
              <li class="card__position position">
              <ul class="position__stars">
              ${this.createProductRating(productData.rating)}
              </ul>
                <p class="position__text">Reviews <span>(${productData.rating})</span></p>
              </li>
              <li class="card__main-info">
                <h4 class="card__title">${productData.name}</h4>
                <p class="position__year">${productData.year}</p>
              </li>
              <li class="card__description">${productData.details.toString()}</li>
              <li class="card__purchase-info">
                <div class="card__prices">
                  <p class="card__price card__price_old">${oldPrice}</p>
                  <p class="card__price">$${productData.price}</p>
                </div>
                <div class="${basketClass}"></div>
              </li>
            </ul>
        </div>` as unknown) as HTMLDivElement;
  }

  displayCards(productCards: IProductCardData[], section = sectionCards): void {
    section.innerHTML = '';
    this.curentRenderCards = productCards;

    if (productCards.length > this.counterVisibleCards) {
      buttonShowMore.classList.add('_active');
    } else {
      buttonShowMore.classList.remove('_active');
      this.counterVisibleCards = this.curentRenderCards.length;
    }

    for (let i = INITIAL_STEP; i < this.counterVisibleCards; i++) {
      const productData = productCards[i];
      const productCard = this.createСard(productData);
      section.innerHTML += productCard;
    }
  }

  showMore(): void {
    this.counterVisibleCards += MAX_VISIBLE_CARDS_AMOUNT;
    this.displayCards(this.curentRenderCards);
  }

  sortProductCard(sortSelect: HTMLSelectElement, sectionCards: HTMLElement): void {
    const selectData = sortSelect.value.split(',');
    let sortProductCards: IProductCardData[];
    let sortingType: SortingType;

    selectData[Numbers.zero] === Sort.year ? (sortingType = Sort.year) : (sortingType = Sort.price);

    if (selectData[Numbers.one] === Sort.ascending) {
      sortProductCards = this.curentRenderCards.sort(
        (firstCard, secondCard): number =>
          firstCard[`${sortingType}`] - secondCard[`${sortingType}`]
      );
    } else {
      sortProductCards = this.curentRenderCards.sort(
        (firstCard, secondCard): number =>
          secondCard[`${sortingType}`] - firstCard[`${sortingType}`]
      );
    }

    this.displayCards(sortProductCards, sectionCards);
  }
}
