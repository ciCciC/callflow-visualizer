module.exports = {
  parser: '@typescript-eslint/parser',  // Specifies the ESLint parser
  plugins: [
    '@typescript-eslint',
    'eslint-plugin-import',
    'html'
  ],
  extends: [
    'plugin:@typescript-eslint/eslint-recommended',
    // 'plugin:@typescript-eslint/recommended-requiring-type-checking'
  ],
  parserOptions: {
    project: './tsconfig.json',
    ecmaVersion: 6,  // Allows for the parsing of modern ECMAScript features
    sourceType: 'module',  // Allows for the use of imports
    ecmaFeatures: {
      jsx: true,  // Allows for the parsing of JSX
    },
  },
  rules: {
    'no-trailing-spaces': ['error', { 'skipBlankLines': false }],
    'radix': 'off',
    'no-shadow': 'off',
    'no-use-before-define': 'off',
    'import/order': ['error', {}],
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    'max-classes-per-file': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    'arrow-body-style': 'off',
    'arrow-parens': 0,
    'no-useless-constructor': 'warn',
    'curly': ['error', 'all'],
    'object-curly-newline': ['off', {
      'ObjectExpression': 'always',
      'ObjectPattern': { 'multiline': false },
      'ImportDeclaration': 'never',
      'ExportDeclaration': {
        'multiline': false,
        'minProperties': 99
      }
    }],
    'indent': ['error', 2, {
      'SwitchCase': 1
    }],
    'max-len': 0,
    'import/no-unresolved': 0,
    'no-extra-parens': 'off',
    'no-param-reassign': 'warn',
    '@typescript-eslint/no-non-null-assertion': 0,
    '@typescript-eslint/no-extra-parens': [
      'error'
    ],
    '@typescript-eslint/no-for-in-array': 'error',
    '@typescript-eslint/no-require-imports': 'off',
    '@typescript-eslint/no-this-alias': 'error',
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/no-unnecessary-qualifier': 'error',
    '@typescript-eslint/no-unnecessary-type-assertion': [
      'error'
    ],
    '@typescript-eslint/no-useless-constructor': 'warn',
    '@typescript-eslint/prefer-for-of': 'error',
    '@typescript-eslint/prefer-function-type': 'warn',
    '@typescript-eslint/prefer-includes': 'error',
    '@typescript-eslint/prefer-string-starts-ends-with': 'error',
    '@typescript-eslint/restrict-plus-operands': 'error',
    '@typescript-eslint/prefer-regexp-exec': 'error',
    '@typescript-eslint/unified-signatures': 'error',
    'import/no-extraneous-dependencies': 0,
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        'argsIgnorePattern': '^_'
      }
    ],
    '@typescript-eslint/member-ordering': [
      'error'
    ],
  },
  settings: {
  },
};
