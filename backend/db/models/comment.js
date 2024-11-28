
"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
      Comment.belongsTo(models.Post, {
        foreignKey: "postId",
        as: "Post",
      });

      Comment.belongsTo(models.User, {
        foreignKey: "userId",
        as: "User",
      });

    }
  }
  Comment.init(
    {
      postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        onDelete: "CASCADE"
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      comment: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Comment",
    }
  );
  return Comment;
};
