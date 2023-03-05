import initSlider, { defaultPagination, defaultPaginationConfig } from "src/js/initSlider";
import { BREAKPOINT_LG } from "src/js/breakpoints";

initSlider('.news__slider', ($el) => ({
  wrapperClass: 'news__slides',
  slideClass:   'news__slide',
  navigation:   defaultPagination($el, '.news'),
  pagination:   {
    el:        $el.parents('.news').find('.pagination')[0],
    clickable: true,
  },
  // touchEventsTarget: 'wrapper',
  slidesPerView:  1,
  slidesPerGroup: 1,
  spaceBetween:   0,
  breakpoints:    {
    [BREAKPOINT_LG]: {
      slidesPerView:  2,
      slidesPerGroup: 2,
    },
  },
}), defaultPaginationConfig('.news'));
