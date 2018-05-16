const path = require('path');

module.exports = {
    entry: {
        SidraResearch: './SidraResearch/SidraResearch.element.ts'
    },
    output: {
        filename: '[name]/[name].js',
        path: path.resolve(__dirname)
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    }
};