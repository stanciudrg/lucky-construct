const path = require("path");
const fs = require("fs");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackInjectPreload = require("@principalstudio/html-webpack-inject-preload");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

// Extract html content from file with Node

function transformHTML(htmlPath) {
  const location = path.resolve(__dirname, htmlPath);
  try {
    return fs.readFileSync(location, "utf8");
  } catch (error) {
    console.warn(`Failed reading the file ${htmlPath}. Reason: ${error}`);
    return "";
  }
}

// Reference for dev and public names for each page

const pages = [
  { name: "index", pageName: "Acasă" },
  { name: "services", pageName: "Servicii" },
  { name: "gallery", pageName: "Galerie" },
  { name: "contact", pageName: "Contact" },
];

const entry = {
  // Holds the static html content that is inherited by all pages (navbar, logo, footer...)
  main: `./src/main/main.js`,
};

// Create an entry for each page
pages.forEach((page) => {
  entry[page.name] = `./src/${page.name}/${page.name}.js`;
});

module.exports = {
  mode: "production",
  output: {
    path: path.resolve(__dirname, "dist"),
    // Store index files directly in dist, otherwise create separate directories (needed for GitHub pages to work)
    filename: ({ chunk }) => {
      if (chunk.name === "index") {
        return "[name].js";
      }
      return "[name]/[name].js";
    },
    clean: true,
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    hot: false,
  },
  entry,
  plugins: [].concat(
    // eslint-disable-next-line
    pages.map((page) => {
      // Generate HTML file for each page
      return new HtmlWebpackPlugin({
        // Different relative paths based on document's location inside dist
        path: (() => {
          if (page.name === "index") {
            return "./";
          }
          return "../";
        })(),
        // Combine the html content extracted from this page with the universaL html content of main.html (see 'template' bellow)
        content: transformHTML(`./src/${page.name}/${page.name}.html`),
        // Href value used inside navigational links (a elements);
        localization: `../${page.name}/${page.name}.html`,
        // Name value used inside navigational links (a elements);
        pageName: page.pageName,
        inject: true,
        // Universal html content (navbar, logo, footer...);
        template: `./src/main/main.html`,
        filename: () => {
          // Output index directly in dist to be served by GitHub pages
          if (page.name === "index") {
            return `${page.name}.html`;
          }
          // Output other pages in their respective folders
          return `${page.name}/${page.name}.html`;
        },
        chunks: ["main", page.name],
        favicon: "./src/img/favicon.ico",
        minify: true,
      });
    }),
    new HtmlWebpackInjectPreload({
      files: [
        {
          match: /.*\.woff$/,
          attributes: { as: "font", type: "font/woff", crossorigin: true },
        },
        {
          match: /.*\.svg$/,
          attributes: { as: "image" },
        },
      ],
    }),
    new MiniCssExtractPlugin({
      // Store index files directly in dist, otherwise create separate directories (needed for GitHub pages to work)
      filename: ({ chunk }) => {
        if (chunk.name === "index") {
          return "[name].css";
        }
        return "[name]/[name].css";
      },
    }),
  ),
  module: {
    rules: [
      {
        test: /\.(?:js|mjs|cjs)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]],
          },
        },
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
        type: "asset/resource",
        exclude: [path.resolve(__dirname, "src/inline-svg")],
        generator: {
          filename: "img/[name][ext]",
        },
      },
      {
        test: /\.svg$/i,
        loader: "svg-inline-loader",
        exclude: [path.resolve(__dirname, "src/img")],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
        generator: {
          filename: "fonts/[contenthash][ext]",
        },
      },
    ],
  },
  optimization: {
    minimizer: ["...", new CssMinimizerPlugin()],
  },
};
