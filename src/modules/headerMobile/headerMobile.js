const activeClass = 'headerMobile__popup--active'
const $menuPopup = $('.headerMobile__popup');

$('.headerMobile__menu-toggle').on('click', () => {
  $menuPopup.toggleClass(activeClass);
})

$('.headerMobile__menu > ul > li > a').on('click', (e) => {

});