module.exports = {
  publicPath: '/vcw/',
  transpileDependencies: [
    'vuetify',
  ],
  css: {
    extract: false,
  },
  productionSourceMap: false,
  configureWebpack: {
    optimization: {
      splitChunks: false,
    },
  },
};
