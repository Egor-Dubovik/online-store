import { IProductCardData, IProductCard } from '../../interfaces/product.interface';
import { AvailabilityOptions } from '../../types/card.types';
import { Numbers, INITIAL_STEP } from '../../constants/numbers';
import { SortingType } from '../../types/card.types';
import { Sort } from '../../constants/strings';

export class ProductCard implements IProductCard {
  readonly allProductCards: IProductCardData[];
  public visibleProductCards: IProductCardData[];

  constructor(allProductCards: IProductCardData[], visibleProductCards: IProductCardData[]) {
    this.allProductCards = allProductCards;
    this.visibleProductCards = visibleProductCards;
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

    if (amount == 0) {
      availabilityText = '<p class="position__text position__text_red">check availability</p>';
      availabilityIcon = './assets/images/svg/check-availability.svg';
    }

    return { text: availabilityText, icon: availabilityIcon };
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
    popular: boolean
  ): HTMLDivElement => {
    const { text, icon } = this.checkAvailability(amount);

    oldPrice ? (oldPrice = '$' + oldPrice) : oldPrice;
  //   <li class="card__image-block">
  //   ${color}
  // </li>
    return (`
          <div class="cards__card card" data-color="${color}" data-popular="${popular}" data-brend="${brend}" data-year="${year}" data-price="${price}">
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
                <div class="card__add-to-basket _icon-basket"></div>
              </li>
            </ul>
        </div>` as unknown) as HTMLDivElement;
  };

  displayCards(sectionCards: HTMLElement, productCards: IProductCardData[]): void {
    sectionCards.innerHTML = '';

    for (let i = INITIAL_STEP; i < productCards.length; i++) {
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
        product.popular
      );
      sectionCards.innerHTML += productCard;
    }
  }

  sortProductCard(sortSelect: HTMLSelectElement, sectionCards: HTMLElement) {
    const selectData = sortSelect.value.split(',');
    let sortProductCards: IProductCardData[];
    let sortingType: SortingType;

    selectData[Numbers.zero] === Sort.year ? (sortingType = Sort.year) : (sortingType = Sort.price);

    if (selectData[Numbers.one] === Sort.ascending) {
      sortProductCards = this.visibleProductCards.sort(
        (firstCard, secondCard): number =>
          firstCard[`${sortingType}`] - secondCard[`${sortingType}`]
      );
    } else {
      sortProductCards = this.visibleProductCards.sort(
        (firstCard, secondCard): number =>
          secondCard[`${sortingType}`] - firstCard[`${sortingType}`]
      );
    }

    this.displayCards(sectionCards, sortProductCards);
  }
}
