const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, args) => {
    return {
        output: {
            filename: `antd${args.mode === 'production' ? '.min' : ''}.js`,
            chunkFilename: '[name][chunkhash:8].bundle.js'
        },
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    exclude: /(node_modules)/,
                    use: 'babel-loader'
                },
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
                {
                    test: /\.css$/i,
                    use: ['style-loader', 'css-loader'],
                },
                {
                    test: /\.less$/i,
                    use: [
                        'style-loader',
                        'css-loader',
                        {
                            loader: 'less-loader',
                            options: {
                                lessOptions: {
                                    javascriptEnabled: true
                                }
                            }
                        }
                    ],
                },
                {
                    test: /\.svg$/,
                    issuer: /\.[jt]sx?$/,
                    use: ['@svgr/webpack'],
                },
                {
                    test: /\.(png|jpg|gif)$/,
                    type: 'asset/inline',
                },
            ]
        },
        target: ['web', 'es5'],
        devtool: 'inline-source-map',
        devServer: {
            compress: true,
            open: true,
            port: 8081,
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
        },
        externals: {
        },
        // 插件
        plugins: [
            args.mode !== 'production'
                ? new HtmlWebpackPlugin({
                    template: 'public/index.html',
                    scriptLoading: 'blocking'
                })
                : null,
            args.mode === 'production'
                ? new BundleAnalyzerPlugin({
                    analyzerMode: 'static',
                    openAnalyzer: false
                })
                : null,
        ].filter(Boolean)
    }
}