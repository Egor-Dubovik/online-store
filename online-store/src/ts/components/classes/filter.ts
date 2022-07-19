import { sortSelect, sectionCards } from '../../index';
import { FilteringType } from '../../types/card.types';
import { IProductCardData } from '../../interfaces/product.interface';
import { Numbers } from '../../constants/numbers';
import { Filtering } from '../../constants/strings';
import { ProductCard } from './ProductCard';
import { INITIAL_STEP } from '../../constants/numbers';

export class Filter extends ProductCard {
  constructor(allProductCards: IProductCardData[], curentRenderCards: IProductCardData[]) {
    super(allProductCards, curentRenderCards);
  }

  filterProductCards() {
    const brendFilter = document.querySelector('.filter__select') as HTMLSelectElement;
    const popularFilter = document.querySelector('.filter__input_popular') as HTMLInputElement;
    const colorFilter = document.querySelectorAll(
      '.filter__color-input'
    ) as NodeListOf<HTMLInputElement>;
    const priceFilter = document.querySelectorAll(
      '.filter__slider-range_price .noUi-tooltip'
    ) as NodeListOf<Element>;
    const positionFilter = document.querySelectorAll(
      '.filter__slider-range_position .noUi-tooltip'
    ) as NodeListOf<Element>;

    this.counterVisibleCards = Numbers.sixteen;

    const copyAllProductCards = [...this.allProductCards];
    let filteringProductCards: IProductCardData[];

    filteringProductCards = this.rangeSliderFiltering(
      priceFilter[Numbers.zero].textContent as string,
      priceFilter[Numbers.one].textContent as string,
      Filtering.price,
      copyAllProductCards
    );

    filteringProductCards = this.rangeSliderFiltering(
      positionFilter[Numbers.zero].textContent as string,
      positionFilter[Numbers.one].textContent as string,
      Filtering.position,
      filteringProductCards
    );

    if (brendFilter.value !== 'all')
      filteringProductCards = this.filterByValue(
        brendFilter.value,
        Filtering.brend,
        filteringProductCards
      );

    if (popularFilter.checked) {
      filteringProductCards = this.filterByValue(
        popularFilter.checked,
        Filtering.popular,
        filteringProductCards
      );
    }

    const checkedColors: string[] = [];
    colorFilter.forEach((color) => {
      if (color.checked) checkedColors.push(color.value);
    });

    if (checkedColors.length) {
      filteringProductCards = this.filterByColor(checkedColors, filteringProductCards);
    }

    this.curentRenderCards = filteringProductCards;
    this.sortProductCard(sortSelect, sectionCards);
  }

  rangeSliderFiltering(
    minimumValue: string,
    maximumValue: string,
    filterOption: FilteringType,
    productCards: IProductCardData[]
  ) {
    let index = INITIAL_STEP;

    while (index < productCards.length) {
      const card = productCards[index];

      if (card[`${filterOption}`] > +maximumValue || card[`${filterOption}`] < +minimumValue) {
        productCards.splice(index, Numbers.one)[Numbers.zero];
      } else {
        ++index;
      }
    }
    return productCards;
  }

  filterByValue(
    value: string | boolean,
    filterOption: FilteringType,
    productCards: IProductCardData[]
  ) {
    let index = INITIAL_STEP;

    while (index < productCards.length) {
      const card = productCards[index];

      if (card[`${filterOption}`] !== value) {
        productCards.splice(index, Numbers.one)[Numbers.zero];
      } else {
        ++index;
      }
    }
    return productCards;
  }

  filterByColor(colors: string[], productCards: IProductCardData[]) {
    let index = INITIAL_STEP;

    while (index < productCards.length) {
      const card = productCards[index];

      colors.forEach((color) => {
        if (!card.color.join(',').includes(color)) {
          productCards.splice(index, Numbers.one)[Numbers.zero];
        } else {
          ++index;
        }
        console.log(card.color.join(',').includes(color), card.color.join(','), color);
      });
    }

    return productCards;
  }
}
