const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.main-nav');

function closeMenu() {
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Abrir menu');
  navigation.classList.remove('open');
}
function toggleMenu() {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Abrir menu' : 'Fechar menu');
  navigation.classList.toggle('open', !isOpen);
}
menuButton.addEventListener('click', toggleMenu);
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('click', event => {
  if (!navigation.contains(event.target) && !menuButton.contains(event.target)) closeMenu();
});
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });

const cards = [...document.querySelectorAll('.photo')];
const lightbox = document.querySelector('.lightbox');
const lightboxImage = lightbox.querySelector('img');
const lightboxCaption = lightbox.querySelector('figcaption');
let photoIndex = 0;
let previousFocus = null;

function showPhoto(index) {
  photoIndex = (index + cards.length) % cards.length;
  const card = cards[photoIndex];
  lightboxImage.src = card.dataset.full;
  lightboxImage.alt = card.querySelector('img').alt;
  lightboxCaption.textContent = `${card.dataset.title} · ${card.dataset.kind}`;
}
function openLightbox(index) {
  previousFocus = document.activeElement;
  showPhoto(index);
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.classList.add('locked');
  lightbox.querySelector('.lightbox-close').focus();
}
function closeLightbox() {
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('locked');
  if (previousFocus) previousFocus.focus();
}
cards.forEach((card, index) => card.addEventListener('click', () => openLightbox(index)));
lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
lightbox.querySelector('.lightbox-prev').addEventListener('click', () => showPhoto(photoIndex - 1));
lightbox.querySelector('.lightbox-next').addEventListener('click', () => showPhoto(photoIndex + 1));
lightbox.addEventListener('click', event => { if (event.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', event => {
  if (!lightbox.classList.contains('open')) return;
  if (event.key === 'Escape') closeLightbox();
  if (event.key === 'ArrowLeft') showPhoto(photoIndex - 1);
  if (event.key === 'ArrowRight') showPhoto(photoIndex + 1);
});

document.querySelector('#year').textContent = new Date().getFullYear();
