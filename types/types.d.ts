declare namespace ETerm {
  export interface Output {
    text: string;
    styles?: {
      [key: string]: string;
    };
  }

  export type CommandOutput =
    | Promise<Output | void>
    | string
    | number
    | Output
    | void;

  export interface Commands {
    [key: string]: () => CommandOutput;
  }

  export interface CommandDescriptor {
    util(): CommandOutput;
    schema?: {
      // name of app
      name?: string;

      // app description
      description?: string;

      // params
      params?: {
        params: Array<{ name: string; description: string }>;
        flags: Array<{ name: string; description: string }>;
      };
    };
  }

  export interface Config {
    exec?: boolean;
    stdout: (data: CommandOutput) => 1 | 0;
    showInput?: boolean;
  }

  export interface Instance {
    exec: (
      command: string,
      useDefaultOutput: boolean
    ) => Promise<Output> | void;
    addCommand: (command: CommandDescriptor) => CommandOutput;
    config?: Config;
    commands: Commands;
  }

  export interface InstanceConfig {
    config?: Config;
    commands: Commands;
  }
}
