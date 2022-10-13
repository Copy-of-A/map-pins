const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const devMode = process.env.NODE_ENV !== "production";

/**@type import("webpack-cli").WebpackConfiguration*/
module.exports = {
    entry: "./src/index.tsx",
    output: {
        path:__dirname + '/docs/',
        filename: "bundle.js",
        publicPath: '/'
    },
    module: {
        rules: [
            { test: /\.(m?jsx?|tsx?)$/, use: 'babel-loader', exclude: /node_modules/, },
            {
                test: /\.(sa|sc|c)ss$/i,
                use: [
                    devMode ? "style-loader" : MiniCssExtractPlugin.loader,
                    "css-loader",
                    "postcss-loader",
                    "sass-loader",
                ],
            },
            {
                test: /\.svg$/i,
                issuer: /\.[jt]sx?$/,
                use: ['@svgr/webpack'],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "public", "index.html"),
        }),
    ].concat(devMode ? [] : [new MiniCssExtractPlugin()]),
    resolve: {
        extensions: [
            '.wasm',
            '.mjs',
            '.js',
            '.json',
            '.jsx',
            '.ts',
            '.tsx',
            '.web.ts',
            '.web.tsx',
            '.web.js',
            '.web.jsx',
        ],
    }
}