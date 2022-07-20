import noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';

export const launchRangeSlider = (
  minimumPrace = 0,
  maximumPrice = 6500,
  minimumPosition = 0,
  maximumPosition = 5
): void => {
  const rangeSliders = document.querySelectorAll(
    '.filter__slider-range'
  ) as NodeListOf<HTMLElement>;

  rangeSliders.forEach((slider) => {
    if (slider.classList.contains('filter__slider-range_price')) {
      noUiSlider.create(slider, {
        start: [minimumPrace, maximumPrice],
        connect: true,
        tooltips: {
          to: function (numericValue) {
            return numericValue.toFixed(0);
          },
        },
        range: {
          min: 0,
          max: 6500,
        },
      });
    }

    if (slider.classList.contains('filter__slider-range_position')) {
      noUiSlider.create(slider, {
        start: [minimumPosition, maximumPosition],
        connect: true,
        tooltips: {
          to: function (numericValue) {
            return numericValue.toFixed(0);
          },
        },
        range: {
          min: 0,
          max: 5,
        },
      });
    }
  });
};
