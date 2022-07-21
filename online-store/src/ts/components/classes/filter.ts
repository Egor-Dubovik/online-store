import { sortSelect, sectionCards } from '../../index';
import { FilteringType } from '../../types/card.types';
import { IProductCardData, IFilters } from '../../interfaces/product.interface';
import { Numbers } from '../../constants/numbers';
import { Filtering } from '../../constants/strings';
import { ProductCard } from './ProductCard';
import { INITIAL_STEP } from '../../constants/numbers';

export class Filter extends ProductCard {
  filters: IFilters;

  constructor(allProductCards: IProductCardData[], curentRenderCards: IProductCardData[]) {
    super(allProductCards, curentRenderCards);
    this.filters = {
      brend: 'all',
      color: '',
      price: {
        minimum: '0',
        maximum: '6500',
      },
      rating: {
        minimum: '0',
        maximum: '5',
      },
      popular: 'false',
      sort: 'year,ascending',
    };
  }

  filterProductCards(
    brendFilter: HTMLSelectElement,
    popularFilter: HTMLInputElement,
    colorFilter: NodeListOf<HTMLInputElement>,
    priceFilter: NodeListOf<Element>,
    positionFilter: NodeListOf<Element>
  ) {
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
      Filtering.rating,
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

    colorFilter.forEach((color) => {
      if (color.checked)
        filteringProductCards = this.filterByColor(color.value, filteringProductCards);
    });

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

  filterByColor(color: string, productCards: IProductCardData[]) {
    let index = INITIAL_STEP;

    while (index < productCards.length) {
      const card = productCards[index];

      if (!card.color.join(',').includes(color)) {
        productCards.splice(index, Numbers.one)[Numbers.zero];
      } else {
        ++index;
      }
    }

    return productCards;
  }
}
