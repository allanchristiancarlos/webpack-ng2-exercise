const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ENV = process.env.NODE_ENV = process.env.ENV = 'production';

module.exports = {
    entry: {
        app: './src/main',
        vendor: './src/vendor',
        polyfills: './src/polyfills'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        chunkFilename: '[id].js'
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                loaders: [
                    {
                        loader: 'awesome-typescript-loader',
                        options: { configFileName: path.resolve(__dirname, 'src', 'tsconfig.json') }
                    }, 
                    // 'angular2-template-loader'
                ]
            },
            {
                test: /\.html$/,
                loader: 'html-loader',
                exclude: /node_modules/
            },
            {
                test: /\.svg$/,
                exclude: /node_modules/,
                loader: 'file-loader'
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader!sass-loader' })
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' })
            },
            {
                test    : /\.(png|jpg|svg)$/,
                include : path.join(__dirname, 'img'),
                loader  : 'url-loader?limit=30000&name=images/[name].[ext]'
            }, // inline base64 URLs for <=30k images, direct URLs for the rest
        ]
    },
    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.optimize.UglifyJsPlugin({ // https://github.com/angular/angular/issues/10618
            mangle: {
                keep_fnames: true
            }
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'ENV': JSON.stringify(process.env.NODE_ENV)
            }
        }),
        new webpack.ContextReplacementPlugin(
            new RegExp("angular(\|/)core(\|/)@angular"),
            path.resolve(__dirname, '../src')
        ),
        new webpack.LoaderOptionsPlugin({
            htmlLoader: {
                minimize: false // workaround for ng2
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'vendor', 'polyfills']
        }),
        new ExtractTextPlugin("[name].css"),
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, 'node_modules/material-design-lite/dist/images'),
                to: path.resolve(__dirname, 'dist/images')
            },
            {
                from: path.resolve(__dirname, 'src/**/*.html'),
                context: 'src',
                to: path.resolve(__dirname, 'dist')
            }
        ])
    ],
    resolve: {
        extensions: ['.ts', '.js']
    }
}