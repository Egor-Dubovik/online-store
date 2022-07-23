import './components/slider';
import cardJson from '../data/products.json';
import { App } from './components/classes/App';

export const sectionCards = document.querySelector('.cards') as HTMLElement;
export const sortSelect = document.querySelector('.sorting') as HTMLSelectElement;
export const basketList = document.querySelector('.basket-list') as HTMLElement;
export const basketAmount = document.querySelectorAll(
  '.header-basket__amount'
) as NodeListOf<Element>;
export const searchInput = document.querySelector('.header__search-input') as HTMLInputElement;
export const buttonShowMore = document.querySelector(
  '.all-products__button_show-more'
) as HTMLInputElement;
export const basketPopap = document.querySelector('.popap_basket-full') as HTMLDivElement;
export const popapData = document.querySelector('.info-popap__data') as HTMLElement;
export const popapImage = document.querySelector('.info-popap__image') as HTMLElement;

const app = new App(cardJson.laptops, cardJson.laptops);
app.init(sortSelect, sectionCards);

document.addEventListener('click', app.eventHandling.bind(app));
sortSelect.addEventListener('change', app.sortProductCard.bind(app, sortSelect, sectionCards));
buttonShowMore.addEventListener('click', app.showMore.bind(app));
searchInput.addEventListener('keyup', app.searchProductCards.bind(app));

import '../scss/style.scss';
