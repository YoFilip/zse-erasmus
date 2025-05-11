const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('#navbar ul');
const iconBars = document.getElementById('icon-bars');
const iconClose = document.getElementById('icon-close');

hamburger.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('show');

  iconBars.style.display = isOpen ? 'none' : 'block';
  iconClose.style.display = isOpen ? 'block' : 'none';

  document.body.classList.toggle('no-scroll', isOpen);
});