'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      Post.belongsTo(models.User, {
        foreignKey: "authorId",
        as: "Author",
      });
      Post.hasMany(models.Comment, {
        foreignKey: 'postId',
        as: 'Comments', 
      });
      Post.hasMany(models.Image, {
        foreignKey: 'postId',
        as: 'Images', 
      });
    }
  }
  Post.init({
    authorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fan_post: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};