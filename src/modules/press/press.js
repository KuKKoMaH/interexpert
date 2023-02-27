import initSlider from "src/js/initSlider";

initSlider('.press__slider', ($el) => ({
  wrapperClass: 'press__items',
  slideClass:   'press__item',
  // navigation:   {
  //   prevEl: $el.parents('.hints').find('.hints__nav--prev')[0],
  //   nextEl: $el.parents('.hints').find('.hints__nav--next')[0],
  // },
  pagination: {
    el:        $el.parents('.press').find('.pagination')[0],
    clickable: true,
  },
  // touchEventsTarget: 'wrapper',
  slidesPerView: 1,
  spaceBetween:  20,
}), { sm: true, lg: false });
