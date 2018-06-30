'use strict';

const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
    watch: true,
    watchOptions: {
        aggregateTimeout: 100
    },
    devtool: 'inline-source-map',
    module: {
        rules: [{
            test: /\.js$/,
            enforce: 'pre',
            exclude: /node_modules/,
            use: [{
                    loader: 'eslint-loader',
                    options: {
                        configFile: './config/eslint/.eslintrc.js'
                    }
                }]
        },
        {
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [{
                    loader: 'css-loader',
                    options: {
                        sourceMap: true,
                    }
                },
                {
                    loader: 'sass-loader',
                    options: {
                        sourceMap: true,
                    }
                }]
            })
        }]
    }
};

module.exports = config;