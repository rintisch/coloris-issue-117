const path = require('path');

module.exports = {
    entry: './assets/app',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [],
    module: {
        rules: [
            {
                test: /\.(s?css)$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
        ],
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        compress: false,
        hot: true,
    },
    mode: 'development',
};