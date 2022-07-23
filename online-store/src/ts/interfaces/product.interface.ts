import { AvailabilityOptions } from '../types/card.types';

export interface IProductCardData {
  name: string;
  brend: string;
  price: number;
  oldPrice: number | string;
  year: number;
  rating: number;
  amount: number;
  src: string;
  details: string[];
  color: string[];
  popular: boolean;
  favorite: boolean;
}

export interface IProductCard {
  allProductCards: IProductCardData[];
  curentRenderCards: IProductCardData[];
  counterVisibleCards: number;
  createСard: IСard;
  displayCards: (productCards: IProductCardData[], sectionCards: HTMLElement) => void;
  checkAvailability: (amount: number) => AvailabilityOptions;
}

export interface IСard {
  (
    name: string,
    brend: string,
    price: number,
    oldPrice: number | string,
    year: number,
    rating: number,
    amount: number,
    src: string,
    details: string[],
    color: string[],
    popular: boolean,
    favorite: boolean
  ): HTMLDivElement;
}

export interface IFilters {
  brend: string;
  color: string;
  price: {
    minimum: string;
    maximum: string;
  };
  rating: {
    minimum: string;
    maximum: string;
  };
  popular: string;
  sort: string;
}

export interface IBasket {
  price: string;
  amount: string;
  items: string;
}
