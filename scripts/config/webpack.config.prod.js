const webpackConfigBase = require("./webpack.config.base.js");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { EsbuildPlugin } = require("esbuild-loader");

module.exports = {
  ...webpackConfigBase,

  mode: "production",
  output: {
    ...webpackConfigBase.output,
    publicPath: "/new/",
    chunkFilename: "chunks/[name].[chunkhash].chunk.js",
  },
  plugins: [
    ...webpackConfigBase.plugins,
    new HtmlWebpackPlugin({
      publicPath: "/new",
      template: "src/index.html",
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
      inject: true,
    }),
  ],
  optimization: {
    sideEffects: true,
    concatenateModules: true,
    minimize: true,
    runtimeChunk: "single",
    minimizer: [new EsbuildPlugin({ target: "es2015", css: true })],
    splitChunks: {
      chunks: "all",
      maxInitialRequests: 10,
      minSize: 1,
      minChunks: 3,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            const packageName = module.context.match(
              /[\\/]node_modules[\\/](.*?)([\\/]|$)/,
            )[1];
            return `modules/npm.${packageName.replace("@", "")}`;
          },
        },
      },
    },
  },
};
