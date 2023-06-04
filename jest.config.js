module.exports = {
  collectCoverage: false,
  coveragePathIgnorePatterns: ['\\\\node_modules\\\\'],
  coverageProvider: 'v8',
  transformIgnorePatterns: ['node_modules/(?!@ngrx|(?!deck.gl)|ng-dynamic)'],
};
