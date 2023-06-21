class ETerm {
  // @ts-ignore
  constructor(
    selector: string,
    commandsList: {
      [key: string]: Command;
    },
    config: ETermInstanceConfig
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

  // pick a file from user filesystem
  pickAFile(getText?: boolean /* true */): Promise<string | File>;

  // download file to user filesystem
  downloadFile(
    file: string | File | Blob | ArrayBuffer,
    fileName: string,
    fileMIMEType: string
  ): void;
}

interface FlagsAPI {
  // list of flags
  flags: Flag[];

  // get flag by flagname name
  getFlag(name: string): Flag;

  // is flag with name %name% provided
  hasFlag(name: string): boolean;

  // forEach for flags
  forEach(): void;
}

interface Flag {
  // name of flag
  name: string;

  // flag value
  value: string;
}

interface DialogParams {
  // text to explain user what he should to enter
  text: string;

  // hide entered text. Length of input will be hidden too
  hideInput: boolean;

  // default value for dialog
  defaultValue: string;
}

interface LogParams {
  // text to display
  text: string;

  // one output = one span. Set span styles with CSSStyleDeclaration.
  // Read more: https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleDeclaration
  styles?: CSSStyleDeclaration;
}

interface CommandSchema {
  // command description
  description: string;

  // params description
  params?: Array<{
    // param name
    name: string;

    // param description
    description?: string;

    // is this param is require?
    require?: boolean;

    // default value
    default?: string;

    // if param is not single
    // for example, for util "send-email" you pick a list of emails
    // so, set "many" param to true, set name to "email" and get next documentation: send-email [...email]
    many?: boolean;

    // if param can have only a one from list specific value
    currectValues?: string[];
  }>;

  // flags description
  flags?: Array<{
    // flag name
    name: string;

    // is this flag is required?
    require?: boolean;

    // flag description
    description?: string;

    // is flag works only in cases where flag value is provided
    valueRequire?: boolean;

    // flag value name
    valueName?: string;
  }>;
}

interface ETermInstanceConfig {
  // valueKey: type; // by default

  output: {
    defaultFontSize: string; // '1em',
    defaultFontFamily: string; // 'Roboto Mono',
    defaultColor: string; // '#fff'
    showArrowByDefault: boolean; // false
    maxAliveLogRows: number; // 150
    useInnerText: boolean; // false
  };
  input: {
    showInput: boolean; // false
    flagMask: [
      regexp: string, // '^--[a-z]+[:a-z0-9]{0,}?$'
      flags: string // 'i'
    ];
    getFlagName: [
      regexp: string, // '--|:[a-z0-9]*$'
      flags: string // 'gi'
    ];
    getFlagValue: [
      regexp: string, // '--[a-z]*:?'
      flags: string // 'i'
    ];
    groupUsingQuotes: boolean; // true
    quoteForGrouping: string; // "'"
  };
  globalConfig: {
    // lib version
    version: string;
  };
}

interface ETermInstance {
  commands: {
    [key: string]: Command;
  };

  // instance configuration
  config: ETermInstanceConfig;
  dialogInputNode: HTMLInputElement;
  dialogTextNode: HTMLDivElement;

  // exec command
  exec(command: string): void;

  // instance id
  id: number;

  // commandline input
  input: HTMLInputElement;

  // log data to command line outside of util
  log(params: LogParams): void;

  // root node
  node: Element;

  // output node
  output: HTMLDivElement;

  // set text to input
  setIntoInput(value: string): void;

  // templateAPI
  templateAPI: {
    // user name to display
    // this param is reactive
    userName: string;
  };
  userNameNode: HTMLDivElement;
}
