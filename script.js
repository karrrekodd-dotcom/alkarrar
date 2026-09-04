(function () {
  var items = window.GALLERY_ITEMS || [];
  var grid = document.getElementById('contentGrid');
  if (!grid) return;

  var overlay = document.getElementById('modalOverlay');
  var modalImgWrap = document.getElementById('modalImgWrap');
  var modalImg = document.getElementById('modalImg');
  var modalEmbed = document.getElementById('modalEmbed');
  var modalTag = document.getElementById('modalTag');
  var modalTitle = document.getElementById('modalTitle');
  var modalContent = document.getElementById('modalContent');
  var closeBtn = document.getElementById('modalClose');

  items.forEach(function (item, i) {
    var tile = document.createElement('button');
    tile.className = 'grid-tile';
    tile.type = 'button';
    tile.setAttribute('aria-label', item.title);

    if (item.img) {
      var img = document.createElement('img');
      img.src = item.img;
      img.alt = item.title;
      tile.appendChild(img);
    } else if (item.type === 'video') {
      var videoThumb = document.createElement('div');
      videoThumb.className = 'grid-tile-video';
      videoThumb.innerHTML =
        '<span class="grid-tile-play">' +
        '<svg width="24" height="24" viewBox="0 0 24 24" fill="#fff"><path d="M8 5v14l11-7L8 5Z"/></svg>' +
        '</span>';
      tile.appendChild(videoThumb);
    }

    if (item.tag) {
      var tagEl = document.createElement('span');
      tagEl.className = 'grid-tile-tag';
      tagEl.textContent = item.tag;
      tile.appendChild(tagEl);
    }

    var overlayCaption = document.createElement('span');
    overlayCaption.className = 'grid-tile-overlay';
    overlayCaption.textContent = item.title;
    tile.appendChild(overlayCaption);

    tile.addEventListener('click', function () { openModal(i); });
    grid.appendChild(tile);
  });

  function openModal(i) {
    var item = items[i];
    if (!item) return;

    if (item.type === 'video' && item.igUrl) {
      if (modalImgWrap) modalImgWrap.style.display = 'none';
      if (modalEmbed) {
        modalEmbed.style.display = 'block';
        modalEmbed.innerHTML =
          '<blockquote class="instagram-media" data-instgrm-permalink="' + item.igUrl +
          '" data-instgrm-version="14" style="margin:0 auto; max-width:400px; width:100%;">' +
          '<a href="' + item.igUrl + '" target="_blank" rel="noopener">مشاهدة الريلز على انستغرام</a>' +
          '</blockquote>';
        if (window.instgrm && window.instgrm.Embeds) {
          window.instgrm.Embeds.process();
        }
      }
    } else {
      if (modalEmbed) { modalEmbed.style.display = 'none'; modalEmbed.innerHTML = ''; }
      if (modalImgWrap) modalImgWrap.style.display = 'block';
      if (modalImg) { modalImg.src = item.img || ''; modalImg.alt = item.title; }
    }

    modalTag.textContent = item.tag || '';
    modalTag.style.display = item.tag ? 'inline-block' : 'none';
    modalTitle.textContent = item.title;
    modalContent.innerHTML = item.body;
    overlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    overlay.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (overlay) {
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closeModal();
    });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeModal();
  });
})();
