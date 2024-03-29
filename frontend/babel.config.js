// this file using jest library
module.exports = {
  plugins: [
    'babel-plugin-transform-typescript-metadata',
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: false }],
  ],
  presets: [
    "@babel/preset-react",
    // '@babel/preset-typescript',
    ["env", {
      "targets": {
        "node": "current"
      },
    }]
   ]
};
