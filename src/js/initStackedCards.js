import _debounce from 'lodash/debounce'

export const initStackedCards = (config) => {
  const {
    $slides,
    $slidesContainer,
    $prevButton,
    $nextButton,
    initedClass,
    activeClass,
    outClass,
    onChangeSlide,
  } = config;
  let destroyed = false;
  let slideWidth = $slides[0].clientWidth;
  let slidesCount = $slides.length;
  let currentSlide = 0;

  const getPosition = (index) => index >= currentSlide
    ? index - currentSlide
    : slidesCount - currentSlide + index;

  const iterateOverSlides = (cb) => {
    for (let i = 0; i < slidesCount; i++) {
      const position = getPosition(i);
      cb(i, position);
    }
  }

  const positionateSlider = (direction) => {
    let newCurrentSlide = currentSlide + (direction === 'forward' ? 1 : -1);
    if (newCurrentSlide >= slidesCount) newCurrentSlide = 0;
    if (newCurrentSlide < 0) newCurrentSlide = slidesCount - 1;
    const prevCurrentSlide = currentSlide;
    currentSlide = newCurrentSlide;
    if (onChangeSlide) onChangeSlide(currentSlide);
    const $prevCurrent = $slides.eq(prevCurrentSlide);
    const $newCurrent = $slides.eq(newCurrentSlide);

    if (prevCurrentSlide !== newCurrentSlide) {
      iterateOverSlides((index, position) => {
        if (direction === 'forward' && index === prevCurrentSlide) return;
        $slides[index].style.left = position * slideWidth + 'px';
      });
      $slides.removeClass(activeClass);
      $slides.eq(currentSlide).addClass(activeClass);

      if (direction === 'forward') {
        $prevCurrent.addClass(outClass);

        const onTransitionEnd = (e) => {
          if (e.target !== $prevCurrent[0]) return;
          iterateOverSlides((index, position) => {
            $slides[index].style.zIndex = slidesCount - position;
          })
          $prevCurrent.removeClass(outClass);
          $prevCurrent.css('left', getPosition(prevCurrentSlide) * slideWidth);

          $prevCurrent.off('transitionend', onTransitionEnd);
        }
        $prevCurrent.on('transitionend', onTransitionEnd);
      } else {
        $newCurrent.addClass(outClass);
        const onTransitionEnd = (e) => {
          // if (e.target !== $newCurrent[0]) return;
          iterateOverSlides((index, position) => {
            $slides[index].style.zIndex = slidesCount - position;
          })
          $newCurrent.removeClass(outClass);
          $newCurrent.off('transitionend', onTransitionEnd);
        }
        // setTimeout(onTransitionEnd, 1000);
        $newCurrent.on('transitionend', onTransitionEnd);
      }
    }
  }

  const onClickPrev = () => positionateSlider('backward');
  $prevButton.on('click', onClickPrev);

  const onClickNext = () => positionateSlider('forward');
  $nextButton.on('click', onClickNext);

  const onClickSlide = (e) => {
    let targetIndex = $(e.delegateTarget).index();
    if (targetIndex === currentSlide) return;
    e.preventDefault();
    e.stopPropagation();
    const update = () => {
      if (targetIndex === currentSlide) return;
      positionateSlider('forward');
      setTimeout(update, 100);
    }
    update();
  };
  $slides.on('click', onClickSlide);

  let minHeight = 0;
  $slides.each((i, el) => minHeight = Math.max(minHeight, el.clientHeight));
  $slidesContainer.css('min-height', minHeight);
  $slidesContainer.addClass(initedClass);

  const updateLayout = () => {
    if (destroyed) return;
    slidesCount = $slides.length;
    slideWidth = $slidesContainer[0].clientWidth / slidesCount;
    iterateOverSlides((index, position) => {
      $slides[index].style.left = position * slideWidth + 'px';
      $slides[index].style.maxWidth = slideWidth + 'px';
    });
  }
  updateLayout()
  const debouncedUpdateLayout = _debounce(updateLayout, 100);
  $(window).on('resize', debouncedUpdateLayout);

  return () => {
    $prevButton.off('click', onClickPrev);
    $nextButton.off('click', onClickNext);
    $slides.off('click', onClickSlide);
    $slidesContainer.removeClass(initedClass);
    $(window).off('resize', debouncedUpdateLayout);

    iterateOverSlides((index, position) => {
      $slides[index].style.left = null;
      $slides[index].style.zIndex = null;
      $slides[index].style.maxWidth = null;
    });
    destroyed = true;
  }
}
