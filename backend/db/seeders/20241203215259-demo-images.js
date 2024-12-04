'use strict';

const { Image } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Image.bulkCreate(
      [
        {
          postId: 1,
          url: '/images/posts/image8.jpg',          
        },
        {
          postId: 2,
          url: '/images/posts/image2.jpg',          
        },
        {
          postId: 3,
          url: '/images/posts/image3.jpg',          
        },
        {
          postId: 4,
          url: '/images/posts/image4.jpg',          
        },
        {
          postId: 5,
          url: '/images/posts/image5.jpg',          
        },
        {
          postId: 6,
          url: '/images/posts/image1.jpg',          
        },
      ],
      options
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Image";
    return queryInterface.bulkDelete(options, null, {});
  },
};
