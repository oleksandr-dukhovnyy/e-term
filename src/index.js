import 'normalize.css';
import './css/index.scss';
import Terminal from './js/terminal_core';

const pss = async ({ dialog, log }) => {
  const password = await dialog({
    hideInput: true,
    text: 'enter password',
  })
    .then((res) => ({
      text: res,
      error: false,
    }))
    .catch((err) => ({
      text: null,
      error: err,
    }));

  log({
    text: `pass: ${JSON.stringify(password)}`,
  });
};

async function main() {
  const term = new Terminal(
    '#e-term',
    {
      pss,
    },
    {
      userName: 'root',
      exec: false,
      fillParent: false,
      rounded: true,
    }
  );
  term.config.input.showInput = true;
  term.input.focus();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', main);
} else {
  main();
}
