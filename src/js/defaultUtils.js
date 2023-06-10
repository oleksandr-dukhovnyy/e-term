import pickAFile from './pickAFile.js';

function clear({ flags, commandLine }) {
  if (flags.hasFlag('c')) {
    const count = +flags.getFlag('c').value || Infinity;

    [...commandLine.output.children].forEach((el, i) => {
      if (i < count && !el.classList.contains('no-remove')) {
        el.remove();
      }
    });
  } else {
    [...commandLine.output.children].forEach((n) => {
      console.log(n, n.classList, n.classList.contains('no-remove'));

      n.classList.contains('no-remove') ? null : n.remove();
    });
  }

  commandLine.output.scrollBy(0, -1);
}

function help({ log, commandLine }, [command = null]) {
  if (command) {
    const commandObj = commandLine?.commands[command]?.schema;

    if (!commandObj)
      return log({
        text: `Command "${command}" not found`,
      });

    log({
      text: commandObj.description || '[description is empty]',
      styles: {
        color: '#39ff2c',
      },
    });

    log({
      text: `"${command}" params:`,
      styles: {
        color: '#ff16ce',
        fontWeight: 700,
      },
    });

    if (commandObj.params) {
      commandObj.params.forEach((commandParam, i, arr) => {
        log({
          text: `[${commandParam.require ? '' : '?'}${commandParam.name}${
            commandParam.many ? '...' : ''
          }]${
            commandParam.currectValues
              ? ` (one from: "${commandParam.currectValues.join('", "')}")`
              : ''
          }`,
          styles: {
            paddingLeft: '20px',
            color: '#ff16ce',
          },
        });
        log({
          text: `${commandParam.description || ''}`,
          styles: {
            paddingLeft: '20px',
            paddingBottom:
              arr.length - 1 !== i || commandObj.flags ? '20px' : '0',
            display: 'block',
          },
        });
      });
    } else {
      log({
        text: `[no params description]`,
        styles: {
          paddingLeft: '20px',
          display: 'block',
          paddingBottom: commandObj.flags ? '20px' : '0',
        },
      });
    }

    log({
      text: `"${command}" flags:`,
      styles: {
        color: '#4effee',
        fontWeight: 700,
      },
    });

    if (commandObj.flags) {
      commandObj.flags.forEach((commandParam, i, arr) => {
        log({
          text: `[--${commandParam.name}${
            commandParam.valueRequire ? `:${commandParam.valueName}` : ''
          }]`,
          styles: {
            paddingLeft: '20px',
            color: '#4effee',
          },
        });
        log({
          text: `${commandParam.description || ''}`,
          styles: {
            paddingLeft: '20px',
            paddingBottom: arr.length - 1 !== i ? '20px' : '0',
            display: 'block',
          },
        });
      });
    } else {
      log({
        text: `[no flags description]`,
        styles: {
          paddingLeft: '20px',
        },
      });
    }
  } else {
    log({
      text: `commands: <br />- ${Object.keys(commandLine.commands)
        .filter((c) => c !== 'help')
        .sort()
        .join('<br />- ')}`,
    });
    log({
      text: 'you can also type "{color: #e7e24d | help} {color: #4de7e7 | [?command&nbsp;name]}" for details about command [command name]',
    });
  }
}

const version = ({ log }) => log({ text: `e-term version: "${VERSION}"` });

const rename = ({ commandLine }, [name]) =>
  (commandLine.templateAPI.userName = name);

const readFile = ({ log }) => {
  const file = pickAFile();

  file.then((text) => {
    log({
      text,
    });
  });
};

export default {
  clear: {
    util: clear,
    schema: {
      description: 'Clear terminal output',
      flags: [
        {
          name: 'c',
          require: false,
          description: 'Deleting [count] lines of the terminal log',
          valueRequire: true,
          valueName: 'count',
        },
      ],
    },
  },
  help: {
    util: help,
    schema: {
      description: 'display all commands',
      params: [
        {
          name: 'command',
          description: 'Select a command name for help',
          require: false,
          default: 'null',
        },
      ],
    },
  },
  version: {
    util: version,
    schema: {
      description: 'Show current terminal version',
    },
  },
  rename: {
    util: rename,
    schema: {
      description: 'Rename user',
    },
  },
  'read-file': {
    util: readFile,
    schema: {
      description: 'Upload a file and display its content',
    },
  },
};
