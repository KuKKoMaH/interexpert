import { initStackedCards } from "src/js/initStackedCards";
import initSlider from "src/js/initSlider";

const $slides = $('.advantages__slide');
if ($slides.length) {
  let destroyCards;

  Breakpoints.on('sm', 'enter', () => {
    if (destroyCards) {
      destroyCards();
      destroyCards = null;
    }
  });

  Breakpoints.on('lg', 'enter', () => {
    setTimeout(() => {
      destroyCards = initStackedCards({
        $slides,
        $slidesContainer: $('.advantages__slides'),
        $prevButton:      $('.advantages .navigation__button--prev'),
        $nextButton:      $('.advantages .navigation__button--next'),
        initedClass:      'advantages__slides--inited',
        activeClass:      'advantages__slide--active',
        outClass:         'advantages__slide--out',
        onChangeSlide:    (index) => {
          $('.advantages .navigation__text b').html(index + 1);
        }
      });
    }, 1000);
  });

  initSlider('.advantages__slider', ($el) => ({
    wrapperClass: 'advantages__slides',
    slideClass:   'advantages__slide',
    navigation:   {
      prevEl: $el.parents('.advantages').find('.navigation__button--prev')[0],
      nextEl: $el.parents('.advantages').find('.navigation__button--next')[0],
    },
    // pagination: {
    //   el:        $el.parents('.advantages').find('.pagination')[0],
    //   clickable: true,
    // },
    // touchEventsTarget: 'wrapper',
    slidesPerView: 1,
  }), { sm: true, lg: false });
}