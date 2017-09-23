const path  = require('path');

const CleanWebpackPlugin = require('clean-webpack-plugin');

const webpack = require('webpack');


const ExtractTextPlugin = require('extract-text-webpack-plugin');
// Create multiple instances
const extractCSS = new ExtractTextPlugin("a.css");
const extractSASS = new ExtractTextPlugin("b.css");

module.exports = {
    entry: {
        app: './src/app',
        vendor : [
            "react",
            "react-dom",
            "lodash"
        ]
    },

    output:{
        filename:"[name].js",
        path:path.resolve(__dirname,'built'),
        chunkFilename: "[name].js",
        publicPath: "/"

    },
    module:{
        rules:[
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {}
                    }
                ]
            },
            {
                test: /\.css$/,
                use: extractCSS.extract([{
                    loader:'css-loader',
                    options:{
                        minimize:true,
                        sourceMap: false,
                    }

                }  ])
            },
            {
                test: /\.scss$/i,
                use: extractSASS.extract([
                    {
                        loader:'css-loader',
                        options:{
                            minimize:true,
                            sourceMap:false,
                        }
                    },
                    'sass-loader' ])
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env','es2015', 'react'],

                    }
                }
            }
        ]
    },
    plugins:[

        new CleanWebpackPlugin(['built']),
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",

            minChunks: Infinity,

        }),
        new webpack.ProvidePlugin({
                  $: 'jquery'
        }),
        extractCSS,
        extractSASS
    ]
}

