module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  plugins: ["jasmine"],
  extends: 'airbnb-base',
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
