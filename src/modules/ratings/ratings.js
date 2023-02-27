import initSlider, { defaultPagination, defaultPaginationConfig } from "src/js/initSlider";
import { BREAKPOINT_LG } from "src/js/breakpoints";

initSlider('.ratings__slider', ($el) => ({
  wrapperClass:   'ratings__slides',
  slideClass:     'ratings__slide',
  navigation:     defaultPagination($el, '.ratings'),
  pagination:     {
    el:        $el.parents('.ratings').find('.pagination')[0],
    clickable: true,
  },
  spaceBetween:   0,
  slidesPerView:  1,
  slidesPerGroup: 1,
  breakpoints:    {
    [BREAKPOINT_LG]: {
      slidesPerView:  4,
      slidesPerGroup: 4,
    },
  },
}), defaultPaginationConfig('.ratings'));
