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

  function mobileLink(href, label, key) {
    var c = active === key ? ' active' : '';
    return '<a href="' + href + '" class="' + c + '">' + label + '</a>';
  }

  function buildHTML() {
    return (
      '<a href="index.html" style="display:flex;align-items:center;text-decoration:none;gap:15px;flex-shrink:0">' +
        '<img class="image" src="img/image-6.png" alt="Ståle Kirkaune AS" />' +
        '<span class="t-MRER-BYGGSERVICE">TØMRER&nbsp;&nbsp;&amp;&nbsp;&nbsp;&nbsp;BYGGSERVICE</span>' +
      '</a>' +
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
      '<a href="kontakt-oss.html" class="'      + cls('kontakt')    + '">Kontakt</a>' +
      '<button class="hamburger" aria-label="Meny"><span></span><span></span><span></span></button>'
    );
  }

  function buildMobileMenu() {
    return (
      '<div class="mobile-menu">' +
        mobileLink('index.html', 'Hjem', 'hjem') +
        '<div class="mobile-sub">' +
          '<span class="mobile-sub-label">Tjenester</span>' +
          dropItem('nybygg.html',              'Nybygg') +
          dropItem('tilbygg-pabygg.html',      'Tilbygg / Påbygg') +
          dropItem('renovering.html',          'Renovering') +
          dropItem('oppussing.html',           'Oppussing') +
          dropItem('garasje.html',             'Garasje') +
          dropItem('tegning-av-prosjekt.html', 'Tegning av prosjekt') +
        '</div>' +
        mobileLink('prosjekter.html', 'Prosjekter', 'prosjekter') +
        mobileLink('referanser.html', 'Referanser', 'referanser') +
        mobileLink('om-oss.html', 'Om oss', 'om-oss') +
        mobileLink('kontakt-oss.html', 'Kontakt', 'kontakt') +
      '</div>'
    );
  }

  function setupHamburger(pageEl) {
    var mobileDiv = document.createElement('div');
    mobileDiv.innerHTML = buildMobileMenu();
    var mobileMenu = mobileDiv.firstChild;
    pageEl.appendChild(mobileMenu);

    var hamburger = pageEl.querySelector('.hamburger');
    if (!hamburger) return;

    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });

    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
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
    setupHamburger(page);
    return;
  }

  /* --- index.html: inject into existing .construction-hero .navbar --- */
  var heroNav = document.querySelector('.construction-hero .navbar');
  if (heroNav) {
    heroNav.innerHTML = buildHTML();
    var navPage = heroNav.closest('.navbar-page');
    if (navPage) setupHamburger(navPage);
  }
})();
