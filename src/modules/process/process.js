import { initStackedCards } from "src/js/initStackedCards";
import initSlider from "src/js/initSlider";

const $slides = $('.process__slide');
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
        $slidesContainer: $('.process__slides'),
        $prevButton:      $('.process .navigation__button--prev'),
        $nextButton:      $('.process .navigation__button--next'),
        initedClass:      'process__slides--inited',
        activeClass:      'process__slide--active',
        outClass:         'process__slide--out',
        onChangeSlide:    (index) => {
          $('.process .navigation__text b').html(index + 1);
        }
      });
    }, 1000);
  });

  initSlider('.process__slider', ($el) => ({
    wrapperClass: 'process__slides',
    slideClass:   'process__slide',
    navigation:   {
      prevEl: $el.parents('.process').find('.navigation__button--prev')[0],
      nextEl: $el.parents('.process').find('.navigation__button--next')[0],
    },
    // pagination: {
    //   el:        $el.parents('.process').find('.pagination')[0],
    //   clickable: true,
    // },
    // touchEventsTarget: 'wrapper',
    slidesPerView: 1,
  }), { sm: true, lg: false });
}