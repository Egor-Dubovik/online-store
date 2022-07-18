import { ProductCard } from './ProductCard';
import { IProductCardData } from '../../interfaces/product.interface';
import { removeClasses, toggleClasses } from '../baseFunctions';
import { INITIAL_STEP, Numbers } from '../../constants/numbers';
import { FilteringType } from '../../types/card.types';
import { sortSelect, sectionCards } from '../../index';
import { Filtering } from '../../constants/strings';

const searchButton = document.querySelector('.header-search__button') as HTMLButtonElement;
const navigationBlock = document.querySelector('.header__navigation') as HTMLElement;
const menuButton = document.querySelector('.icon-menu') as HTMLButtonElement;
const searchForm = document.querySelector('.header__search-form') as HTMLFormElement;
const searchInput = document.querySelector('.header__search-input') as HTMLInputElement;
const infoList = document.querySelector('.header-top__info-list') as HTMLElement;

export class App extends ProductCard {
  filteringProductCards: IProductCardData[];

  constructor(allProductCards: IProductCardData[], visibleProductCards: IProductCardData[]) {
    super(allProductCards, visibleProductCards);
    this.filteringProductCards = [];
  }

  toggleInputSearch(): void {
    toggleClasses([searchForm, searchButton], '_active');
    navigationBlock.classList.toggle('_hidden');
    searchInput.focus();
  }

  toggleBurgerMenu(): void {
    toggleClasses([menuButton, navigationBlock], '_active');
    removeClasses([searchForm, searchButton], '_active');
    navigationBlock.classList.remove('_hidden');
  }

  eventHandling(event: Event) {
    const targetElement = event.target as HTMLElement;
    if (targetElement.closest('.icon-menu')) {
      this.toggleBurgerMenu();
    }

    if (targetElement.closest('.header-search__button')) {
      this.toggleInputSearch();
    }

    // Infolist events processing
    if (targetElement.closest('.header-top__timetable-button')) {
      infoList.classList.toggle('_active');
    }

    if (
      infoList.classList.contains('_active') &&
      !targetElement.closest('.header-top__info-list') &&
      !targetElement.closest('.header-top__timetable-button')
    ) {
      infoList.classList.remove('_active');
    }
    // filtering
    if (targetElement.closest('.filters__button_apply')) {
      this.filterProductCards();
    }

    if (targetElement.closest('.filter__color-input')) {
      targetElement.classList.toggle('_active');
    }
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

    // console.log(a);
    this.visibleProductCards = filteringProductCards;
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
      // console.log();
      
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
