import webpack from 'webpack'
import path from 'path'
import CompressionPlugin from 'compression-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'

const NODE_ENV: string = process.env.NODE_ENV

const config: webpack.Configuration = {
  output: {
    filename: '[name].min.js',
    path: path.join(__dirname, 'dist'),
    library: 'workerman',
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        isStaging: NODE_ENV === 'development',
        NODE_ENV: `"${NODE_ENV}"`,
      },
    }),
    new CompressionPlugin({
      algorithm: 'brotliCompress',
    }) as any,
    NODE_ENV === 'development' &&
      new HtmlWebpackPlugin({
        title: 'workerman',
        filename: 'index.html',
      }),
  ].filter(Boolean),
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        use: ['babel-loader', 'ts-loader'],
        exclude: /node_modules/,
      },
    ],
  },
}

export default config
