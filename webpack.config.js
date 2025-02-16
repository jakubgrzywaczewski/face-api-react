const path = require("node:path");

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: "pre",
        use: ["source-map-loader"],
        exclude: [/node_modules/],
      },
    ],
  },
  ignoreWarnings: [
    {
      module: /face-api\.js/,
    },
  ],
  stats: {
    warningsFilter: (warning) => /face-api\.js/.test(warning.message),
  },
  devtool: false,
  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
    },
    historyApiFallback: true,
  },
  output: {
    publicPath:
      process.env.NODE_ENV === "production" ? "/face-api-react/" : "/",
  },
  resolve: {
    fallback: {
      fs: false,
    },
  },
};
