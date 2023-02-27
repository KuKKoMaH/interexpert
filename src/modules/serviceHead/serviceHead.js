import initSlider, { defaultPagination, defaultPaginationConfig } from "src/js/initSlider";
import { BREAKPOINT_LG } from "src/js/breakpoints";

initSlider('.serviceHead__slider', ($el) => ({
  wrapperClass: 'serviceHead__slides',
  slideClass:   'serviceHead__slide',
  navigation:   {
    nextEl: $el.parents('.serviceHead').find('.serviceHead__navigation .btn')[0],
  },
  pagination:   {
    el:        $el.parents('.serviceHead').find('.pagination')[0],
    clickable: true,
  },
  // touchEventsTarget: 'wrapper',
  slidesPerView:  1,
  slidesPerGroup: 1,
  spaceBetween:   10,
}));
