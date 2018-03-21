module.exports = {
    "env": {
      "browser": true,
      "es6": true
    },
    "extends": [
      "eslint:recommended",
      "plugin:react/recommended"
    ],
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
      "indent": [
        "warn",
        2,
        {indentSwitchCase: false}
      ],
      "quotes": [
        "error",
        "single"
      ],
      "semi": [
        "error",
        "never"
      ],
      "eqeqeq": "error",
      "no-trailing-spaces": "error",
      "object-curly-spacing": [
        "error", "always"
      ],
      "arrow-spacing": [
        "error", { "before": true, "after": true }
      ],
      "no-console": 0,
      "react/prop-types": 0
    }
  };