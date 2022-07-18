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
}

export interface IProductCard {
  allProductCards: IProductCardData[];
  visibleProductCards: IProductCardData[];
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
  displayCards: (sectionCards: HTMLElement, productCards: IProductCardData[]) => void;
  checkAvailability: (amount: number) => AvailabilityOptions;
}
