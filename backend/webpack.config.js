import path from 'path';

module.exports = {
    entry: './src/index.ts',
    target: 'node',
    output: {
        filename: 'backend.js',
        path: path.resolve(__dirname, 'dist')
    },
    //loader for typescript
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
}