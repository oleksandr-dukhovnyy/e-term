# e-term

Just-add-water javascript terminal

## Installation

### npm

```bash
npm i e-term --save
```

### yarn

```bash
yarn add e-term
```

### CDN

```html
<script src="https://cdn.jsdelivr.net/npm/e-term@^1.2.4/dist/terminal.js"></script>
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/e-term@^1.2.4/dist/terminal.css"
/>
```

## Features

| Status icon | Description                                                                                              |
| ----------- | -------------------------------------------------------------------------------------------------------- |
| 📄          | Idea. It is not certain that it will be implemented                                                      |
| 📆          | Scheduled. These changes are planned to be implemented, but work on the implementation has not yet begun |
| 🚀          | In progress                                                                                              |
| ✅          | Done                                                                                                     |

| Feauture                                           | Status |
| -------------------------------------------------- | ------ |
| Add plugins docs                                   | 📆     |
| Migrate to TypeScript                              | 📆     |
| Log any HTML code as HTML                          | 📆     |
| Added sanitizer config to term config              | 📆     |
| Added nested commands support (syntax `{{ ... }}`) | 📆     |
| Add node socket (WebSockets) client                | 📄     |

## Types

```typescript
class ETerm {
  constructor(
    selector: string,
    commandsList: {
      [key: string]: Command;
    },
    Config
  );
}

// definitions:

type Command = CommandDescriptor;

interface CommandDescriptor {
  // command
  util(api: CommandlineAPI, params: string[]): any;

  // docs
  schema: CommandSchema;
}

interface CommandlineAPI {
  flags: FlagsAPI;

  // exec string as command
  exec(command: string): void;

  // non-parsed command
  source: string;
  commandLine: ETermInstance;

  // log data to screen
  log(logParams: LogParams): void;

  // start dialog
  dialog(dialogParams: DialogParams): Promise<string>;
}
```

For more types see [src/types.ts](./src/types.ts).

## Example (builder)

```html
<!DOCTYPE html>
<html>
  <head>
    ...
  </head>

  <body>
    <div e-term class="selector"></div>
  </body>
</html>
```

```typescript
import ETerm from 'e-term';
import 'e-term/terminal.css';

const term = new ETerm(
  // parent node
  // your parent node must have a "e-term" attribute for styles
  '.selector',

  // commands
  {
    // ------
    echo({ log }, params: string[]) {
      log({
        text: params.join(' '),
      });
    },
    // ------
    pss({ dialog, log }) {
      dialog({ text: 'enter password', hideInput: true, defaultValue: '' })
        .then((pass) => {
          log({
            text: `password length: ${pass.length}`,
          });
        })
        .catch((err) => {
          const text = err === 'escape' ? 'you press Esc' : err;

          log({
            text,

            // any css styles
            styles: {
              color: '#f00',
            },
          });
        });
    },
    // ------
    logRed({ log }) {
      log({
        text: '{color: #f00 | red text}, pure text, {color: red | another text}',
      });
    },
    // ------
    xssSafe({ log }) {
      log({
        text: '<img src="1" onerror="alert(1)" /> text', // displays only "text" string
      });
    },
    // ------
    provideDocs: {
      util({ log }) {
        log({
          text: 'provideDocs',
        });
      },
      schema: {
        description: 'awesome utill',
        flags: [
          {
            name: 'c',
            require: false,
            description: 'c flag',
            valueRequire: true,
            valueName: 'c',
          },
        ],
        params: [
          {
            name: 'param',
            description: 'param',
            require: false,
            default: 'null',
          },
        ],
      },
    },
    // ------
    moreAPI({ flags, exec, source, commandLine, pickAFile, downloadFile }) {
      console.log(flags, exec, source, commandLine);
    },
    // ------
  }
);

term.exec('echo param');
term.log({
  text: 'string to {color: red | log}',
});
```

## Example (CDN)

```html
<html>
  <head>
    <script src="https://cdn.jsdelivr.net/npm/e-term@^1.2.4/dist/terminal.js"></script>
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/e-term@^1.2.4/dist/terminal.css"
    />

    <script>
      const main = () => {
        const term = new ETerminal.Terminal('[e-term]', {
          echo({ log }, params: string[]) {
            log({ text: params.join(' ') });
          },
        });
      };

      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', main);
      } else {
        main();
      }
    </script>
  </head>

  <body>
    <div e-term></div>
  </body>
</html>
```
