const config = {};

config.project = {
  name: "ml-search-app"
};

config.path = "/PATH/TO/ml-search-app/server/"; // include trailing "/"

config.auth = {
  user: 'USERNAME',
  pass: 'PASSWORD',
  sendImmediately: false
};

config.host = "localhost";

config.databases = {
  content: {
    name: config.project.name + "-content"
  },
  modules: {
    name: config.project.name + "-modules"
  },
};

config.rest = {
  "rest-api": {
    name: config.project.name + "-rest",
    database: config.databases.content.name,
    "modules-database": config.databases.modules.name,
    port: 8077,
    "error-format": "json"
  }
};

config.entityType = "person";

config.entityLabel = "Person";

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = config;
}
