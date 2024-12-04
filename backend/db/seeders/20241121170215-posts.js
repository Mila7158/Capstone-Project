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
        title: "Best Cheer Squad Ever",
        fan_post:
          "Shoutout to our cheerleaders for hyping up the crowd every single game! You all are awesome! The energy, dedication, and creativity you bring to each game are unmatched. The routines, the chants, and the enthusiasm are a big part of what makes game day so special. Let’s give them the recognition they deserve for making every moment unforgettable. The cheer squad truly elevates the spirit of the game. Amazing job, everyone!",
      },      
      {
        authorId: 3,
        title: "Tailgate Party Memories",
        fan_post:
          "The tailgate party before the big game was the best! Great food, awesome fans, and incredible energy! Everyone brought their A-game when it came to the snacks and decorations. The camaraderie and excitement before the game set the perfect tone for what was to come. These tailgate moments remind us why we love being part of this community. The food was fantastic, the games were fun, and the memories will last a lifetime!",
      },
      {
        authorId: 4,
        title: "Support for Our Team",
        fan_post:
          "Let’s all show up and support our team in the upcoming championship game! Wear your jerseys and bring the spirit! This is the time to show our players that we’ve got their backs. Let’s fill the stadium with our team colors and chants. The players need to see and feel our energy from the stands. Together, we can create an atmosphere that pushes them to victory. Don’t miss this opportunity to be part of something unforgettable!",
      },
      {
        authorId: 5,
        title: "Throwback to Last Year’s Win",
        fan_post:
          "Can’t believe it’s been a year since we won the championship! Reliving those highlights gives me chills! It was a season of determination, teamwork, and unforgettable moments. Watching the replays still brings so much pride and excitement. Let’s celebrate that amazing journey and use it as motivation for this season. The memories of that victory will always remind us of what this team is capable of. Here’s to another incredible year ahead!",
      },
      {
        authorId: 2,
        title: "Top Players of the Season",
        fan_post:
          "Here are my top picks for this season: 1) Alex Johnson, 2) Taylor Smith, 3) Jordan Carter. Who are yours? It’s been an amazing season watching these players shine on the field. Their hard work, skills, and dedication have truly stood out. Let’s discuss who you think deserves the spotlight this season. Every game was a showcase of talent, and it’s hard to pick just three, but these players have been incredible!",
      },
      {
        authorId: 1,
        title: "Incredible Game Last Night!",
        fan_post:
          "What an amazing game by our college team! That last-minute goal was unforgettable! It had everyone on the edge of their seats, and the stadium erupted in cheers. This is the kind of moment that makes sports so special. The players gave it their all, and the fans were right there with them, cheering every step of the way. What a night to remember!",
      },

    ], options);
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Posts';
    return queryInterface.bulkDelete(options, null, {}); 
  },
};
