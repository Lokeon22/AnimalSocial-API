const config = require("../../../knexfile.ts");
const knex = require("knex");

const connection = knex(config.development);

module.exports = connection;
