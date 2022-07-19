import { Filter } from './filter';
import { IProductCardData } from '../../interfaces/product.interface';
import { removeClasses, toggleClasses } from '../baseFunctions';
import { INITIAL_STEP, SEARCH_TIME, Numbers } from '../../constants/numbers';

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
const navigationBlock = document.querySelector('.header__navigation') as HTMLElement;
const menuButton = document.querySelector('.icon-menu') as HTMLButtonElement;
const searchForm = document.querySelector('.header__search-form') as HTMLFormElement;
const infoList = document.querySelector('.header-top__info-list') as HTMLElement;

export class App extends Filter {
  public basketAmount: number;

  constructor(allProductCards: IProductCardData[], curentRenderCards: IProductCardData[]) {
    super(allProductCards, curentRenderCards);
    this.basketAmount = 0;
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

    if (targetElement.closest('.header__search-button')) event.preventDefault();

    if (targetElement.closest('.header-search__button_clean')) {
      searchInput.value = '';
      this.searchProductCards();
    }

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

    // add card to basket ---------------------------------------------------
    if (targetElement.closest('.card__add-to-basket')) {
      const card = targetElement.closest('.card') as HTMLDivElement;
      // check empty rroduct card
      if (targetElement.closest('._empty')) {
        const emptyPopapData = `
        <p class="info-popap__data">Call us for check availability ;)</p>
        <a class="popap__phone-link phone-link" href="tel: 001234 5678">(00) 1234 5678</a>`;
        const emptyPopapImg = 'availability.jpg';

        this.updatePopapData(emptyPopapData, emptyPopapImg);
        basketPopap.classList.add('_active');
        return;
      }

      if (!targetElement.closest('._active')) {
        if (this.basketAmount >= Numbers.five) {
          const fullPopapData = `<p class="info-popap__data">I'm so sory, but you took too much items!</p>`;
          const fullPopapImg = 'full.jpg';

          this.updatePopapData(fullPopapData, fullPopapImg);
          basketPopap.classList.add('_active');
          return;
        }

        this.changeCardStatus(card, true);

        card.classList.add('_active');
        targetElement.classList.add('_active');

        basketList.innerHTML += `
        <li class="basket-list__item" data-name="${card.dataset.name}">
          <p class="basket-list__item-amount"><span>1</span> x</p>
          <div class="basket-list__item-image-block">
            <img src="${card.dataset.src}" class="basket-list__item-image">
          </div>
          <p class="basket-list__item-description">${card.dataset.ditails}</p>
          <div class="basket-list__item-buttons">
            <button class="basket-list__itebasket-list__item-button_remove">
              <img src="./assets/images/svg/mycart-remove.svg" alt="icon remove carts item">
            </button>
            <button class="basket-list__itebasket-list__item-button_edit">
              <img src="./assets/images/svg/mycart-edit.svg" alt="icon edit carts item">
            </button>
          </div>
        </li>`;

        this.basketAmount += Numbers.one;
        basketAmount.forEach((amount) => (amount.textContent = `${this.basketAmount}`));
      } else {
        const basketItems = document.querySelectorAll(
          '.basket-list__item'
        ) as NodeListOf<HTMLLIElement>;

        this.changeCardStatus(card, false);

        basketItems.forEach((item) => {
          if (item.dataset.name === card.dataset.name) {
            item.remove();
            card.classList.remove('_active');
            targetElement.classList.remove('_active');

            this.basketAmount -= Numbers.one;
            basketAmount.forEach((amount) => (amount.textContent = `${this.basketAmount}`));
          }
        });
      }
    }

    if (targetElement.closest('.popap__button-close')) {
      targetElement.closest('.popap')?.classList.remove('_active');
    }
  }

  changeCardStatus(card: HTMLDivElement, status: boolean) {
    this.allProductCards.forEach((productCard) => {
      if (card.dataset.name === productCard.name) productCard.favorite = status;
    });
  }

  updatePopapData(data: string, img: string) {
    popapData.innerHTML = data;
    popapImage.innerHTML = `<img src="./assets/images/content-img/basket/${img}" alt="busket represent">`;
  }

  searchProductCards() {
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

      this.counterVisibleCards = Numbers.sixteen;
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
}
