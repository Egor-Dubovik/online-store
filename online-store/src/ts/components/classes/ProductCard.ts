import { IProductCardData, IProductCard, IСard } from '../../interfaces/product.interface';
import { AvailabilityOptions } from '../../types/card.types';
import { Numbers, INITIAL_STEP, MAX_VISIBLE_CARDS_AMOUNT } from '../../constants/numbers';
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

  createСard(
    name: string,
    brend: string,
    price: number,
    oldPrice: number | string,
    year: number,
    rating: number,
    amount: number,
    src: string,
    details: string[],
    color: string[],
    popular: boolean,
    favorite: boolean
  ) {
    const { text, icon } = this.checkAvailability(amount);
    let { basketClass } = this.checkAvailability(amount);
    let cardClass: string;

    cardClass = 'cards__card card';

    if (favorite) {
      cardClass += ' _active';
      basketClass += ' _active';
    }

    oldPrice ? (oldPrice = '$' + oldPrice) : oldPrice;

    return (`
          <div class="${cardClass}" data-color="${color}" data-popular="${popular}" data-brend="${brend}" data-year="${year}" data-price="${price} "data-src="${src}" data-details="${details.toString()}" data-name="${name}" data-favorite="${favorite}">
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
              <li class="card__description">${details.toString()}</li>
              <li class="card__purchase-info">
                <div class="card__prices">
                  <p class="card__price card__price_old">${oldPrice}</p>
                  <p class="card__price">$${price}</p>
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
        product.details,
        product.color,
        product.popular,
        product.favorite
      );
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
