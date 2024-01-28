const PROXY_CONFIG = [
  {
    context: [
      "/",
    ],
    target: "https://localhost:7065",
    secure: false
  }
]

module.exports = PROXY_CONFIG;
