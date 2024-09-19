// Important modules this config uses

import path from "path";

process.noDeprecation = true;

const requireBaseServer = (options) => ({
  mode: "production",
  entry: options.entry,
  output: Object.assign(
    {
      // Compile into js/build.js
      path: path.resolve(process.cwd(), "build"),
      publicPath: "/",
      library: "App",
      libraryTarget: "commonjs2",
    },
    options.output,
  ), // Merge with env dependent settings
  // externals: [nodeExternals()],
  optimization: options.optimization,

  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        use: [
          {
            loader: "swc-loader",
            options: {
              "minify": false,
              jsc: {
                parser: {
                  syntax: "typescript",
                  tsx: true,
                  target: "es5",
                },
              },
            },
          },
        ],
        // exclude: /node_modules/,
        resolve: {
          fullySpecified: false,
        },
      },

      {
        // Preprocess our own .css files
        // This is the place to add your own loaders (e.g. sass/less etc.)
        // for a list of loaders, see https://webpack.js.org/loaders/#styling
        test: /\.css$/,
        exclude: /node_modules/,
        use: ["style-loader", "css-loader"],
      },
      {
        // Preprocess 3rd party .css files located in node_modules
        test: /\.css$/,
        include: /node_modules/,
        resourceQuery: { not: [/raw/] },
        use: ["style-loader", "css-loader"],
      },
      {
        resourceQuery: /raw/,
        test: /\.css$/,
        type: "asset/source",
        include: /node_modules/,
      },
      {
        test: /\.(jpg|png|gif|eot|otf|ttf|woff|woff2|webp)$/,
        type: "asset/resource",
      },
      {
        test: /\.svg$/i,
        type: "asset/resource",
        resourceQuery: /url/,
      },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        resourceQuery: { not: [/url/] },
        use: [{ loader: "@svgr/webpack", options: { prefixIds: false } }],
      },
      {
        test: /\.html$/,
        use: "html-loader",
      },
      {
        test: /\.(mp4|webm)$/,
        type: "asset/resource",
      },
    ],
  },
  resolve: {
    modules: ["node_modules", "app"],
    extensions: [".js", ".jsx", ".ts", ".tsx", ".react.js"],
    mainFields: ["browser", "module", "main", "default"],
  },
  devtool: options.devtool,
  target: "node", // Make web variables accessible to webpack, e.g. window
  performance: options.performance || {},
});

const entryObject = {
  main: [path.join(process.cwd(), "app/appGeneral.tsx")],
};

export default requireBaseServer({
  mode: "production",
  entry: entryObject,
  stats: {
    entrypoints: true,
  },
  // Utilize long-term caching by adding content hashes (not compilation hashes) to compiled assets
  output: {
    filename: "[name].server.js",
    chunkFilename: "[name].server.chunk.js",
  },
});
