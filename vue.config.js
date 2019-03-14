module.exports = {
  devServer: {
    proxy: {
      '/api' : {
        target: 'http://192.168.2.73:3000',
        changeOrigin: true,
        ws: true,
      },
      '/admin' : {
        target: 'http://192.168.2.73:3000/admin',
        changeOrigin: true,
        ws: true,
      }
    }
  }
}