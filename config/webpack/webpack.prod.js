'use strict';

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const config = {
    module: {
        rules: [{
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [{
                    loader: 'css-loader',
                    options: {
                        minimize: true
                    }
                },
                'sass-loader'
                ]
            })
        }]
    },
    plugins: [
        new UglifyJsPlugin({
            test: /\.js$/
        })		
    ]
};

module.exports = config;
