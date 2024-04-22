module.exports = {
  extends: require.resolve('@umijs/max/eslint'),
  rules: {
    "@typescript-eslint/no-use-before-define": "off",
    "no-plusplus": "off",
    "@typescript-eslint/no-shadow": "off",
    "consistent-return": "off"
  }
};
