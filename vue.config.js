module.exports = {
  // Use "npm run backend" and "npm run serve" in two terminal windows,
  // and uncomment this section to be able to use a mock-backend for testing
  // devServer: {
  //   proxy: {
  //     '^/api': {
  //       target: 'http://localhost:5000',
  //       changeOrigin: true,
  //       logLevel: 'debug',
  //       pathRewrite: { '^/api': '/' },
  //     },
  //   },
  // },
  chainWebpack: (config) => {
    config.plugin('html').tap((args) => {
      args[0].title = 'Task Tracker - Vue.js App';
      return args;
    });
  },
};
