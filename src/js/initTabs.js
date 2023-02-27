export default ( { $headers, $bodies, headerActiveClass, bodyActiveClass } ) => {
  $headers.on('click', ( e ) => {
    const $el = $(e.delegateTarget);
    const index = $el.index();
    $headers.removeClass(headerActiveClass);
    $bodies.removeClass(bodyActiveClass);
    $el.addClass(headerActiveClass);
    $bodies.eq(index).addClass(bodyActiveClass);
  });
}
