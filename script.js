const input = document.querySelector('.commandInputT5');

const data = {
  name: "BookUI+",
  version: "V2.4"
};

document.getElementById("nameElementR4").textContent = `${data.name} ${data.version}`;

var customCommands = {
  "ttrs-hacks": () => alert(`ttrs-hacks
get-answer.js: ttrs-hacks_get-answer`),
     "ttrs-hacks_get-answer": () => {
    fetch("https://raw.githubusercontent.com/Jamesy-tech/ttrs-hacks/main/get-answer.js")
      .then(res => res.text())
      .then(code => {
        document.querySelector('.commandInputT5').value = code;
      })
      .catch(err => console.error(err));
  }
};

var originalColor = input.style.borderColor;

document.querySelectorAll('.dropdownR8 > .linkV1').forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault();
    const parent = btn.parentElement;
    const dropdown = parent.querySelector('.dropdownContentL4');
    const isOpen = parent.classList.contains('open');

    document.querySelectorAll('.dropdownR8').forEach(d => d.classList.remove('open'));

    if (!isOpen) {
      parent.classList.add('open');
      dropdown.style.left = '0';
      dropdown.style.right = 'auto';
      dropdown.style.top = '35px';
      dropdown.style.bottom = 'auto';
      const rect = dropdown.getBoundingClientRect();
      if (rect.right > window.innerWidth) {
        dropdown.style.left = 'auto';
        dropdown.style.right = '0';
      }
      if (rect.bottom > window.innerHeight) {
        dropdown.style.top = 'auto';
        dropdown.style.bottom = '100%';
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
    input.style.borderColor = "red";
    setTimeout(() => {
      input.style.borderColor = originalColor;
    }, 100);

    const cmd = input.value.trim();

    if (customCommands.hasOwnProperty(cmd)) {
      try {
        customCommands[cmd]();
        input.style.borderColor = 'lime';
      } catch {}
    } else {
      try {
        window.top.eval(input.value);
        input.style.borderColor = 'lime';
      } catch {}
    }
  }
});

input.focus();

function switchTheme(theme) {
  if (theme === "loadTheme") {
    const saved = localStorage.getItem("theme");
    if (saved) switchTheme(saved);
    return;
  }

  if (theme === "c00lgui") {
    document.getElementById("nameElementR4").textContent = "c00lgui";
  } else {
    document.getElementById("nameElementR4").textContent = `${data.name} ${data.version}`;
  }

  document.body.classList.forEach(cls => {
    if (cls.startsWith("theme-")) document.body.classList.remove(cls);
  });
  if (theme) {
    document.body.classList.add(`theme-${theme}`);
    localStorage.setItem("theme", theme);
  } else {
    localStorage.removeItem("theme");
  }
}

window.addEventListener("DOMContentLoaded", () => switchTheme("loadTheme"));
