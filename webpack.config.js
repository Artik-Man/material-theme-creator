const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
    devServer: {
        liveReload: true,
        // publicPath: path.resolve(__dirname, 'docs'),
        // contentBase: './',
        compress: true,
        host: '0.0.0.0',
        port: 4200,
        overlay: true
    },
    entry: './src/scripts/index.ts',
    output: {
        path: path.resolve(__dirname, 'docs'),
        publicPath: './'
    },
    module: {
        rules: [
            {
                test: /\.pug$/,
                use: [
                    {
                        loader: 'pug-loader',
                    }
                ]
            },
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader",
                ],
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [{from: './src/assets', to: './assets'}],
        }),
        new HtmlWebpackPlugin({
            template: './src/index.pug',
        }),
        new MiniCssExtractPlugin({
            filename: 'styles.css'
        }),
    ]
}
