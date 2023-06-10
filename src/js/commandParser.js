import getFlags from './getFlags.js';
import splitCommand from './splitCommand.js';

const commandParser = (str, config) => {
  const splitted = splitCommand(str, config);
  const { params, flags } = getFlags(splitted.slice(1), config);

  return {
    command: splitted[0],
    params,
    flags,
  };
};

export default commandParser;
