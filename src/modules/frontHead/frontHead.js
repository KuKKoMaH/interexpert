import initSlider from "src/js/initSlider";

const $slides = $('.frontHead__slide');
if ($slides.length) {
  let destroyCards;
  const initCards = () => {
    const initedClass = 'frontHead__slides--inited';
    const activeClass = 'frontHead__slide--active';
    const outClass = 'frontHead__slide--out';
    const $slidesContainer = $('.frontHead__slides');
    const $prevButton = $('.frontHead__nav-button--prev');
    const $nextButton = $('.frontHead__nav-button--next');
    const slideWidth = $slides[0].clientWidth;
    const slidesCount = $slides.length;
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
      const update = () => {
        if (targetIndex === currentSlide) return;
        positionateSlider('forward');
        setTimeout(update, 100);
      }
      update();
    };
    $slides.on('click', onClickSlide);

    $slidesContainer.addClass(initedClass);
    iterateOverSlides((index, position) => {
      $slides[index].style.left = position * slideWidth + 'px';
    });

    return () => {
      $prevButton.off('click', onClickPrev);
      $nextButton.off('click', onClickNext);
      $slides.off('click', onClickSlide);
      $slidesContainer.removeClass(initedClass);
      iterateOverSlides((index, position) => {
        $slides[index].style.left = null;
        $slides[index].style.zIndex = null;
      });
    }
  }

  Breakpoints.on('sm', 'enter', () => {
    if (destroyCards) {
      destroyCards();
      destroyCards = null;
    }
  });

  Breakpoints.on('lg', 'enter', () => {
    requestAnimationFrame(() => {
      destroyCards = initCards();
    })
  });

  initSlider('.frontHead__slider', ($el) => ({
    wrapperClass: 'frontHead__slides',
    slideClass:   'frontHead__slide',
    // navigation:   {
    //   prevEl: $el.parents('.hints').find('.hints__nav--prev')[0],
    //   nextEl: $el.parents('.hints').find('.hints__nav--next')[0],
    // },
    pagination: {
      el:        $el.parents('.frontHead').find('.pagination')[0],
      clickable: true,
    },
    // touchEventsTarget: 'wrapper',
    slidesPerView: 1,
    spaceBetween:  20,
  }), { sm: true, lg: false });

}
