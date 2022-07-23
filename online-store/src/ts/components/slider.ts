import { Numbers, SLIDES_AMOUNT } from '../constants/numbers';

const track = document.querySelector('.slider__track') as HTMLElement;
const buttonPrev = document.querySelector('.slider__button_previous') as HTMLButtonElement;
const buttonNext = document.querySelector('.slider__button_next') as HTMLButtonElement;
const slides = document.querySelectorAll('.slider__slide') as NodeListOf<HTMLElement>;
const slidesAmount: number = slides.length;
const slidesToShow = SLIDES_AMOUNT;
const slidesToScroll = SLIDES_AMOUNT;
let position: number;

window.addEventListener('resize', init);

const init = (): void => {
  position = Numbers.zero;
  const slideWidth: number = track.clientWidth / slidesToShow;
  const movePosition: number = slidesToScroll * slideWidth;

  slides.forEach((slide: HTMLElement): void => {
    slide.style.minWidth = `${slideWidth}px`;
  });

  const setPosition = (): void => {
    track.style.transform = `translateX(${position}px)`;
  };

  buttonNext.onclick = (): void => {
    const slidesLeft: number =
      slidesAmount - (Math.abs(position) + slidesToShow * slideWidth) / slideWidth;
    position -= slidesLeft >= slidesToScroll ? movePosition : slidesLeft * slideWidth;
    setPosition();
    checkButtons();
  };

  buttonPrev.onclick = (): void => {
    const slidesLeft: number = Math.abs(position) / slideWidth;
    position += slidesLeft >= slidesToScroll ? movePosition : slidesLeft * slideWidth;
    setPosition();
    checkButtons();
  };

  const checkButtons = (): void => {
    buttonNext.disabled = position <= -(slidesAmount - slidesToShow) * slideWidth;
    buttonPrev.disabled = position === Numbers.zero;
  };
  checkButtons();
};

init();
