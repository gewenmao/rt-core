function r(x) {
  return typeof x.map === 'function' ? x.map(f => require.resolve(f)) : require.resolve(x);
}

export default function getWebpackConfig(opts = {}) {
  const babelQuery = opts.babelQuery || {};
  const webpackConfig = {
    entry: {},
    module: {
      unknownContextRegExp: {},
      unknownContextCritical: false,
      exprContextRegExp: {},
      exprContextCritical: false,
      wrappedContextCritical: true,
      loaders: [
        {
          exclude: /node_modules/,
          loader: require.resolve('babel-loader'),
          query: babelQuery,
          test: /\.(es6|js|jsx)$/,
        },
        {
          loaders: r([
            'json-loader',
          ]),
          test: /\.(json)$/,
        },
        {
          loaders: r([
            'style-loader',
            'css-loader',
          ]),
          test: /\.(css)$/,
        },
        {
          test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
          loaders: r(['url-loader']),
        },
        {
          loaders: r(['empty-loader']),
          test: /\.(less|scss|md)$/,
        },
      ],
    },
    externals: [
      {
        config: 'var {} ',
      },
    ],
    output: {
      path: 'static',
      filename: '[name].js',
    },
    resolve: {
      extensions: [
        '',
        '.js',
        '.jsx',
      ],
    },
  };
  return webpackConfig;
}
