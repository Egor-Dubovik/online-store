import { sortSelect, sectionCards } from '../pages/main/index';
import { FilteringType } from '../types/card.types';
import { IProductCardData, IFilters } from '../interfaces/product.interface';
import { Numbers } from '../constants/numbers';
import { Filtering } from '../constants/strings';
import { ProductCard } from '../components/classes/ProductCard';
import { INITIAL_STEP, MAX_VISIBLE_CARDS_AMOUNT } from '../constants/numbers';
import { brendFilter, colorFilter, popularFilter } from '../components/classes/App';
import { storage } from '../components/base/localStorage';
import { BrendOptions } from '../constants/strings';
import {
  MAXIMUM_PRICE,
  MINIMUM_POCITION,
  MAXIMUM_POCITION,
  MINIMUM_PRICE,
} from '../constants/numbers';

const rangeSliders = document.querySelectorAll('.filter__slider-range') as NodeListOf<HTMLElement>;

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
    this.counterVisibleCards = MAX_VISIBLE_CARDS_AMOUNT;

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

    colorFilter.forEach((color: HTMLInputElement): void => {
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
        continue;
      }

      ++index;
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
        continue;
      }
      ++index;
    }

    return productCards;
  }

  filterByColor(color: string, productCards: IProductCardData[]) {
    let index = INITIAL_STEP;

    while (index < productCards.length) {
      const card = productCards[index];

      if (!card.color.join(',').includes(color)) {
        productCards.splice(index, Numbers.one)[Numbers.zero];
        continue;
      }
      ++index;
    }

    return productCards;
  }

  saveData(priceFilter: NodeListOf<HTMLElement>, positionFilter: NodeListOf<HTMLElement>): void {
    this.filters.brend = brendFilter.value;
    this.filters.price.minimum = priceFilter[Numbers.zero].textContent as string;
    this.filters.price.maximum = priceFilter[Numbers.one].textContent as string;
    this.filters.rating.minimum = positionFilter[Numbers.zero].textContent as string;
    this.filters.rating.maximum = positionFilter[Numbers.one].textContent as string;

    this.filters.popular = '' + popularFilter.checked;

    colorFilter.forEach((color: HTMLInputElement): void => {
      this.filters.color = '';
      if (color.checked) this.filters.color = color.value;
    });

    storage.set('filters', JSON.stringify(this.filters));
  }

  saveAndFilterData(): void {
    const priceFilter = document.querySelectorAll(
      '.filter__slider-range_price .noUi-tooltip'
    ) as NodeListOf<HTMLElement>;
    const positionFilter = document.querySelectorAll(
      '.filter__slider-range_position .noUi-tooltip'
    ) as NodeListOf<HTMLElement>;
    this.filterProductCards(brendFilter, popularFilter, colorFilter, priceFilter, positionFilter);
    this.saveData(priceFilter, positionFilter);
  }

  clearFilters(): void {
    brendFilter.value = BrendOptions.all;
    colorFilter.forEach((color: HTMLInputElement): void => {
      if (color.checked) color.checked = false;
    });

    rangeSliders.forEach((slider: HTMLElement): void => {
      if (slider.closest('.filter__slider-range_price')) {
        slider.noUiSlider.set([MINIMUM_PRICE, MAXIMUM_PRICE]);
      } else {
        slider.noUiSlider.set([MINIMUM_POCITION, MAXIMUM_POCITION]);
      }
    });
    this.saveAndFilterData();
  }
}
