module.exports = {
  root: true,
  env: {
    es2022: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['@typescript-eslint', 'import-newlines'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
  ],
  rules: {
    '@typescript-eslint/type-annotation-spacing': ['error', { after: true }],
    '@typescript-eslint/semi': ['off', 'never'],
    '@typescript-eslint/member-delimiter-style': [
      'error',
      { singleline: { delimiter: 'comma' } },
    ],
    'import/order': [
      'error',
      {
        'newlines-between': 'always',
        groups: [
          'builtin',
          'external',
          'internal',
          ['parent', 'sibling', 'index'],
          ['unknown', 'object'],
        ],
        alphabetize: { order: 'asc' },
      },
    ],
    'sort-imports': ['error', { ignoreDeclarationSort: true }],
    'object-curly-newline': [
      'error',
      {
        ExportDeclaration: { multiline: true, minProperties: 4 },
      },
    ],
    'import-newlines/enforce': [
      'error',
      {
        items: 3,
        'max-len': 100,
      },
    ],
    'import/prefer-default-export': 'off',
    'no-restricted-syntax': [
      'error',
      {
        selector: 'LabeledStatement',
        message:
          'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.',
      },
      {
        selector: 'WithStatement',
        message:
          '`with` is disallowed in strict mode because it makes code impossible to predict and optimize.',
      },
    ],
    'max-classes-per-file': 'off',
    'no-await-in-loop': 'off',
    'no-plusplus': 'off',
    'class-methods-use-this': 'off',
    'consistent-return': 'off',
    'max-len': ['warn', { code: 200 }],
    'no-param-reassign': [
      'error',
      {
        props: true,
        ignorePropertyModificationsForRegex: ['.*'],
      },
    ],
    '@typescript-eslint/padding-line-between-statements': [
      'error',
      {
        blankLine: 'always',
        prev: ['export', 'class', 'default', 'function'],
        next: ['export', 'class', 'default', 'function'],
      },
    ],
  },
}
