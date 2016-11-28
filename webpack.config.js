var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        'app': './src/app.ts'
    },

    devtool: 'source-map',

    output: {
        path: 'build',
        filename: '[name].js',
        chunkFilename: '[id].chunk.js'
    },

    resolve: {
        extensions: ['', '.ts', '.js', '.css']
    },

    module: {
        preLoaders: [
            {
                test: /\.ts$/,
                loader: "tslint"
            }
        ],
        loaders: [
            {
                test: /\.ts$/,
                loaders: ['awesome-typescript-loader']
            },
            {
                test: /\.css$/,
                loader: 'style!raw'
            }
        ],
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        })
    ],

    devServer: {
        historyApiFallback: true,
        stats: 'minimal'
    },

    tslint: {
        emitErrors: false,
        failOnHint: false,
        formattersDirectory: "node_modules/tslint-loader/formatters/",
    }
}