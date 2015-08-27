import gulp from 'gulp';
import webpack from 'webpack'
import webpackConfig from './webpack.config'
import browserSync from 'browser-sync';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

gulp.task('watch', () => {
  const compiler = webpack(webpackConfig);

  browserSync({
    proxy: {
      target: "http://example.dev",
      middleware: [
        webpackDevMiddleware(compiler, {
          // IMPORTANT: dev middleware can't access config, so we should
          // provide publicPath by ourselves
          publicPath: "/",

          // pretty colored output
          stats: {colors: true}

          // for other settings see
          // http://webpack.github.io/docs/webpack-dev-middleware.html
        }),

        // bundler should be the same as above
        webpackHotMiddleware(compiler)
      ]
    }
  });
});
