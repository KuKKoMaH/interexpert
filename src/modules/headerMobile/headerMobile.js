const activeClass = 'headerMobile--active';
const submenuClass = 'headerMobile--submenu';
const submenuActiveClass = 'headerMobile__submenu--active';

const $block = $('.headerMobile');
const $menuSubmenu = $('.headerMobile__submenu');

$('.headerMobile__menu-toggle').on('click', () => {
  $block.toggleClass(activeClass);
  setTimeout(() => {
    $block.removeClass(submenuClass);
  }, 200)
})

$('.headerMobile__menu-item--submenu').on('click', (e) => {
  e.preventDefault();
  const index = +e.delegateTarget.dataset.i;
  $block.addClass(submenuClass);
  $menuSubmenu.removeClass(submenuActiveClass);
  $menuSubmenu.filter('[data-i=' + index + ']').addClass(submenuActiveClass);
});

$('.headerMobile__submenu-head').on('click', () => {
  $block.removeClass(submenuClass);
})