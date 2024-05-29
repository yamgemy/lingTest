module.exports = {
  root: true,
  plugins: ['react', '@typescript-eslint'],
  extends: [
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest', // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
      modules: true
    },
    project: './tsconfig.json',
  },
  rules: {
    'linebreak-style': 0,
    'max-len': ['error', 110],
    "@typescript-eslint/indent": ["error", 2, { "ignoredNodes": ["JSXAttribute", "JSXElement *", "TemplateLiteral *"] }],
    'react/jsx-indent-props': 2,
    'react/jsx-indent': ["error", 2],
    '@typescript-eslint/ban-ts-comment': 0,
    '@typescript-eslint/no-explicit-any': 0,
    'no-multiple-empty-lines': ["error", { "max": 1, "maxEOF": 0 }],
    'semi': 2,
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn"
  },
  globals: {
    JSX: true
  },
  settings: {
    react: {
      version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
    },
  },
}