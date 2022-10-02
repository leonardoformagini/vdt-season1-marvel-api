const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    "baseUrl": "https://marvel-qa-cademy.herokuapp.com",
    "video": false, //desabilita a gravação de vídeos quando os testes rodam em backend
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});