const splitCommand = (str, config) => {
  const splited = str.split(/\s/);

  if (!config.input.groupUsingQuotes) {
    return splited;
  }

  const getRegex = (before = '', after = '', flags = 'g') =>
    new RegExp(`${before}${config.input.quoteForGrouping}${after}`, flags);

  return splited.reduce(
    (a, c, i, arr) => {
      if (getRegex('^').test(c)) {
        a[0].push(c.replace(getRegex(), ''));
      } else if (getRegex('', '$').test(c)) {
        a[0].push(c.replace(getRegex(), ''));
        a[1].push(a[0].join(' '));
        a[0] = [];
      } else if (a[0].length) {
        a[0].push(c);
      } else {
        a[1].push(c);
      }

      if (arr.length - 1 === i && a[0].length) {
        a[1].push(a[0].join(' '));
      }

      return a;
    },
    [[], []]
  )[1];
};

export default splitCommand;
