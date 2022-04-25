/// <reference types="cypress" />

import "dotenv/config";

/**
 * @type {Cypress.PluginConfig}
 */

module.exports = (on, config) => {
  // copy any needed variables from process.env to config.env
  config.env.username = process.env.CYPRESS_USERNAME;
  config.env.password = process.env.CYPRESS_PASSWORD;
  return config;
};
