import initSlider, { defaultPagination, defaultPaginationConfig } from "src/js/initSlider";
import { BREAKPOINT_LG } from "src/js/breakpoints";

initSlider('.team__slider', ($el) => ({
  wrapperClass:   'team__slides',
  slideClass:     'team__slide',
  navigation:     defaultPagination($el, '.team'),
  pagination:     {
    el:        $el.parents('.team').find('.pagination')[0],
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
}), defaultPaginationConfig('.team'));
