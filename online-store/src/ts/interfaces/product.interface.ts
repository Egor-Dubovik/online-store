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
  createСard: (product: IProductCardData) => HTMLDivElement;
  displayCards: (productCards: IProductCardData[], sectionCards: HTMLElement) => void;
  checkAvailability: (amount: number) => AvailabilityOptions;
}

interface IValueRange {
  minimum: string;
  maximum: string;
}

export interface IFilters {
  brend: string;
  color: string;
  price: IValueRange;
  rating: IValueRange;
  popular: string;
  sort: string;
}

export interface IBasket {
  price: string;
  amount: string;
  items: string;
}
