module.exports = {
  env: {
    node: true,
  },
  overrides: [
    {
      files: ["*.ts"],
      extends: [
        "airbnb-base",
        "airbnb-typescript/base",
        ".eslintrc.js",
      ],
    },
  ],
}
