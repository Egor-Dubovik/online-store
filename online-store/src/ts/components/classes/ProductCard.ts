import { IProductCardData, IProductCard } from '../../interfaces/product.interface';
import { AvailabilityOptions } from '../../types/card.types';
import { Numbers, INITIAL_STEP } from '../../constants/numbers';
import { SortingType } from '../../types/card.types';
import { Sort } from '../../constants/strings';
import { buttonShowMore, sectionCards } from '../../index';

export class ProductCard implements IProductCard {
  public counterVisibleCards: number;
  readonly allProductCards: IProductCardData[];
  public curentRenderCards: IProductCardData[];

  constructor(allProductCards: IProductCardData[], curentRenderCards: IProductCardData[]) {
    this.allProductCards = allProductCards;
    this.curentRenderCards = curentRenderCards;
    this.counterVisibleCards = Numbers.sixteen;
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
    if (amount == 0) {
      availabilityText = '<p class="position__text position__text_red">check availability</p>';
      availabilityIcon = './assets/images/svg/check-availability.svg';
      basketClass = 'card__add-to-basket _empty _icon-basket';
    }

    return { text: availabilityText, icon: availabilityIcon, basketClass: basketClass };
  }

  createСard = (
    name: string,
    brend: string,
    price: number,
    oldPrice: number | string,
    year: number,
    rating: number,
    amount: number,
    src: string,
    ditails: string[],
    color: string[],
    popular: boolean,
    favorite: boolean
  ): HTMLDivElement => {
    const { text, icon } = this.checkAvailability(amount);
    let { basketClass } = this.checkAvailability(amount);
    let cardClass: string;

    if (favorite) {
      cardClass = 'cards__card card _active';
      basketClass += ' _active';
    } else {
      cardClass = 'cards__card card';
    }

    oldPrice ? (oldPrice = '$' + oldPrice) : oldPrice;
    //   <li class="card__image-block">
    //   ${color}
    // </li>
    return (`
          <div class="${cardClass}" data-color="${color}" data-popular="${popular}" data-brend="${brend}" data-year="${year}" data-price="${price} "data-src="${src}" data-ditails="${ditails.toString()}" data-name="${name}">
            <ul class="card__container">
              <li class="card__availability">
                <img src="${icon}" alt="availability icon">
                ${text}
              </li>
              <li class="card__image-block">
                <a class="card__link" href="">
                  <img class="card__image" src="${src} "alt="product image">
                </a>
              </li>
              <li class="card__position position">
              <ul class="position__stars">
              ${this.createProductRating(rating)}
              </ul>
                <p class="position__text">Reviews <span>(${rating})</span></p>
              </li>
              <li class="card__main-info">
                <h4 class="card__title">${name}</h4>
                <p class="position__year">${year}</p>
              </li>
              <li class="card__description">${ditails.toString()}</li>
              <li class="card__purchase-info">
                <div class="card__prices">
                  <p class="card__price card__price_old">${oldPrice}</p>
                  <p class="card__price">$${price}</p>
                </div>
                <div class="${basketClass}"></div>
              </li>
            </ul>
        </div>` as unknown) as HTMLDivElement;
  };

  displayCards(productCards: IProductCardData[], section = sectionCards): void {
    section.innerHTML = '';
    this.curentRenderCards = productCards;

    if (productCards.length >= this.counterVisibleCards) {
      buttonShowMore.classList.add('_active');
    } else {
      buttonShowMore.classList.remove('_active');
      this.counterVisibleCards = this.curentRenderCards.length;
    }

    for (let i = INITIAL_STEP; i < this.counterVisibleCards; i++) {
      const product = productCards[i];
      const productCard = this.createСard(
        product.name,
        product.brend,
        product.price,
        product.oldPrice,
        product.year,
        product.rating,
        product.amount,
        product.src,
        product.ditails,
        product.color,
        product.popular,
        product.favorite
      );
      section.innerHTML += productCard;
    }
  }

  showMore() {
    this.counterVisibleCards += Numbers.sixteen;
    this.displayCards(this.curentRenderCards);
  }

  sortProductCard(sortSelect: HTMLSelectElement, sectionCards: HTMLElement) {
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
