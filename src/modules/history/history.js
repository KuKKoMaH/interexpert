import initSlider, { defaultPagination, defaultPaginationConfig } from "src/js/initSlider";
import { BREAKPOINT_LG } from "src/js/breakpoints";

const scrollNavigation = (index) => {
  const $button = $yearButtons.filter('[data-index=' + index + ']');
  $button.addClass(activeYearClass);
  const buttonEl = $button[0];
  const parent = buttonEl.parentElement;
  parent.scrollLeft = buttonEl.offsetLeft - parent.clientWidth / 2 + buttonEl.clientWidth / 2;
}

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
    swiper.on('slideChange', function () {
      const activeIndex = swiper.snapIndex;
      $yearButtons.removeClass(activeYearClass)
      scrollNavigation(activeIndex);
    });
    $yearButtons.filter('[data-index=' + swiper.snapIndex + ']').addClass(activeYearClass);
    scrollNavigation(swiper.snapIndex);
  },
  beforeDestroy: (swiper, $el) => {

  },
});

$yearButtons.on('click', (e) => {
  const index = e.delegateTarget.dataset.index;
  const swiper = getInstance();
  swiper.slideTo(index);

});