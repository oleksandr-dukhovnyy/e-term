import getFlags from '../../js/getFlags.js';

const config = {
  input: {
    flagMask: ['^--[a-z]+[:a-z0-9]{0,}?$', 'i'],
    getFlagName: ['--|:[a-z0-9]*$', 'gi'],
    getFlagValue: ['--[a-z]*:?', 'i'],
  },
};

const userInputs = [
  {
    input: ['spme', '--conf:123', '123', '13:123'],
    params: ['spme', '123', '13:123'],
    flags: [{ name: 'conf', value: '123' }],
  },
  {
    input: ['spme', '--conf:', '123', '13:123'],
    params: ['spme', '123', '13:123'],
    flags: [{ name: 'conf', value: '' }],
  },
  {
    input: ['spme', '--conf:', '123', '13:123', '--a:a'],
    params: ['spme', '123', '13:123'],
    flags: [
      { name: 'conf', value: '' },
      { name: 'a', value: 'a' },
    ],
  },
];

userInputs.forEach((input) => {
  const parsed = getFlags(input.input, config);

  test(`getFlags: test no flags`, () => {
    expect(parsed.params).toEqual(input.params);
  });

  test(`getFlags: test flags`, () => {
    expect(parsed.flags).toEqual(input.flags);
  });
});
