import initSlider, { defaultPagination, defaultPaginationConfig } from "src/js/initSlider";

initSlider('.team__slider', ($el) => ({
  wrapperClass:   'team__slides',
  slideClass:     'team__slide',
  navigation:     defaultPagination($el, '.team'),
  pagination:     {
    el:        $el.parents('.team').find('.pagination')[0],
    clickable: true,
  },
  spaceBetween:   20,
  slidesPerView:  1,
  slidesPerGroup: 1,
  autoHeight:     true,
}), defaultPaginationConfig('.team'));
