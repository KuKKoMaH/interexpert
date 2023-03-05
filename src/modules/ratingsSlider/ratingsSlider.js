import initSlider, { defaultPagination, defaultPaginationConfig } from "src/js/initSlider";
import { BREAKPOINT_LG } from "src/js/breakpoints";

initSlider('.ratingsSlider__slider', ($el) => ({
  wrapperClass:   'ratingsSlider__slides',
  slideClass:     'ratingsSlider__slide',
  navigation:     defaultPagination($el, '.ratingsSlider'),
  pagination:     {
    el:        $el.parents('.ratingsSlider').find('.pagination')[0],
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
}), defaultPaginationConfig('.ratingsSlider'));
