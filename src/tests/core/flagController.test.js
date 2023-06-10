import flagController from '../../js/flagController';

const flags = [
  { name: 'color', value: '#f00' },
  { name: 'text', value: 'nice' },
  { name: 'speed', value: '500' },
];

const controller = flagController(flags);

test(`flagController.flags: controller.flags === flags`, () => {
  expect(controller.flags).toBe(flags);
});

test(`flagController.forEach: controller.forEach === flags.forEach`, () => {
  expect(controller.forEach).toBe(flags.forEach);
});

flags.forEach((f) => {
  test(`flagController.getFlag: "${f.name}", exept value === "${f.value}"`, () => {
    expect(controller.getFlag(f.name).value).toBe(f.value);
  });
});

test(`flagController.getFlag: "bla-bla", exept "undefined"`, () => {
  expect(controller.getFlag('bla-bla')).toBe(undefined);
});

flags.forEach((f) => {
  test(`flagController.hasFlag: "${f.name}", exept === "true"`, () => {
    expect(controller.hasFlag(f.name)).toBe(true);
  });
});

test(`flagController.hasFlag: "bla-bla", exept === "false"`, () => {
  expect(controller.hasFlag('bla-bla')).toBe(false);
});
