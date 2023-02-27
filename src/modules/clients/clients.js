import initSlider, { defaultPagination, defaultPaginationConfig } from "src/js/initSlider";
import { BREAKPOINT_LG } from "src/js/breakpoints";

initSlider('.clients__slider', ($el) => ({
  wrapperClass: 'clients__slides',
  slideClass:   'clients__slide',
  navigation:   defaultPagination($el, '.clients'),
  pagination:   {
    el:        $el.parents('.clients').find('.pagination')[0],
    clickable: true,
  },
  // touchEventsTarget: 'wrapper',
  spaceBetween:   0,
  slidesPerView:  2,
  slidesPerGroup: 2,
  grid:           { rows: 6, },
  breakpoints:    {
    [BREAKPOINT_LG]: {
      slidesPerView:  6,
      slidesPerGroup: 6,
      grid:           { rows: 2, },
    },
  },
}), defaultPaginationConfig('.clients'));
