import '../scss/style.scss';
import './components/slider';
// import json from '../assets/products.json';
import { removeClasses, toggleClasses } from './components/baseFunctions';

const searchButton = document.querySelector('.header-search__button') as HTMLButtonElement;
const navigationBlock = document.querySelector('.header__navigation') as HTMLElement;
const menuButton = document.querySelector('.icon-menu') as HTMLButtonElement;
const searchForm = document.querySelector('.header__search-form') as HTMLFormElement;
const infoList = document.querySelector('.header-top__info-list') as HTMLElement;

const toggleInputSearch = (): void => {
  toggleClasses([searchForm, searchButton], '_active');
  navigationBlock.classList.toggle('_hidden');
};

const toggleBurgerMenu = (): void => {
  toggleClasses([menuButton, navigationBlock], '_active');
  removeClasses([searchForm, searchButton], '_active');
  navigationBlock.classList.remove('_hidden');
};

window.onload = () => {
  const documentActions = (event: Event) => {
    const targetElement = event.target as HTMLElement;

    if (targetElement.closest('.icon-menu')) {
      toggleBurgerMenu();
    }

    if (targetElement.closest('.header-search__button')) {
      toggleInputSearch();
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
    //---------------------------------------------------------------
  };

  document.addEventListener('click', documentActions);
};

