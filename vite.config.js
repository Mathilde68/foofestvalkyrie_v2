// vite.config.js
const { resolve } = require('path')
const { defineConfig } = require('vite')

module.exports = defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        nested: resolve(__dirname, 'nested/checkout.html'),
        nested: resolve(__dirname, 'nested/line_up.html'),
        nested: resolve(__dirname, 'nested/schedule.html'),
        nested: resolve(__dirname, 'nested/single.html'),
        nested: resolve(__dirname, 'nested/tickets.html')
      }
    }
  }
})
