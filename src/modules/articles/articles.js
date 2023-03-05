import initSlider, { defaultPagination, defaultPaginationConfig } from "src/js/initSlider";
import { BREAKPOINT_LG } from "src/js/breakpoints";

initSlider('.articles__slider', ($el) => ({
  wrapperClass: 'articles__slides',
  slideClass:   'articles__slide',
  navigation:   defaultPagination($el, '.articles'),
  pagination:   {
    el:        $el.parents('.articles').find('.pagination')[0],
    clickable: true,
  },
  // touchEventsTarget: 'wrapper',
  slidesPerView:  1,
  slidesPerGroup: 1,
  breakpoints:    {
    [BREAKPOINT_LG]: {
      slidesPerView:  3,
      slidesPerGroup: 3,
    },
  },
}), defaultPaginationConfig('.articles'));
