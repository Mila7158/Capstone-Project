// backend/routes/api/comment.js
const express = require("express");
const {
  Comment,
  User,
  Post
} = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { requireAuth } = require("../../utils/auth");

const router = express.Router();

// Update a Comment by ID
router.put("/:commentId", requireAuth, async (req, res) => {
  try {
    const { comment, stars } = req.body;
    const commentId = req.params.commentId;
    const userId = req.user.id;

    // Validate input
    const errors = {};
    if (comment && (typeof comment !== "string" || comment.trim() === "")) {
      errors.comment = "Comment text is invalid";
    }
    if (stars !== undefined && (isNaN(stars) || stars < 1 || stars > 5)) {
      errors.stars = "Stars must be an integer from 1 to 5";
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        message: "Bad Request",
        errors,
      });
    }

    // Check if the comment exists
    const existingComment = await Comment.findByPk(commentId);
    if (!existingComment) {
      return res.status(404).json({
        message: "Comment couldn't be found",
      });
    }

    // Check if the user owns the comment
    if (existingComment.userId !== userId) {
      return res.status(403).json({
        message: "Forbidden: You are not authorized to edit this comment",
      });
    }

    // Update the comment fields
    if (comment) existingComment.comment = comment;
    if (stars !== undefined) existingComment.stars = stars;

    await existingComment.save();

    // Return the updated comment
    return res.status(200).json({
      id: existingComment.id,
      userId: existingComment.userId,
      postId: existingComment.postId,
      comment: existingComment.comment,
      stars: existingComment.stars,
      createdAt: existingComment.createdAt,
      updatedAt: existingComment.updatedAt,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
});

// Delete a Comment by ID
router.delete("/:commentId", requireAuth, async (req, res) => {
  try {
    const commentId = req.params.commentId;
    const userId = req.user.id;

    // Check if the comment exists
    const existingComment = await Comment.findByPk(commentId);
    if (!existingComment) {
      return res.status(404).json({
        message: "Comment couldn't be found",
      });
    }

    // Check if the user owns the comment
    if (existingComment.userId !== userId) {
      return res.status(403).json({
        message: "Forbidden: You are not authorized to delete this comment",
      });
    }

    // Delete the comment
    await existingComment.destroy();

    return res.status(200).json({
      message: "Successfully deleted comment",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
});


// Get all comments by the current user
router.get("/current", requireAuth, async (req, res) => {
  try {
      const userId = req.user.id; // Get the current user's ID

      // Fetch all comments by the current user
      const userComments = await Comment.findAll({
          where: { userId },
          include: [
              {
                  model: Post,
                  as: "Post", 
                  attributes: ["id", "title"],
              },
          ],
          order: [["createdAt", "DESC"]],
      });

      // If no comments, return an empty array with a 200 status
      if (!userComments || userComments.length === 0) {
          return res.status(200).json([]); // Return an empty array instead of a 404
      }

      // Respond with all comments
      return res.status(200).json(userComments);
  } catch (error) {
      console.error("Error fetching current user comments:", error);
      return res.status(500).json({
          message: "Server Error",
          error: error.message,
      });
  }
});


module.exports = router;
