import initSlider, { defaultPagination, defaultPaginationConfig } from "src/js/initSlider";
import { BREAKPOINT_LG } from "src/js/breakpoints";

const activeYearClass = 'history__year--active';
const $yearButtons = $('.history__year');

const { getInstance } = initSlider('.history__slider', ($el) => ({
  wrapperClass:   'history__slides',
  slideClass:     'history__slide',
  navigation:     defaultPagination($el, '.history'),
  spaceBetween:   0,
  slidesPerView:  1,
  slidesPerGroup: 1,
  autoHeight:     true,
  initialSlide:   $el.find('.history__slide').length - 1,
}), {
  afterInit:     (swiper, $el) => {
    $yearButtons.filter('[data-index=' + swiper.snapIndex + ']').addClass(activeYearClass);
    swiper.on('slideChange', function () {
      const activeIndex = swiper.snapIndex;
      $yearButtons.removeClass(activeYearClass)
      const $button = $yearButtons.filter('[data-index=' + activeIndex + ']');
      $button.addClass(activeYearClass);
      $button[0].scrollIntoView();
    });
  },
  beforeDestroy: (swiper, $el) => {

  },
});

$yearButtons.on('click', (e) => {
  const index = e.delegateTarget.dataset.index;
  const swiper = getInstance();
  swiper.slideTo(index);

});