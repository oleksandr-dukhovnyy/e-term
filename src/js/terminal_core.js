import '../css/index.scss';
import commandParser from './commandParser.js';
import createTemplate from './createTemplate.js';
import flagController from './flagController.js';
import defaultUtils from './defaultUtils.js';
import LogToConsole from './output-handling/logToConsole.js';
import pickAFile from './pickAFile.js';
import downloadFile from './downloadFile.js';
import connectPlugin from './plugin-support/connectPlugin.js';
import dialog from './dialog.js';

const terms = {};
const getFreeTermId = (() => {
  let id = 0;
  return () => id++;
})();

export class Terminal {
  constructor(
    containSelector,
    commands = {},
    {
      userName = 'user',
      exec: execAsJSByDefault = false,
      fillParent,
      rounded = true,
    } = {}
  ) {
    this.node = document.querySelector(containSelector);

    if (this.node === null) {
      console.error(
        `[e-term err]: cannot to find node to mount\n\nelem "${containSelector}" not found. Aborting.\n\n- make sure node is exist\n- try wrap your code in 'DOMContentLoaded' event handler\n\n`
      );

      return;
    }

    const config = {
      output: {
        defaultFontSize: '1em',
        defaultFontFamily: 'Roboto Mono',
        defaultColor: '#fff',
        showArrowByDefault: false,
        maxAliveLogRows: 150,
        useInnerText: false,
        defaultDisplay: 'block',
        defaultWordBreak: 'break-all',
      },
      input: {
        showInput: false,
        flagMask: ['^--[a-z]+[:a-z0-9]{0,}?$', 'i'],
        getFlagName: ['--|:[a-z0-9]*$', 'gi'],
        getFlagValue: ['--[a-z]*:?', 'i'],
        groupUsingQuotes: true,
        quoteForGrouping: "'",
      },
      globalConfig: {
        version: VERSION,
      },
    };

    const commandsHistory = [];
    const currentCommand = {
      value: 0,
    };

    for (let util in defaultUtils) {
      if (commands[util] === undefined) commands[util] = defaultUtils[util];
    }

    const commandsAPI = {
      pickAFile,
      downloadFile,
      getDialog: (name) => dialog.bind(this, name),
    };

    const exec = async (command, showRez) => {
      if (config.input.showInput) {
        showRez(
          {
            text: `< ${command}`,
          },
          false
        );
      }

      commandsHistory.push(command);
      currentCommand.value = commandsHistory.length - 1;
      const parsed = commandParser(command, config);

      if (commands[parsed.command] !== undefined) {
        const api = {
          log: showRez,
          flags: flagController(parsed.flags),
          exec: (c) => exec(c, showRez),
          source: command,
          commandLine: this,
          dialog: dialog.bind(this, parsed.command),
          ...commandsAPI,
        };

        let commandToExec = commands[parsed.command];

        if (typeof commands[parsed.command] === 'function') {
          commandToExec = {
            util: commandToExec,
          };
        } else if (!('util' in commands[parsed.command])) {
          return showRez({
            text: `[scheme error]: command: "${parsed.command}" not have a "util" method`,
            styles: { color: '#f00' },
          });
        }

        try {
          const commandRes = commandToExec.util(api, parsed.params);

          if (commandRes instanceof Promise) {
            this.input.setAttribute('disabled', 'disabled');
            await commandRes;
            this.input.removeAttribute('disabled');
          }
        } catch (err) {
          this.input.removeAttribute('disabled');
          showRez({
            text: `[command error]: "${err}"`,
            styles: { color: '#f00' },
          });
        }
      } else if (execAsJSByDefault) {
        try {
          const styles = {};
          showRez({ text: eval(command) }, styles);
        } catch (err) {
          showRez({ text: `[eval err]: "${err}"`, styles: { color: '#f00' } });
        }
      } else {
        showRez({
          text: `[err]: command "${parsed.command}" not found`,
          styles: { color: '#f00' },
        });
      }

      return Promise.resolve();
    };

    const templateAPI = createTemplate({
      node: this.node,
      callback: exec,
      commandsHistory,
      currentCommand,
      userName,
      config,
      logToConsole: LogToConsole,
      fillParent,
      rounded,
    });

    this.templateAPI = templateAPI;

    this.output = this.node.querySelector('.e-commandline-output');
    this.input = this.node.querySelector('.e-commandline-input-input');
    this.dialogInputNode = this.node.querySelector('.dialog-input');
    this.dialogTextNode = this.node.querySelector('.dialog-text');
    this.userNameNode = this.node.querySelector('.e-commandline-input-user');

    this.log = (...p) => {
      LogToConsole(this.output, config, ...p);
    };
    this.config = config;
    this.commands = commands;
    this.exec = (c) =>
      exec(c, (...p) => {
        LogToConsole(this.output, config, ...p);
      });
    this.setIntoInput = (text) => {
      this.input.value = text;
    };

    this.id = getFreeTermId();

    this.plugins = {
      connect: (plugin, options) => {
        return new Promise((resolve, reject) => {
          if (!options) {
            return reject('options is required!');
          } else if (!options.hasOwnProperty('name')) {
            return reject('options.name is required!');
          }

          connectPlugin
            .call({ ...this, commandsAPI }, plugin, options)
            .then(() => {
              this.plugins.list.push(options.name);
              resolve();
            })
            .catch(reject);
        });
      },
      list: [],
    };

    terms[this.id] = this;
  }
}

export { terms };

export default Terminal;
