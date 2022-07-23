import { Filter } from './filter';
import { IProductCardData, IBasket } from '../../interfaces/product.interface';
import { removeClasses, toggleClasses } from '../base/baseFunctions';
import { storage } from '../base/localStorage';
import {
  INITIAL_STEP,
  SEARCH_TIME,
  MAXIMUM_PRICE,
  MINIMUM_POCITION,
  MAXIMUM_POCITION,
  MINIMUM_PRICE,
  MAX_VISIBLE_CARDS_AMOUNT,
  Numbers,
} from '../../constants/numbers';
import { launchRangeSlider } from '../range-slider';
import {
  searchInput,
  basketList,
  basketAmount,
  basketPopap,
  popapData,
  popapImage,
} from '../../index';
import { Filtering } from '../../constants/strings';

const searchButton = document.querySelector('.header-search__button') as HTMLButtonElement;
const basketPrice = document.querySelector('.header-basket__total-price span') as HTMLButtonElement;
const navigationBlock = document.querySelector('.header__navigation') as HTMLElement;
const menuButton = document.querySelector('.icon-menu') as HTMLButtonElement;
const searchForm = document.querySelector('.header__search-form') as HTMLFormElement;
const infoList = document.querySelector('.header-top__info-list') as HTMLElement;
const brendFilter = document.querySelector('.filter__select') as HTMLSelectElement;
const popularFilter = document.querySelector('.filter__input_popular') as HTMLInputElement;
const colorFilter = document.querySelectorAll(
  '.filter__color-input'
) as NodeListOf<HTMLInputElement>;
const rangeSliders = document.querySelectorAll('.filter__slider-range') as NodeListOf<HTMLElement>;

export class App extends Filter {
  public basketAmount: number;
  public basket: IBasket;

  constructor(allProductCards: IProductCardData[], curentRenderCards: IProductCardData[]) {
    super(allProductCards, curentRenderCards);
    this.basketAmount = 0;
    this.basket = {
      price: '0',
      amount: '0',
      items: '',
    };
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

  eventHandling(event: Event): void {
    const targetElement = event.target as HTMLElement;

    if (targetElement.closest('.header__search-button')) event.preventDefault();

    if (targetElement.closest('.header-search__button_clean')) {
      searchInput.value = '';
      this.clearFilters();
    }

    if (targetElement.closest('.icon-menu')) {
      this.toggleBurgerMenu();
    }

    if (targetElement.closest('.header-search__button')) {
      this.toggleInputSearch();
    }

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

    if (targetElement.closest('.filters__button_apply')) {
      this.saveAndFilterData();
    }

    if (targetElement.closest('.card__add-to-basket')) {
      const card = targetElement.closest('.card') as HTMLDivElement;
      const cardPrice = card.dataset.price as string;

      if (targetElement.closest('._empty')) {
        const emptyPopapData = `
        <p class="info-popap__data">Call us for check availability ;)</p>
        <a class="popap__phone-link phone-link" href="tel: 001234 5678">(00) 1234 5678</a>`;
        const emptyPopapImg = 'availability.jpg';

        this.updatePopapData(emptyPopapData, emptyPopapImg);
        basketPopap.classList.add('_active');
        return;
      }

      if (card.dataset.favorite === 'false') {
        if (this.basketAmount >= Numbers.five) {
          const fullPopapData = `<p class="info-popap__data">I'm so sory, but you took too much items!</p>`;
          const fullPopapImg = 'full.jpg';

          this.updatePopapData(fullPopapData, fullPopapImg);
          basketPopap.classList.add('_active');
          return;
        }

        this.changeCardStatus(card, true);
        card.dataset.favorite = 'true';

        card.classList.add('_active');
        targetElement.classList.add('_active');

        basketList.innerHTML += `
        <li class="basket-list__item" data-name="${card.dataset.name}">
          <p class="basket-list__item-amount"><span>1</span> x</p>
          <div class="basket-list__item-image-block">
            <img src="${card.dataset.src}" class="basket-list__item-image">
          </div>
          <p class="basket-list__item-description">${card.dataset.details}</p>
          <div class="basket-list__item-buttons">
            <button class="basket-list__itebasket-list__item-button_remove">
              <img src="./assets/images/svg/mycart-remove.svg" alt="icon remove carts item">
            </button>
            <button class="basket-list__itebasket-list__item-button_edit">
              <img src="./assets/images/svg/mycart-edit.svg" alt="icon edit carts item">
            </button>
          </div>
        </li>`;

        this.basket.price = `${+this.basket.price + +cardPrice}`;
        basketPrice.textContent = this.basket.price;

        this.basketAmount += Numbers.one;
        basketAmount.forEach(
          (amount: Element): string => (amount.textContent = `${this.basketAmount}`)
        );
      } else {
        const basketItems = document.querySelectorAll(
          '.basket-list__item'
        ) as NodeListOf<HTMLLIElement>;

        this.changeCardStatus(card, false);
        card.classList.remove('_active');
        targetElement.classList.remove('_active');

        basketItems.forEach((item: HTMLElement): void => {
          if (item.dataset.name === card.dataset.name) {
            item.remove();
            card.classList.remove('_active');
            targetElement.classList.remove('_active');

            this.basket.price = `${+this.basket.price - +cardPrice}`;
            basketPrice.textContent = this.basket.price;

            this.basketAmount -= Numbers.one;
            basketAmount.forEach(
              (amount: Element): string => (amount.textContent = `${this.basketAmount}`)
            );
          }
        });
      }
      this.saveBasketData();
    }

    if (targetElement.closest('.popap__button-close')) {
      (targetElement.closest('.popap') as HTMLDivElement).classList.remove('_active');
    }

    if (targetElement.closest('.filters__button_clear')) this.clearFilters();
    if (targetElement.closest('.adjusting-view__button')) this.clearSettings();
  }

  changeCardStatus(card: HTMLDivElement, status: boolean): void {
    card.dataset.favorite = '' + status;
    this.allProductCards.forEach((productCard: IProductCardData): void => {
      if (card.dataset.name === productCard.name) productCard.favorite = status;
    });
  }

  updatePopapData(data: string, img: string): void {
    popapData.innerHTML = data;
    popapImage.innerHTML = `<img src="./assets/images/content-img/basket/${img}" alt="busket represent">`;
  }

  searchProductCards(): void {
    const searchCards = (): void => {
      const copyAllProductCards = [...this.allProductCards];
      let index = INITIAL_STEP;

      while (index < copyAllProductCards.length) {
        const card = copyAllProductCards[index];

        if (!card[`${Filtering.name}`].toLowerCase().includes(searchInput.value)) {
          copyAllProductCards.splice(index, Numbers.one)[Numbers.zero];
        } else {
          ++index;
        }
      }

      this.counterVisibleCards = MAX_VISIBLE_CARDS_AMOUNT;
      this.displayCards(copyAllProductCards);
    };

    const debounce = (): (() => void) => {
      let timeout: number;
      return function (): void {
        clearTimeout(timeout);
        timeout = window.setTimeout(searchCards, SEARCH_TIME);
      };
    };

    const searchDebounce: () => void = debounce();
    searchDebounce();
  }

  saveData(priceFilter: NodeListOf<HTMLElement>, positionFilter: NodeListOf<HTMLElement>): void {
    this.filters.brend = brendFilter.value;
    this.filters.price.minimum = priceFilter[Numbers.zero].textContent;
    this.filters.price.maximum = priceFilter[Numbers.one].textContent;
    this.filters.rating.minimum = positionFilter[Numbers.zero].textContent;
    this.filters.rating.maximum = positionFilter[Numbers.one].textContent;
    this.filters.popular = '' + popularFilter.checked;

    colorFilter.forEach((color: HTMLInputElement): void => {
      if (color.checked) {
        this.filters.color = color.value;
      } else {
        this.filters.color = '';
      }
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

  saveBasketData(): void {
    let itemsName = '';
    const basketItems = Array.from(basketList.children) as HTMLLIElement[];

    basketItems.forEach((item: HTMLLIElement): void => {
      if (item.dataset.name) itemsName += item.dataset.name;
    });

    this.basket.items = itemsName;
    this.basket.amount = basketAmount[Numbers.zero].textContent as string;
    storage.set('basket', JSON.stringify(this.basket));
  }

  init(sortSelect: HTMLSelectElement, sectionCards: HTMLElement): void {
    const filtersData = JSON.parse(storage.get('filters'));
    const basketsData: IBasket = JSON.parse(storage.get('basket'));

    if (basketsData) {
      this.basket.price = basketsData.price;
      basketPrice.textContent = basketsData.price;

      this.allProductCards.forEach((card: IProductCardData): void => {
        if (basketsData.items.includes(card.name)) {
          this.basketAmount = +basketsData.amount;
          basketAmount[Numbers.zero].textContent = basketsData.amount;
          basketAmount[Numbers.one].textContent = basketsData.amount;
          card.favorite = true;

          basketList.innerHTML += `
          <li class="basket-list__item" data-name="${card.name}">
            <p class="basket-list__item-amount"><span>1</span> x</p>
            <div class="basket-list__item-image-block">
              <img src="${card.src}" class="basket-list__item-image">
            </div>
            <p class="basket-list__item-description">${card.details}</p>
            <div class="basket-list__item-buttons">
              <button class="basket-list__itebasket-list__item-button_remove">
                <img src="./assets/images/svg/mycart-remove.svg" alt="icon remove carts item">
              </button>
              <button class="basket-list__itebasket-list__item-button_edit">
                <img src="./assets/images/svg/mycart-edit.svg" alt="icon edit carts item">
              </button>
            </div>
          </li>`;
        }
      });
    }

    if (filtersData) {
      brendFilter.value = filtersData.brend;
      launchRangeSlider(
        +filtersData.price.minimum,
        +filtersData.price.maximum,
        +filtersData.rating.minimum,
        +filtersData.rating.maximum
      );
      colorFilter.forEach((color: HTMLInputElement): void => {
        if (color.value === filtersData.color) color.checked = true;
      });
      if (filtersData.popular === 'true') popularFilter.checked = true;
    } else {
      launchRangeSlider();
    }

    this.sortProductCard(sortSelect, sectionCards);
    this.saveAndFilterData();
  }

  clearFilters(): void {
    brendFilter.value = 'all';
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

  clearSettings(): void {
    localStorage.clear();
    this.clearFilters();
    location.reload();
  }
}
