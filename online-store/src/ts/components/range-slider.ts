import noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';

const rangeSliders = document.querySelectorAll('.filter__slider-range') as NodeListOf<HTMLElement>;

rangeSliders.forEach((slider) => {
  if (slider.classList.contains('filter__slider-range_price')) {
    noUiSlider.create(slider, {
      start: [0, 6000],
      connect: true,
      tooltips: {
        to: function (numericValue) {
          return numericValue.toFixed(0);
        },
      },
      range: {
        min: 0,
        max: 6000,
      },
    });
  }

  if (slider.classList.contains('filter__slider-range_position')) {
    noUiSlider.create(slider, {
      start: [0, 5],
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
