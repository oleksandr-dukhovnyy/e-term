function flagController(flags) {
  return {
    flags,
    getFlag: (name) => flags.find((f) => f.name === name),
    hasFlag: (name) => Boolean(flags.find((f) => f.name === name)),
    forEach: flags.forEach,
  };
}
export default flagController;
