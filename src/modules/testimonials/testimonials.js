import initSlider, { defaultPagination, defaultPaginationConfig } from "src/js/initSlider";
import { BREAKPOINT_LG } from "src/js/breakpoints";

initSlider('.testimonials__slider', ($el) => ({
  wrapperClass: 'testimonials__slides',
  slideClass:   'testimonials__slide',
  navigation:   defaultPagination($el, '.testimonials'),
  pagination:   {
    el:        $el.parents('.testimonials').find('.pagination')[0],
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
}), defaultPaginationConfig('.testimonials'));
