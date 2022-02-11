
module.exports = {
  devServer: {
    // Usando porta 3000 pra não conflitar com a porta padrão do backend
    port: 3000,
    proxy: {
      '^/api': {
        target: 'http://localhost:8080',
        ws: true,
        changeOrigin: true
      }
    }
  }
};
