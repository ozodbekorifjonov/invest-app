const { createProxyMiddleware } = require("http-proxy-middleware");

const { REACT_APP_API_URL = "http://127.0.0.1:8000/" } = process.env;

console.log("REACT_APP_API_URL", REACT_APP_API_URL);

module.exports = function setupProxy(app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: `${REACT_APP_API_URL}`,
      changeOrigin: true,
    })
  );
};
