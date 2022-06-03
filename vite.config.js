// vite.config.js
const { resolve } = require('path')
const { defineConfig } = require('vite')

module.exports = defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        nested1: resolve(__dirname, 'tickets.html'),
        nested2: resolve(__dirname, 'checkout.html'),
        nested3: resolve(__dirname, 'line_up.html'),
        nested4: resolve(__dirname, 'schedule.html'),
        nested5: resolve(__dirname, 'single.html')
      }
    }
  }
})
