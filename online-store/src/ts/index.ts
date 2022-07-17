import './components/slider';
import './components/range-slider';
import '../scss/style.scss';
import cardJson from '../assets/products.json';
import { App } from './components/classes/App';
import { IProductCardData } from './interfaces/product.interface';

const sectionCards = document.querySelector('.cards') as HTMLElement;
// const sortSelect = document.querySelector('.sorting') as HTMLSelectElement;

const productCards: IProductCardData[] = cardJson.laptops;
const app = new App();

// First cards rendering
app.displayCards(sectionCards, productCards);

// Listeners -------------------------------------------------------------------
document.addEventListener('pointerdown', app.eventHandling.bind(app));

