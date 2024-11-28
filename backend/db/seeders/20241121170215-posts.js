'use strict';

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = "Posts";
    await queryInterface.bulkInsert(options, [
      {
        authorId: 1,        
        title: "Incredible Game Last Night!",
        fan_post: "What an amazing game by our college team! That last-minute goal was unforgettable!",
        // createdAt: new Date(),
        // updatedAt: new Date(),
      },
      {
        authorId: 2,        
        title: "Top Players of the Season",
        fan_post: "Here are my top picks for this season: 1) Alex Johnson, 2) Taylor Smith, 3) Jordan Carter. Who are yours?",
        // createdAt: new Date(),
        // updatedAt: new Date(),
      },
      {
        authorId: 3,        
        title: "Tailgate Party Memories",
        fan_post: "The tailgate party before the big game was the best! Great food, awesome fans, and incredible energy!",
        // createdAt: new Date(),
        // updatedAt: new Date(),
      },
      {
        authorId: 4,        
        title: "Support for Our Team",
        fan_post: "Let’s all show up and support our team in the upcoming championship game! Wear your jerseys and bring the spirit!",
        // createdAt: new Date(),
        // updatedAt: new Date(),
      },
      {
        authorId: 5,        
        title: "Throwback to Last Year’s Win",
        fan_post: "Can’t believe it’s been a year since we won the championship! Reliving those highlights gives me chills!",
        // createdAt: new Date(),
        // updatedAt: new Date(),
      },
      {
        authorId: 1,        
        title: "Best Cheer Squad Ever",
        fan_post: "Shoutout to our cheerleaders for hyping up the crowd every single game! You all are awesome!",
        // createdAt: new Date(),
        // updatedAt: new Date(),
      },

    ], options);
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Posts';
    return queryInterface.bulkDelete(options, null, {}); 
  },
};
