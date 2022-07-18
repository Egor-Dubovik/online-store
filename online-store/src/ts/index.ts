import './components/slider';
import './components/range-slider';
import '../scss/style.scss';
import cardJson from '../assets/products.json';
import { App } from './components/classes/App';

export const sectionCards = document.querySelector('.cards') as HTMLElement;
export const sortSelect = document.querySelector('.sorting') as HTMLSelectElement;

// const productCards: IProductCardData[] = cardJson.laptops;
const app = new App(cardJson.laptops, cardJson.laptops);

// First cards rendering
app.sortProductCard(sortSelect, sectionCards);

// Listeners -------------------------------------------------------------------
document.addEventListener('click', app.eventHandling.bind(app));
sortSelect.addEventListener('change', app.sortProductCard.bind(app, sortSelect, sectionCards));

// const noUiConnect = document.querySelectorAll('.noUi-connect') as NodeListOf<Element>;
// noUiConnect.forEach((content) =>
//   content.addEventListener('transitionend', app.cardFiltering.bind(app))
// );
