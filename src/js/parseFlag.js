const parseFlag = (flag, config) => ({
  name: flag.replace(new RegExp(...config.input.getFlagName), ''),
  value: flag.replace(new RegExp(...config.input.getFlagValue), ''),
});

export default parseFlag;
