module.exports = {
  devServer: {
    proxy: {
      '/api' : {
        target: 'http://192.168.2.73',
        changeOrigin: true,
        ws: true,
      }
    }
  }
}