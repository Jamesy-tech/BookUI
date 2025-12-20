console.log("0");

const input = document.querySelector('.commandInputT5');

const data = {
  name: "BookUI+",
  version: "V3.7"
};

const cursor_url = "https://raw.githubusercontent.com/Jamesy-tech/BookUI/main/cursor.png";

console.log('1');

document.getElementById("nameElementR4").textContent = `${data.name} ${data.version}`;

const STORAGE_KEY = "bookui_custom_commands";

function getSavedCommands() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
}

function saveCommands(commands) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(commands));
}

function deleteUserCommand(name) {
  const commands = getSavedCommands();
  const filtered = commands.filter(cmd => cmd.name !== name);
  saveCommands(filtered);
}

function createCommandCard(cmd) {
  const panel = document.querySelector(".panelC6");
  const addCard = document.getElementById("addCommandCard");

  const card = document.createElement("div");
  card.className = "cardB9";
  card.dataset.command = cmd.code;
  card.dataset.userCommand = "true";
  card.dataset.commandName = cmd.name;

  card.innerHTML = `
    <h3>${cmd.name}</h3>
    <p>${cmd.description}</p>
  `;

  card.addEventListener("click", () => {
    input.value = cmd.code;
    input.focus();
    copy(cmd.code);
  });

  card.addEventListener("contextmenu", e => {
    e.preventDefault();
    if (confirm(`Delete command "${cmd.name}"?`)) {
      deleteUserCommand(cmd.name);
      card.remove();
    }
  });

  panel.insertBefore(card, addCard);
}

console.log('2');

window.addEventListener("DOMContentLoaded", () => {
  switchTheme("loadTheme");
});

console.log('2.5');

setTimeout(() => {
   const commands = getSavedCommands();
  commands.forEach(createCommandCard);
}, 1000);

console.log('2.6');

function addCommand() {
  const name = prompt("Command name:");
  if (!name) return;

  const description = prompt("Command description:");
  if (!description) return;

  const code = prompt("Command code (JavaScript):");
  if (!code) return;

  const commands = getSavedCommands();

  commands.push({
    name,
    description,
    code
  });

  saveCommands(commands);
  createCommandCard({ name, description, code });

  alert("Command added!");
}

console.log('2.7');

async function copy(text) {
  try {
    await navigator.clipboard.writeText(text);
    console.log('Copied to clipboard:', text);
  } catch (err) {
    console.error('Failed to copy:', err);
  }
}

console.log('2.8');

setTimeout(() => {

if (window.location.href.includes("jamesy-tech.github.io/BookUI")) {

  document.body.style.cursor = 'url(${cursor_url}), auto';

  console.log("URL contains 'BookUI'!")
  window.location.href = "https://sites.google.com/view/get-bookui"

} else {
  console.log("URL does not contain 'BookUI'")
  window.top.eval(`document.getElementById("jamesyBookUIContainer").style.cursor = 'url(${cursor_url}), auto';`);
  input.focus();
}

}, 100);

console.log('2.85');

if (window.location.href.includes("BookUI")) {
  console.log("URL contains 'BookUI'!")
   document.body.style.height = "100vh";
} else {
   document.body.style.height = "100%";
}

console.log('2.9');

var customCommands = {
  "ttrs-hacks": () => alert(`ttrs-hacks
get-answer.js: ttrs-hacks_get-answer`),
   
"ttrs-hacks_get-answer": () => {
    fetch("https://raw.githubusercontent.com/Jamesy-tech/ttrs-hacks/main/get-answer.js")
      .then(res => res.text())
      .then(code => {
        copy(code);
        document.querySelector('.commandInputT5').value = code;
      })
      .catch(err => console.error(err));
  },

  "blooket-hacks": () => alert(`blooket-hacks
cheats-gui.js: blooket-hacks_cheats-gui`),

  "blooket-hacks_cheats-gui": () => {
    fetch("https://raw.githubusercontent.com/Jamesy-tech/blooket-hacks/main/bookmarklet.js")
      .then(res => res.text())
      .then(code => {
        copy(code);
        document.querySelector('.commandInputT5').value = code;
      })
      .catch(err => console.error(err));
  },

};

console.log('3');

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
    copy(card.getAttribute('data-command'))
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

console.log('4');

function switchTheme(theme) {
  if (theme === "loadTheme") {
    const saved = localStorage.getItem("theme");
    if (saved) switchTheme(saved);
    return;
  }

  if (theme === "c00lgui") {
    document.getElementById("nameElementR4").textContent = "c00lgui";
   
      (function(){let s="#jamesyBookUIContainer *";if(!s)return;document.querySelectorAll(s).forEach(e=>e.style.outline='2px solid red');})();
      
  } else {
    document.getElementById("nameElementR4").textContent = `${data.name} ${data.version}`;
      document.querySelectorAll("*").forEach(e=>e.style.outline='none');
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

console.log('5');
