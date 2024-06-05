const path = require("path");
const fs = require("fs");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackInjectPreload = require("@principalstudio/html-webpack-inject-preload");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

function transformHTML(htmlPath) {
  const location = path.resolve(__dirname, htmlPath);
  try {
    return fs.readFileSync(location, "utf8");
  } catch (error) {
    console.warn(`Failed reading the file ${htmlPath}. Reason: ${error}`);
    return "";
  }
}

const pages = [
  { name: "index", pageName: "Acasă" },
  { name: "services", pageName: "Servicii" },
  { name: "gallery", pageName: "Galerie" },
  { name: "contact", pageName: "Contact" },
];

const entry = {};
entry.main = `./src/main/main.js`;
pages.forEach((page) => {
  entry[page.name] = `./src/${page.name}/${page.name}.js`;
});

module.exports = {
  mode: "production",
  // devtool: "eval-source-map",
  output: {
    path: path.resolve(__dirname, "dist"),
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
      return new HtmlWebpackPlugin({
        links: (() => {
          if (page.name === "index") {
            return `
          <ul>
            <li>
              <a id="home" href="./index.html">Acasă</a>
            </li>
            <li>
              <a id="services" href="./services/services.html">Servicii</a>
            </li>
            <li>
              <a id="gallery" href="./gallery/gallery.html">Galerie</a>
            </li>
            <li>
              <a id="contact" href="./contact/contact.html">Contact</a>
            </li>
          </ul>
          `;
          }
          return `
        <ul>
          <li>
            <a id="home" href="../index.html">Acasă</a>
          </li>
          <li>
            <a id="services" href="../services/services.html">Servicii</a>
          </li>
          <li>
            <a id="gallery" href="../gallery/gallery.html">Galerie</a>
          </li>
          <li>
            <a id="contact" href="../contact/contact.html">Contact</a>
          </li>
        </ul>
        `;
        })(),
        content: transformHTML(`./src/${page.name}/${page.name}.html`),
        localization: `<a class="disabled" href="../${page.name}/${page.name}.html">${page.pageName}</a>`,
        inject: true,
        template: `./src/main/main.html`,
        filename: () => {
          if (page.name === "index") {
            return `${page.name}.html`; // For the main page, output directly in dist
          }
          return `${page.name}/${page.name}.html`; // For other pages, output in respective folder
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
