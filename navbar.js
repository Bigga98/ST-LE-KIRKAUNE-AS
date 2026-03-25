(function () {
  var TJENESTE_PAGES = [
    'nybygg.html',
    'tilbygg-pabygg.html',
    'renovering.html',
    'oppussing.html',
    'garasje.html',
    'tegning-av-prosjekt.html'
  ];

  var filename = window.location.pathname.split('/').pop() || 'index.html';
  if (filename === '') filename = 'index.html';

  function getActiveKey() {
    if (filename === 'index.html') return 'hjem';
    if (filename === 'om-oss.html') return 'om-oss';
    if (filename === 'kontakt-oss.html') return 'kontakt';
    if (filename === 'referanser.html') return 'referanser';
    if (filename === 'prosjekter.html') return 'prosjekter';
    if (TJENESTE_PAGES.indexOf(filename) !== -1) return 'tjenester';
    return '';
  }

  var active = getActiveKey();

  function cls(key) {
    return 'nav-link' + (active === key ? ' active' : '');
  }

  function dropItem(href, label) {
    var isCurrent = filename === href;
    return '<a href="' + href + '"' + (isCurrent ? ' class="current"' : '') + '>' + label + '</a>';
  }

  function buildHTML() {
    return (
      '<a href="index.html"><img class="image" src="img/image-6.png" alt="Ståle Kirkaune AS" /></a>' +
      '<span class="t-MRER-BYGGSERVICE">TØMRER&nbsp;&nbsp;&amp;&nbsp;&nbsp;&nbsp;BYGGSERVICE</span>' +
      '<div class="nav-dropdown">' +
        '<a class="' + cls('tjenester') + '" href="#">Tjenester &#9662;</a>' +
        '<div class="dropdown-menu">' +
          dropItem('nybygg.html',              'Nybygg') +
          dropItem('tilbygg-pabygg.html',      'Tilbygg / Påbygg') +
          dropItem('renovering.html',          'Renovering') +
          dropItem('oppussing.html',           'Oppussing') +
          dropItem('garasje.html',             'Garasje') +
          dropItem('tegning-av-prosjekt.html', 'Tegning av prosjekt') +
        '</div>' +
      '</div>' +
      '<a href="prosjekter.html" class="' + cls('prosjekter') + '">Prosjekter</a>' +
      '<a href="referanser.html" class="'       + cls('referanser') + '">Referanser</a>' +
      '<a href="om-oss.html" class="'           + cls('om-oss')     + '">Om oss</a>' +
      '<a href="kontakt-oss.html" class="'      + cls('kontakt')    + '">Kontakt</a>'
    );
  }

  /* --- Subpages: replace #navbar-inject placeholder --- */
  var placeholder = document.getElementById('navbar-inject');
  if (placeholder) {
    var page = document.createElement('div');
    page.className = 'navbar-page';
    var nav = document.createElement('div');
    nav.className = 'navbar';
    nav.innerHTML = buildHTML();
    page.appendChild(nav);
    placeholder.parentNode.replaceChild(page, placeholder);
    return;
  }

  /* --- index.html: inject into existing .construction-hero .navbar --- */
  var heroNav = document.querySelector('.construction-hero .navbar');
  if (heroNav) {
    heroNav.innerHTML = buildHTML();
  }
})();
