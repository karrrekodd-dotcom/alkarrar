(function () {
  var items = window.GALLERY_ITEMS || [];
  var grid = document.getElementById('contentGrid');
  if (!grid) return;

  var overlay = document.getElementById('modalOverlay');
  var modalImg = document.getElementById('modalImg');
  var modalTag = document.getElementById('modalTag');
  var modalTitle = document.getElementById('modalTitle');
  var modalContent = document.getElementById('modalContent');
  var closeBtn = document.getElementById('modalClose');

  items.forEach(function (item, i) {
    var tile = document.createElement('button');
    tile.className = 'grid-tile';
    tile.type = 'button';
    tile.setAttribute('aria-label', item.title);

    var img = document.createElement('img');
    img.src = item.img;
    img.alt = item.title;
    tile.appendChild(img);

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
    modalImg.src = item.img;
    modalImg.alt = item.title;
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
