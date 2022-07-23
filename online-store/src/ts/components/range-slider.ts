import noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';
import {
  MINIMUM_PRICE,
  MAXIMUM_PRICE,
  MINIMUM_POCITION,
  MAXIMUM_POCITION,
  PRICE_SLIDER_MARGIN,
  POSITION_SLIDER_MARGIN,
  Numbers,
} from '../constants/numbers';

export const launchRangeSlider = (
  minimumPrace = MINIMUM_PRICE,
  maximumPrice = MAXIMUM_PRICE,
  minimumPosition = MINIMUM_POCITION,
  maximumPosition = MAXIMUM_POCITION
): void => {
  const rangeSliders = document.querySelectorAll(
    '.filter__slider-range'
  ) as NodeListOf<HTMLElement>;

  rangeSliders.forEach((slider: HTMLElement): void => {
    if (slider.classList.contains('filter__slider-range_price')) {
      noUiSlider.create(slider, {
        start: [minimumPrace, maximumPrice],
        connect: true,
        margin: PRICE_SLIDER_MARGIN,
        tooltips: {
          to: (numericValue) => {
            return numericValue.toFixed(Numbers.zero);
          },
        },
        range: {
          min: MINIMUM_PRICE,
          max: MAXIMUM_PRICE,
        },
      });
    }

    if (slider.classList.contains('filter__slider-range_position')) {
      noUiSlider.create(slider, {
        start: [minimumPosition, maximumPosition],
        connect: true,
        margin: POSITION_SLIDER_MARGIN,
        tooltips: {
          to: (numericValue) => {
            return numericValue.toFixed(Numbers.zero);
          },
        },
        range: {
          min: MINIMUM_POCITION,
          max: MAXIMUM_POCITION,
        },
      });
    }
  });
};
