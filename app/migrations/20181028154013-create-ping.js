'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
      alter type enum_whisper_msg_types add value 'ping';
      alter type enum_whisper_msg_types add value 'pong';

      create table "whisper_pings" (
        "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        "created" timestamp without time zone default now() not null,
        "updated" timestamp without time zone default now() not null,
        "responder" ethereum_address
      );
    `)
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
      drop table "whisper_pings" (
    `)
  },
}