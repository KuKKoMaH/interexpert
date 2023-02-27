/* ================================================ */
/* Меню */
/* ================================================ */
let active = null;
let closeActive = null;
$('.header__menu > ul > li.menu-item-has-children > a').mouseenter(function () {
  const $li = $(this).parents('li');
  if (active && !active.is($li)) closeActive();
  hideSearch();
  // hideMenu();

  $li.addClass('active');

  let leaved = false;
  let lastY = 0;
  const onMouseMove = (e) => {
    const { pageY } = e;
    if (leaved && pageY < lastY) {
      close();
    }
    lastY = pageY;
  };
  const onMouseEnter = () => {
    leaved = false;
  };
  const onMouseLeave = () => {
    leaved = true;
  };
  const close = () => {
    $(document).off('mousemove', onMouseMove);
    $li.off('mouseenter', onMouseEnter);
    $li.off('mouseleave', onMouseLeave);
    $li.removeClass('active');
    active = null;
    closeActive = null;
  };
  active = $li;
  closeActive = close;

  $(document).on('mousemove', onMouseMove);
  $li.on('mouseenter', onMouseEnter);
  $li.on('mouseleave', onMouseLeave);
});
/* ================================================ */

/* ================================================ */
/* Поиск */
/* ================================================ */
const $search = $('.header__search');
const $searchTrigger = $('.header__search-toggle');
const $searchInput = $('.header__search-input');
const $body = $('body');
let searchVisible = false;

$searchTrigger.on('click', () => toggleSearch());

$body.on('click', (e) => {
  const $target = $(e.target);
  if (!$target.closest($search).length) {
    hideSearch();
  }
});

function toggleSearch() {
  if (searchVisible) {
    hideSearch();
  } else {
    showSearch();
  }
}

function showSearch() {
  if (searchVisible) return;
  $search.addClass('header__search--active');
  $searchTrigger.addClass('header__search-toggle--active');

  setTimeout(() => {
    searchVisible = true;
    $searchInput.focus();
  }, 300);
}

function hideSearch() {
  if (!searchVisible) return;
  $search.removeClass('header__search--active');
  $search.one('transitionend', () => {
    $search.removeClass('search--active');
    $searchInput.val('');
  });
  $searchTrigger.removeClass('header__search-toggle--active');
  searchVisible = false;
}

/* ================================================ */
/* Мегаменю */
/* ================================================ */
let megamenuActive = null;
$megamenuToggle = $('.header__megamenu-toggle');
$megamenu = $('.megamenu');
$megamenuToggle.on('click', () => {
  openMegamenu();
})

$('.megamenu__close, .megamenu__backdrop').on('click', () => {
  closeMegamenu();
})

const openMegamenu = () => {
  $megamenuToggle.addClass('header__megamenu-toggle--active');
  $megamenu.addClass('megamenu--active');
  megamenuActive = false;
}

const closeMegamenu = () => {
  $megamenuToggle.removeClass('header__megamenu-toggle--active');
  $megamenu.removeClass('megamenu--active');
  megamenuActive = false;
}
/* ================================================ */
