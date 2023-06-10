import commandParser from '../../js/commandParser.js';

const config = {
  input: {
    flagMask: ['^--[a-z]+[:a-z0-9]{0,}?$', 'i'],
    getFlagName: ['--|:[a-z0-9]*$', 'gi'],
    getFlagValue: ['--[a-z]*:?', 'i'],
  },
};

const userInputs = [
  {
    input: 'spme --conf:123 123 13:123',
    command: 'spme',
    params: ['123', '13:123'],
    flags: [{ name: 'conf', value: '123' }],
  },
  {
    input: 'spme --conf: 123 13:123',
    command: 'spme',
    params: ['123', '13:123'],
    flags: [{ name: 'conf', value: '' }],
  },
  {
    input: 'spme --conf: 123 13:123 --a:a',
    command: 'spme',
    params: ['123', '13:123'],
    flags: [
      { name: 'conf', value: '' },
      { name: 'a', value: 'a' },
    ],
  },
];

userInputs.forEach((input) => {
  const parsed = commandParser(input.input, config);

  test(`commandParser: command`, () => {
    expect(parsed.command).toEqual(input.command);
  });

  test(`commandParser: params`, () => {
    expect(parsed.params).toEqual(input.params);
  });

  test(`commandParser: flags`, () => {
    expect(parsed.flags).toEqual(input.flags);
  });
});
