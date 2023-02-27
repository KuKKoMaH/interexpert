const $headMenu = $('.head__menu');
const activeClass = 'head__menu--active';

$('.head__menu-title').on('click', () => {
  $headMenu.toggleClass(activeClass)
})

$('.head__menu-close').on('click', () => {
  $headMenu.removeClass(activeClass)
})