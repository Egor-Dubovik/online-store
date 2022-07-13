const track = document.querySelector('.slider__track') as HTMLElement;
const btnPrev = document.querySelector('.slider__button_previous') as HTMLButtonElement;
const btnNext = document.querySelector('.slider__button_next') as HTMLButtonElement;
const slides = document.querySelectorAll('.slider__slide') as NodeListOf<HTMLElement>;
const slidesAmount: number = slides.length;
const slidesToShow = 1;
const slidesToScroll = 1;
let position: number;

window.addEventListener('resize', init);

function init() {
  position = 0;
  const slideWidth: number = track.clientWidth / slidesToShow;
  const movePosition: number = slidesToScroll * slideWidth;

  slides.forEach((slide: HTMLElement): void => {
    slide.style.minWidth = `${slideWidth}px`;
  });

  const setPosition = (): void => {
    track.style.transform = `translateX(${position}px)`;
  };

  btnNext.onclick = (): void => {
    const slidesLeft = slidesAmount - (Math.abs(position) + slidesToShow * slideWidth) / slideWidth;
    position -= slidesLeft >= slidesToScroll ? movePosition : slidesLeft * slideWidth;
    setPosition();
    checkBtns();
  };

  btnPrev.onclick = (): void => {
    const slidesLeft = Math.abs(position) / slideWidth;
    position += slidesLeft >= slidesToScroll ? movePosition : slidesLeft * slideWidth;
    setPosition();
    checkBtns();
  };

  const checkBtns = (): void => {
    btnNext.disabled = position <= -(slidesAmount - slidesToShow) * slideWidth;
    btnPrev.disabled = position === 0;
  };
  checkBtns();
}

init();
