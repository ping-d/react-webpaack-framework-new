const path  = require('path');

const CleanWebpackPlugin = require('clean-webpack-plugin');

const webpack = require('webpack');


const ExtractTextPlugin = require('extract-text-webpack-plugin');
// Create multiple instances
const extractCSS = new ExtractTextPlugin({filename:'[name][id]a.css',allChunks: true});
const extractSCSS = new ExtractTextPlugin({filename:'[name][id]b.css',allChunks: true});

module.exports = {
    entry: {
        app: './src/app/index.jsx',
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
                exclude: /^node_modules$/,
                use: extractCSS.extract({
                    fallback: "style-loader",
                    use: [
                        { loader: 'css-loader', options: { importLoaders: 1,minimize:true } },
                    ]
                })
            },
            {
                test: /\.scss/,
                exclude: /^node_modules$/,
                use: extractSCSS.extract({
                    fallback: "style-loader",
                    use: [
                        { loader: 'css-loader', options: { importLoaders: 1,minimize:true } },
                        { loader: 'sass-loader'}
                    ]
                })
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env', 'react'],

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
        extractSCSS
    ]
}

