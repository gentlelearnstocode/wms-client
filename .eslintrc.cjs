// eslint-disable-next-line no-undef
module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['prettier', 'react', 'jsx-a11y', 'react-hooks', '@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  rules: {
    'prettier/prettier': 'warn',
    'react/react-in-jsx-scope': 'off',
  },
};
