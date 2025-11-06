const input = document.querySelector('.command-input');

document.querySelectorAll('.dropdown > a').forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault();
    const parent = btn.parentElement;
    const isOpen = parent.classList.contains('open');
    document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('open'));
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
  if (!e.target.closest('.dropdown')) {
    document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('open'));
  }
});

document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('click', () => {
    input.value = card.getAttribute('data-command');
    input.focus();
  });
});

input.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    const code = input.value.trim();
    if (!code) return;
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        world: "MAIN",
        args: [code],
        func: code => {
          const script = document.createElement('script');
          script.textContent = code;
          document.documentElement.appendChild(script);
          script.remove();
        }
      });
    });
  }
});
