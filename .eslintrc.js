module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  plugins: ["jasmine"],
  extends: ['airbnb-base', '"plugin:prettier/recommended"'],
  overrides: [
    {
      env: {
        node: true,
        jest: true,
        jasmine: true,
      },
      files: [
        '.eslintrc.{js,cjs}',
      ],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
  },
};
