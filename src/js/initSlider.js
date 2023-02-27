import { Swiper, Navigation, Pagination, Lazy, Autoplay, Grid } from 'swiper';
import Breakpoints from 'breakpoints-js';

Swiper.use([Navigation, Pagination, Lazy, Autoplay, Grid]);

export default (selector, props, initOptions) => {
  if (!initOptions) initOptions = {};
  initOptions = Object.assign({}, {
    sm: true,
    lg: true,
  }, initOptions);

  const $wrapper = $(selector);
  let lastSlider = null;
  if ($wrapper.length) {
    $wrapper.each((i, el) => {
      let slider = null;
      const $el = $(el);

      const initSlider = () => {
        if (slider) return;
        const finalProps = typeof props === 'function' ? props($el) : props;
        if (!finalProps) return;
        lastSlider = slider = new Swiper(el, typeof props === 'function' ? props($el) : props);
        $el.data('swiper', slider);
        if (initOptions.afterInit) initOptions.afterInit(slider, $el);
      };

      const destroySlider = () => {
        if (!slider) return;
        if (initOptions.beforeDestroy) initOptions.beforeDestroy(slider, $el);
        slider.destroy();
        slider = null;
      };

      Breakpoints.on('sm', 'enter', () => {
        initOptions.sm ? initSlider() : destroySlider();
      });
      Breakpoints.on('lg', 'enter', () => {
        initOptions.lg ? initSlider() : destroySlider();
      });
    });
  }
  return {
    getInstance() {
      return lastSlider;
    },
  };
}

export const defaultPagination = ($el, parentSelector) => ({
  prevEl: $el.parents(parentSelector).find('.navigation__button--prev')[0],
  nextEl: $el.parents(parentSelector).find('.navigation__button--next')[0],
})

export const defaultPaginationConfig = (parentSelector) => ({
  afterInit:     (swiper, $el) => {
    const $totalPages = $el.parents(parentSelector).find('.navigation__text span');
    const $currentPage = $el.parents(parentSelector).find('.navigation__text b');
    $totalPages.html(swiper.snapGrid.length)
    $currentPage.html(swiper.snapIndex + 1);
    swiper.on('slideChange', function () {
      $currentPage.html(swiper.snapIndex + 1);
    });
  },
  beforeDestroy: (swiper, $el) => {

  },
})