export default ({
  node,
  callback,
  commandsHistory = [],
  currentCommand = { value: 0 },
  userName = '',
  logToConsole = () => {
    console.log('default logToConsole');
  },
  config,
  fillParent,
  rounded = true,
}) => {
  const wrapper = document.createElement('div');
  wrapper.classList.add('e-commandline');

  if (rounded) wrapper.classList.add('rounded');

  const state = {
    userName,
  };

  wrapper.innerHTML = `
		  <div class="e-commandline-output">
        <div class="e-commandline-output-space"></div>
      </div>
		  <div class="e-commandline-input">
			<div class="e-commandline-input-user"></div>
			<div class="e-commandline-input-user dialog-text" style="display: none;"></div>
			<input class="e-commandline-input-input" />
      <input class="e-commandline-input-input dialog-input" style="display: none;" />
		  </div>
		<div class="e-commandline-background">
			███████╗████████╗███████╗██████╗░███╗░░░███╗
			██╔════╝╚══██╔══╝██╔════╝██╔══██╗████╗░████║
			█████╗░░░░░██║░░░█████╗░░██████╔╝██╔████╔██║
			██╔══╝░░░░░██║░░░██╔══╝░░██╔══██╗██║╚██╔╝██║
			███████╗░░░██║░░░███████╗██║░░██║██║░╚═╝░██║
			╚══════╝░░░╚═╝░░░╚══════╝╚═╝░░╚═╝╚═╝░░░░░╚═╝
			<div style="text-align: right; font-style: italic;">v${config.globalConfig.version}</div>
		</div>
	`;

  const input = wrapper.querySelector('input');
  const output = wrapper.querySelector('.e-commandline-output');
  const user = wrapper.querySelector('.e-commandline-input-user');

  user.innerText = userName;

  const dollar = document.createElement('span');
  dollar.innerText = '$';
  dollar.classList.add('e-commandline-input-user-dollar');
  user.appendChild(dollar);

  input.addEventListener('keydown', (e) => {
    const key = e.key.toLowerCase();
    if (key === 'enter') {
      callback(input.value, (...p) => {
        logToConsole(output, config, ...p);
      });
      input.value = '';
    } else if (key === 'arrowup') {
      if (commandsHistory[currentCommand.value] !== undefined) {
        input.value = commandsHistory[currentCommand.value--];
        input.selectionStart = input.value.length;
      }
    }
  });
  node.innerHTML = null;
  node.appendChild(wrapper);

  if (fillParent)
    node.setAttribute('style', 'height: calc(100% - 1px);width: 100%;');

  return {
    set userName(n) {
      if (!n) throw `uncurrect username: ${n}`;
      user.innerText = n;
      user.appendChild(dollar);
      state.userName = n;
    },
    get userName() {
      return state.userName;
    },
  };
};
