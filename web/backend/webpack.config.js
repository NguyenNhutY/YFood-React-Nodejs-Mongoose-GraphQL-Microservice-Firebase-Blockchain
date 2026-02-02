import webpack from 'webpack';
import path from 'path';

export default{
  entry: './src/index.js',
  output: {
    path: path.resolve('dist'),
    filename: 'bundle.js',
  },
    module: {
      rules: [
        {
          test: /\.graphql$/,
          use: 'graphql-tag/loader',
        },
      ],
    },
  };
  