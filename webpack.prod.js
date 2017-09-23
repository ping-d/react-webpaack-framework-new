const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const common = require('./webpack.common.js');

    module.exports = merge(common, {

        output:{
            filename:"[id].[chunkhash].js",
            path:path.resolve(__dirname,'built'),
            chunkFilename: "[id][chunkhash].js",
            publicPath: "/"

        },
       plugins: [
           new webpack.optimize.UglifyJsPlugin(
               {
                   output: {
                       comments: false,
                   },
                   compress: {
                       warnings: false
                   }
               }
           ),

           new webpack.DefinePlugin({
               'process.env': {
                   'NODE_ENV': JSON.stringify('production')
                }
           }),
           new HtmlWebpackPlugin({
               template: "./src/app/index.html",
               filename:"index.html",
               inject:true,
               minify: { //压缩HTML文件
                   removeComments: true, //移除HTML中的注释
                   collapseWhitespace: true //删除空白符与换行符
               },
               favicon:"./asset/imgs/favicon.png",
               hash:true,
               chunks:['vendor','app'],
           })

       ]
 });
