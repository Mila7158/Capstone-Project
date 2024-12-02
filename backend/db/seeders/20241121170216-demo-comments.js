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
          postId: 6,
          userId: 2,
          comment: "Couldn’t agree more! The cheer squad brings so much spirit and energy, and they deserve all the recognition. They get everyone hyped and keep the momentum going, even during the most tense moments of the game. It wouldn’t be the same without their chants and routines. Incredible job!",
        },
        {
          postId: 6,
          userId: 5,
          comment: "Our cheerleaders really make game day special. They’re out there giving it their all, rain or shine, and they do an amazing job of keeping the crowd engaged and the players motivated. Big props to them for all the hard work, creativity, and dedication they bring every single game day.",
        },
        {
          postId: 5,
          userId: 1,
          comment: "I remember that win like it was yesterday! The final whistle, the celebration—it was all so surreal. Those memories are what keep us believing in this team. We overcame so much that year, and it was all worth it in the end. Let’s bring that spirit into this season and make new memories!",
        },
        {
          postId: 5,
          userId: 3,
          comment: "That championship was legendary. The journey, the challenges, and the ultimate victory were incredible moments for us as fans. Watching the replays still gives me goosebumps. Let’s take that same energy and cheer our team on to another amazing season. We can do it again!",
        },
        {
          postId: 4,
          userId: 2,
          comment: "Yes! We need everyone to show up and get loud for this championship game. The team feeds off our energy, and we have a chance to make a real impact. Let’s make it a sea of team colors and cheer them to victory. It’s time to show our players we’re behind them, 100%!",
        },
        {
          postId: 4,
          userId: 6,
          comment: "Absolutely agree! Our team needs every bit of support to feel our presence. Let’s make sure we bring the noise, wear our jerseys, and give them the biggest home advantage possible. It’s moments like these where we, as fans, can make all the difference for the players out there.",
        },
        {
          postId: 3,
          userId: 1,
          comment: "Totally agree—the tailgate was unforgettable! From the delicious BBQ to the fun lawn games, it was the perfect way to kick off game day. The energy before the big match was amazing, and it really showed the sense of community we have as fans. We need to do it all over again!",
        },
        {
          postId: 3,
          userId: 2,
          comment: "Absolutely! The tailgate parties are always a highlight for me too. The atmosphere, the music, and everyone just having a great time makes me proud to be part of this community. The food was top-notch, and I loved seeing all the decorated vehicles and jerseys. Can’t wait for the next one!",
        },
        {
          postId: 2,
          userId: 1,
          comment: "Great picks! Alex Johnson has been phenomenal with his goal-scoring, and Taylor Smith's assists have been nothing short of brilliant. Jordan Carter's defense was rock-solid. My picks are similar, but I'd add Chris Miller for his incredible saves this season. It's been great watching them all!",
        },
        {
          postId: 2,
          userId: 6,
          comment: "I love your top three! Alex, Taylor, and Jordan have given us so many memorable moments. Personally, I would add Jamie Green to the list for their outstanding plays under pressure. It’s always tough to choose with so much talent, but discussions like these are what make it fun!",
        },
        {
          postId: 1,
          userId: 4,
          comment: "What a game indeed! I couldn't agree more about the excitement of that final goal. The energy in the stadium was unreal, and moments like this remind us why we love the sport so much. The entire team played with heart, and the crowd's enthusiasm made it even more special!",
        },
        {
          postId: 1,
          userId: 3,
          comment: "Absolutely! That goal was one of the best moments of the season. You could feel the tension, and then the explosion of cheers when it went in. The players were incredible, and I could feel the pride in every fan there. Nights like this are why we support this team through everything.",
        },
      ],
      options
    );
  },


  async down(queryInterface, Sequelize) {
    options.tableName = "Comments";
    return queryInterface.bulkDelete(options, null, {});
  },
};
