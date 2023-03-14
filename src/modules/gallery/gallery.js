import initGallery from "src/js/initGallery";

const initGalleries = () => {
  $('.gallery').each((i, el) => {
    initGallery({ $items: $(el).find('.gallery__item a') });
  });
};
initGalleries();