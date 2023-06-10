import parseFlag from './parseFlag.js';

const getFlags = (arr, config) => {
  const flags = [];

  return {
    flags,
    params: arr.filter((p) => {
      const isFlag = new RegExp(...config.input.flagMask).test(p);

      if (isFlag) {
        flags.push(parseFlag(p, config));
      }

      return !isFlag && p !== '';
    }),
  };
};

export default getFlags;
