import parseFlag from '../../js/parseFlag.js';

const flags = [
  {
    str: '--config:true',
    value: 'true',
    name: 'config',
  },
  {
    str: '--delay:200',
    value: '200',
    name: 'delay',
  },
  {
    str: '--stop',
    value: '',
    name: 'stop',
  },
  {
    str: '--stop:',
    value: '',
    name: 'stop',
  },
];

const config = {
  input: {
    getFlagName: ['--|:[a-z0-9]*$', 'gi'],
    getFlagValue: ['--[a-z]*:?', 'i'],
  },
};

flags.forEach((f) => {
  const flag = parseFlag(f.str, config);

  test(`parseFlag: "${f.str}"`, () => {
    expect(flag.name).toBe(f.name);
    expect(flag.value).toBe(f.value);
  });
});
