const webpack = require('webpack');
const path = require('path');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const buildPath = path.join(__dirname, 'dist/');

const plugins = [
    new CleanWebpackPlugin(['./dist']),
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false,
        },
    }),
];

const commonLoaders = [
    {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['babel'],
    },
];

const config = {
    entry: {
        lucerne: './src/javascripts/index.js',
    },
    output: {
        path: buildPath,
        filename: '[name].js',
        library: 'library',
        libraryTarget: 'umd',
        umdNamedDefine: true,
    },
    module: {
        loaders: commonLoaders,
    },
    plugins,
};

module.exports = [
    config,
];
