const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: ['./src/js/index.js'],
    output: {
        path: path.resolve(__dirname,'dist'),
        filename: 'js/bundle.js'
    },

    //configur dev server
    devServer: {
        contentBase: './dist'
    },

    //plugin
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
        })
    ],

    //module 
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    }
}