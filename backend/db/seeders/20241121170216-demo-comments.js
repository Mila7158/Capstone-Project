// backend/db/seeders/20240925011629-demo-reviews
"use strict";

const { Comment } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Comment.bulkCreate(
      [
        {
          postId: 1,
          userId: 1,
          comment: "Great place to stay!",
        },
        {
          postId: 1,
          userId: 2,
          comment: "Had a decent experience.",
        },
        {
          postId: 2,
          userId: 3,
          comment: "Absolutely loved it!",
        },
        {
          postId: 2,
          userId: 1,
          comment: "Not worth the price.",
        },
        {
          postId: 3,
          userId: 2,
          comment: "Best stay ever! Highly recommend.",
        },
      ],
      options
    );
  },

  // async down(queryInterface, Sequelize) {
  //   options.tableName = "Reviews";
  //   // await queryInterface.dropTable(options);
  //   return queryInterface.bulkDelete(options, null, {});
  // },

  async down(queryInterface, Sequelize) {
    options.tableName = "Comments";
    return queryInterface.bulkDelete(options, null, {});
  },
};
