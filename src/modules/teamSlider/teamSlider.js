import initSlider, { defaultPagination, defaultPaginationConfig } from "src/js/initSlider";
import { BREAKPOINT_LG } from "src/js/breakpoints";

initSlider('.teamSlider__slider', ($el) => ({
  wrapperClass:   'teamSlider__slides',
  slideClass:     'teamSlider__slide',
  navigation:     defaultPagination($el, '.teamSlider'),
  pagination:     {
    el:        $el.parents('.teamSlider').find('.pagination')[0],
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
}), defaultPaginationConfig('.teamSlider'));
