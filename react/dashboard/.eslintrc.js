module.exports = {
    "env": {
      "browser": true,
      "es6": true
    },
    "extends": [
      "eslint:recommended",
      "plugin:react/recommended"
    ],
    "parser": "babel-eslint",
    "parserOptions": {
      "ecmaFeatures": {
        "experimentalObjectRestSpread": true,
        "jsx": true
      },
      "sourceType": "module"
    },
    "plugins": [
      "react"
    ],
    "rules": {
      "no-undef": [
        "warn"
      ],
      "strict": 0,
      "indent": [
        "warn",
        4
      ],
      "semi": [
        "error",
        "never"
      ],
      "eqeqeq": "error",
      "no-trailing-spaces": "warn",
      "object-curly-spacing": [
        "warn", "always"
      ],
      "arrow-spacing": [
        "warn", { "before": true, "after": true }
      ],
      "no-console": 0,
      "react/prop-types": 0
    }
  };