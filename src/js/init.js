import IMask from 'imask';

// import './initMap';
import './initPopups';
import "src/js/initGallery";
import initGallery from "src/js/initGallery";

const $share = $('.share');
if ($share.length) {
  scriptLoader('https://yastatic.net/share2/share.js', () => {
    $share.each((i, el) => Ya.share2(el));
  });
}

document.querySelectorAll('input[type="tel"]').forEach(el => {
  IMask(el, {
    mask: '+{7} (000) 000-00-00',
  });
});


// $('input[type="tel"]').mask("+7 (999) 999-99-99");

$('.select').selectize({
  // render: {
  //   item:   function (data, escape) {
  //     const field_label = this.settings.labelField;
  //     let content = escape(data[field_label]);
  //     if (data.color) content += `&nbsp;<span class="color" style="color: ${data.color}"></span>`;
  //     return '<div class="item">' + content + '</div>';
  //   },
  //   option: function (data, escape) {
  //     const field_label = this.settings.labelField;
  //     const field_value = this.settings.valueField;
  //     let content = escape(data[field_label]);
  //     if (data.color) content += `<span class="color" style="color: ${data.color}"></span>`;
  //     return '<div class="option ' + (data[field_value] === '' ? 'selectize-dropdown-emptyoptionlabel' : '') + '">' + content + '</div>';
  //   },
  // },
});

$('.toTop').on('click', () => {
  $("html, body").animate({ scrollTop: 0 }, "slow");
});

$('.file').each((i, el) => {
  const $el = $(el);
  const $name = $el.find('.file__name');
  const originalText = $name.text();
  $el.find('input[type="file"]').on('change', function () {
    const files = $(this)[0].files;
    $name.text(files.length ? files[0].name : originalText);
  });
});

$('[data-gallery]').each((i, el) => {
  initGallery({ $items: $(el).find('[data-gallery-item]') });
});
