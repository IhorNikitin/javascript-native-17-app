'use strict';

const NODE_ENV = process.env.NODE_ENV || 'development';

const path = require('path');
const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const env = NODE_ENV == 'development'
    ? require('./config/webpack/webpack.dev.js')
    : require('./config/webpack/webpack.prod.js');

const config = merge({
    context: path.join(__dirname, 'src'),
    entry: {
        main: path.join(__dirname + '/src/js/main.js'),
    },
    output: {
        path: path.join(__dirname, '/public/js'),
        filename: 'bundle.js'
    },
    resolve: { 
        modules: ['node_modules'],
        extensions: ['*', '.js']
    }﻿,
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: [{
                loader: 'babel-loader',
                options: { 
                    presets: ['es2015']
                }
            }]
        },
        {
            test: /\.html$/,
            use: [{
                loader: 'file-loader',
                options: {
                    name: '../[name].[ext]'
                }  
            }]
        },
		{
            test: /\.(eot|svg|ttf|woff|woff2)$/,
            use: [{
                loader: 'file-loader',
                options: {
                    name: '../assets/fonts/webfonts/[name].[ext]'
                }  
            }]
        },
        {
            test: /\.(png|jpg|gif)$/,
            use: [{
                loader: 'file-loader',
                options: {
                    name: '../img/[name].[ext]'
                }  
            }]
        }]
    },
    plugins: [
        new CleanWebpackPlugin('public'),
        new ExtractTextPlugin('../css/[name].css')		
    ]
}, env);

module.exports = config;