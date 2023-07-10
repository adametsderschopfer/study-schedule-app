const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const path = require("path");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = {
  entry: "./src/index.tsx",
  output: {
    publicPath: "/",
    path: path.join(process.cwd(), "build"),
    filename: "[name].[contenthash].js",
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
    new BundleAnalyzerPlugin({
      analyzerMode: "static",
      openAnalyzer: false,
    }),
    new CopyPlugin({
      patterns: [{ from: "src/assets", to: "assets" }],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.[jt]s(x)?$/,
        loader: "esbuild-loader",
        options: {
          target: "es2015",
          tsconfig: "./tsconfig.json",
        },
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
            },
          },
          "postcss-loader",
        ],
        exclude: /\.module\.css$/,
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: true,
            },
          },
          "postcss-loader",
        ],
        include: /\.module\.css$/,
      },
      {
        test: /\.(jpg|png|gif)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              // Inline files smaller than 10 kB
              limit: 10 * 1024,
            },
          },
        ],
      },
      {
        test: /\.(eot|otf|ttf|woff|woff2)$/,
        use: "file-loader",
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\\.(png|jp(e*)g|svg|gif)$/,
        use: "file-loader",
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      "@app": path.resolve(process.cwd(), "/src/app/"),
      "@config": path.resolve(process.cwd(), "/src/config/"),
      "@domain": path.resolve(process.cwd(), "/src/domain/"),
      "@store": path.resolve(process.cwd(), "/src/store/"),
      "@ui": path.resolve(process.cwd(), "/src/ui/"),
      "@utils": path.resolve(process.cwd(), "/src/utils/"),
      "@assets": path.resolve(process.cwd(), "/src/assets/"),
    },
  },
  cache: {
    type: "filesystem",
    allowCollectingMemory: true,
    cacheDirectory: path.resolve(process.cwd(), ".temp_build_cache"),
  },
};
