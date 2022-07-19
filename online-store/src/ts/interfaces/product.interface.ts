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
  ditails: string[];
  color: string[];
  popular: boolean;
  favorite: boolean;
}

export interface IProductCard {
  allProductCards: IProductCardData[];
  curentRenderCards: IProductCardData[];
  counterVisibleCards: number;
  createСard: (
    name: string,
    brend: string,
    price: number,
    oldPrice: number | string,
    year: number,
    rating: number,
    amount: number,
    src: string,
    ditails: string[],
    color: string[],
    popular: boolean
  ) => HTMLDivElement;
  displayCards: (productCards: IProductCardData[], sectionCards: HTMLElement) => void;
  checkAvailability: (amount: number) => AvailabilityOptions;
}
