module.exports = {
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  parserOptions: {
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
    },
    project: './tsconfig.json',
  },
  settings: {
    react: {
      version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
    },
  },
  extends: [
    'airbnb-typescript',
    // 'plugin:react/recommended', // Uses the recommended rules from @eslint-plugin-react
    // 'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    'prettier', // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
    'plugin:prettier/recommended', // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
    'plugin:import/recommended'
  ],
  ignorePatterns: ['src/typings.d.ts', 'src/serviceWorker.ts', 'src/react-app-env.d.ts'],
  rules: {
    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
    // e.g. "@typescript-eslint/explicit-function-return-type": "off",
    'react/prop-types': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-this-alias': 'off',
    'react/require-default-props': 'off',
    'import/prefer-default-export': 'off',
    'react/jsx-props-no-spreading': 'warn',
    'jsx-a11y/click-events-have-key-events': 'warn',
    'jsx-a11y/no-static-element-interactions': 'warn',
    '@typescript-eslint/no-unused-expressions': 'warn',
    'jsx-a11y/anchor-is-valid': [ "error", {
      "components": [ "React" ],
      "specialLink": [ "to" ]
    }],
    'no-irregular-whitespace': 'warn',
    'no-nested-ternary': 'warn',
    'no-new-wrappers': 'warn',
    'no-console': 'warn',
    '@typescript-eslint/lines-between-class-members': 'off',
    'class-methods-use-this': 'off',
    'import/extensions': 'warn',
    'no-void': 'off',
    'import/order': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
  },
};
