module.exports = {
  staticFileGlobs: [
    'build/static/css/**.css',
    'build/static/js/**.js',
    'build/static/media/**',
    'build/index.html'
  ],
  swFilePath: './build/service-worker.js',
  templateFilePath: './service-worker.tmpl',
  stripPrefix: 'build/',
  handleFetch: true,
  runtimeCaching: [{
    urlPattern: /this\\.is\\.a\\.regex/,
    handler: 'cacheFirst'
  }]
}