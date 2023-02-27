export default ( {
                   $container,
                   itemClassName,
                   headerClassName,
                   bodyClassName,
                   activeClassName,
                 } ) => {
  const $items = $container.find('.' + itemClassName);
  const $headers = $container.find('.' + headerClassName);

  function activate( index ) {
    $items.removeClass(activeClassName);
    $items.eq(index).addClass(activeClassName);
  }

  $headers.on('click', function () {
    const $el = $(this).parents('.' + itemClassName);
    activate($el.index());
    updateHeight();
  });

  const updateHeight = () => {
    $container.css('min-height', $container.find(`.${activeClassName} .${bodyClassName}`)[0].clientHeight);
  };
  updateHeight();
  $(window).on('resize', updateHeight);
}
