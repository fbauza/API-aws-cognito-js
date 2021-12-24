let environment = require("./environment").environment;

let serverURLs = {
  dev: {
    NODE_SERVER: "http://localhost",
    NODE_SERVER_PORT: "3000",
    EMAIL_USER: "******************************@gmail.com",
    EMAIL_PASS: "***************",
    EMAIL_HOST: "smtp.gmail.com",
    EMAIL_PORT: 465,
    EMAIL_SECURE: true,
    JWT_SECRET: "lifeofdevelopersatworld",
  },
};

let config = {
  NODE_SERVER_PORT: {
    port: `${serverURLs[environment].NODE_SERVER_PORT}`,
  },
  NODE_SERVER_URL: {
    url: `${serverURLs[environment].NODE_SERVER}`,
  },
  OTP_EMAIL_CONFIG: {
    host: `${serverURLs[environment].EMAIL_HOST}`,
    port: `${serverURLs[environment].EMAIL_PORT}`,
    secure: `${serverURLs[environment].EMAIL_SECURE}`,
    auth: {
      user: `${serverURLs[environment].EMAIL_USER}`,
      pass: `${serverURLs[environment].EMAIL_PASS}`,
    },
  },
  JWT_SECRET: `${serverURLs[environment].JWT_SECRET}`,
};

module.exports = {
  config: config,
};
