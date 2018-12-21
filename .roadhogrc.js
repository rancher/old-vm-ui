const endpoint = process.env.LONGHORN_MANAGER_IP || 'http://192.168.100.132:30114/';
export default {
  "entry": "src/index.js",
  "disableCSSModules": false,
  "multipage": false,
  "autoprefixer": null,
  "extraBabelPlugins": [
    "transform-runtime",
    [
      "import",
      {
        "libraryName": "antd",
        "style": true
      }
    ]
  ],
  "env": {
    "development": {
      "extraBabelPlugins": [
        "dva-hmr"
      ]
    }
  },
  "proxy": {
    "/v1/ws/**": {
      "target": endpoint,
      "changeOrigin": false,
      "ws": true,
      "secure": false
    },
    "/v1/": {
      "target": endpoint,
      "changeOrigin": false
    },
  },
  "theme": "./src/theme.js"
}
