const input = document.querySelector('.commandInputT5');

document.querySelectorAll('.dropdownR8 > .linkV1').forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault();
    const parent = btn.parentElement;
    const isOpen = parent.classList.contains('open');
    document.querySelectorAll('.dropdownR8').forEach(d => d.classList.remove('open'));
    if (!isOpen) {
      parent.classList.add('open');
      const dropdown = parent.querySelector('.dropdown-content');
      dropdown.style.left = '0';
      dropdown.style.right = 'auto';
      const rect = dropdown.getBoundingClientRect();
      if (rect.right > window.innerWidth) {
        dropdown.style.left = 'auto';
        dropdown.style.right = '0';
      }
    }
  });
});

document.addEventListener('click', e => {
  if (!e.target.closest('.dropdownR8')) {
    document.querySelectorAll('.dropdownR8').forEach(d => d.classList.remove('open'));
  }
});

document.querySelectorAll('.cardB9').forEach(card => {
  card.addEventListener('click', () => {
    input.value = card.getAttribute('data-command');
    input.focus();
  });
});

input.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    try {
      window.top.eval(input.value);
    } catch {}
  }
});
