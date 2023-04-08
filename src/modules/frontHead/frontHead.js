import initSlider from "src/js/initSlider";
import { initStackedCards } from "src/js/initStackedCards";

const $slides = $('.frontHead__slide');
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
        $slidesContainer: $('.frontHead__slides'),
        $prevButton:      $('.frontHead__nav-button--prev'),
        $nextButton:      $('.frontHead__nav-button--next'),
        initedClass:      'frontHead__slides--inited',
        activeClass:      'frontHead__slide--active',
        outClass:         'frontHead__slide--out'
      });
    }, 1000);
  });

  initSlider('.frontHead__slider', ($el) => ({
    wrapperClass: 'frontHead__slides',
    slideClass:   'frontHead__slide',
    // navigation:   {
    //   prevEl: $el.parents('.hints').find('.hints__nav--prev')[0],
    //   nextEl: $el.parents('.hints').find('.hints__nav--next')[0],
    // },
    pagination:   {
      el:        $el.parents('.frontHead').find('.pagination')[0],
      clickable: true,
    },
    loop:         true,
    loopedSlides: 2,
    // touchEventsTarget: 'wrapper',
    slidesPerView: 1,
    spaceBetween:  20,
    autoHeight:    true,
  }), { sm: true, lg: false });
}
