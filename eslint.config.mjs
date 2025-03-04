/* eslint-disable */
import path from "node:path";
import { fileURLToPath } from "node:url";

import { fixupConfigRules, fixupPluginRules } from "@eslint/compat";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import _import from "eslint-plugin-import";
import prettier from "eslint-plugin-prettier";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  ...fixupConfigRules(
    compat.extends(
      "next/core-web-vitals",
      "next/typescript",
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended",
      "plugin:import/recommended",
      "plugin:import/typescript",
      "plugin:prettier/recommended",
      "airbnb",
      "airbnb/hooks"
    )
  ),
  {
    ignores: ["node_modules/*", "eslint.config.*"],
    plugins: {
      "@typescript-eslint": fixupPluginRules(typescriptEslint),
      prettier: fixupPluginRules(prettier),
      import: fixupPluginRules(_import),
    },

    languageOptions: {
      parser: tsParser,
      ecmaVersion: "latest",
      sourceType: "module",
    },

    settings: {
      "import/resolver": {
        typescript: true,
        node: true,
      },
    },

    rules: {
      "react/require-default-props": "off",
      "import/no-extraneous-dependencies": ["error", {"devDependencies": ["**/*.test.ts", "**/*.spec.ts"]}],
      "operator-linebreak":"off",
      "no-param-reassign": "off",
      "no-use-before-define": "off",
      "react/jsx-curly-newline": "off",
      "function-paren-newline": "off",
      "no-confusing-arrow": "off",
      "react/jsx-one-expression-per-line": "off",
      "import/prefer-default-export": "off",
      "no-underscore-dangle": "off",
      "comma-dangle": "off",
      "object-curly-newline": "off",
      "no-console": 1,
      "arrow-body-style": ["error", "as-needed"],
      "implicit-arrow-linebreak": "off",
      "class-methods-use-this": "off",
      "import/extensions": "off",
      "linebreak-style": "off",
      "no-debugger": 0,
      "no-restricted-imports": "off",
      "react/jsx-key": "off",
      "space-before-function-paren": 0,
      "react/jsx-props-no-spreading": "off",
      "react/jsx-no-useless-fragment": "warn",
      "react/react-in-jsx-scope": "off",
      "react/require-default-props": 1,
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/explicit-module-boundary-types": 2,
      "react/display-name": 0,
      "react/forbid-prop-types": 0,
      "@typescript-eslint/no-explicit-any": 2,
      "@typescript-eslint/no-empty-function": 0,
      quotes: [2, "double"],
      radix: 0,

      curly: [2, "all"],
      
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
          ],
          
          alphabetize: {
            caseInsensitive: true,
            order: "asc",
          },
          
          "newlines-between": "always",
        },
      ],

      "no-restricted-syntax": [
        2,
        "ForIn Statement",
        "Labeled Statement",
        "With Statement",
      ],
      "no-useless-constructor": "off",
      
      "prefer-const": [
        "error",
        {
          destructuring: "all",
        },
      ],
      
      "prefer-destructuring": [
        "error",
        {
          array: true,
          object: true,
        },
        {
          enforceForRenamedProperties: false,
        },
      ],
      
      "prettier/prettier": [
        "error",
        {
          endOfLine: "auto",
          singleQuote: false,
          tabWidth: 2,
          trailingComma: "es5",
          useTabs: false,
        },
      ],

      "react/jsx-filename-extension": [
        1,
        {
          extensions: [".tsx", ".ts"],
        },
      ],
 
      "@typescript-eslint/explicit-function-return-type": [
        2,
        {
          allowExpressions: true,
        },
      ],

      "@typescript-eslint/naming-convention": [
        "error",
        {
          selector: "interface",
          format: ["PascalCase"],

          custom: {
            regex: "^I[A-Z]",
            match: true,
          },
        },
      ],

      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      
      "jsx-a11y/anchor-is-valid": [
        "warn",
        {
          aspects: ["invalidHref"],
        },
      ],
      
      "jsx-a11y/href-no-hash": "warn",
      
      "jsx-a11y/label-has-associated-control": [
        "error",
        {
          assert: "either",
        },
      ],
    },
  },
];
