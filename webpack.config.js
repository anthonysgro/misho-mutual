const path = require("path");
const webpack = require("webpack");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

const webpackConfig = {
    entry: {
        path: path.join(__dirname, "./src/index.tsx"),
    },
    output: {
        path: path.join(__dirname, "./public/dist"),
        filename: "main.js",
    },
    devtool: "inline-source-map",
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: ["style-loader", "css-loader", "sass-loader"],
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[name].[ext]",
                            outputPath: "fonts/",
                        },
                    },
                ],
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[name].[ext]",
                            outputPath: "images/",
                        },
                    },
                ],
            },
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                exclude: /(node_modules|bower_components)/,
            },
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: "babel-loader",
                options: {
                    presets: ["@babel/preset-react"],
                },
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "source-map-loader",
            },
        ],
    },
    resolve: {
        fallback: {
            http: require.resolve("stream-http"),
        },
        extensions: [
            "",
            ".webpack.js",
            ".web.js",
            ".ts",
            ".tsx",
            ".js",
            ".jsx",
        ],
    },
    plugins: [
        new webpack.ProvidePlugin({
            process: "process/browser",
        }),
        new NodePolyfillPlugin(),
    ],
};

module.exports = webpackConfig;
