// backend/routes/api/posts.js
const express = require("express");
const { Post, User, Comment, Image } = require("../../db/models");
// const { PostImage } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { requireAuth } = require("../../utils/auth");
const { fn, col } = require("sequelize");

const router = express.Router();

// router.get('/test', (req, res) => {
//   res.json({ message: 'Test route works' });
// });

//* Validation for creating and updating posts (CORRECTED)
const validatePost = [

  check("title")
    .exists({ checkFalsy: true })
    .isLength({ max: 50 })
    .withMessage("Title must be less than 50 characters"),
  check("fan_post")
    .exists({ checkFalsy: true })
    .withMessage("Post is required"),

  handleValidationErrors,
];

//* GET all Posts created by the Current User 

router.get("/current", async (req, res) => {
  try {
    // Get the current user's ID
    const userId = req.user.id;

    // Fetch posts owned by the current user
    const posts = await Post.findAll({
      where: { authorId: userId }, // Filter by the current user's ID
      include: [
        {
          model: User,
          as: "Author", // Ensure the alias matches your association
          attributes: ["id", "username"], // Include only necessary author fields
        },
        {
          model: Comment,
          as: "Comments",
          attributes: ["id", "comment", "createdAt"], // Include necessary comment attributes
          required: false,
          include: [
            {
              model: User,
              as: "User",
              attributes: ["id", "username"], // Include comment author's username
            },
          ],
        },
        {
          model: Image,
          as: "Images", // Ensure this alias matches your Post-Image association
          attributes: ["url"], // Include image URLs
        },
      ],
      order: [["createdAt", "DESC"]], // Sort posts by most recent
    });

    // Format the response
    const formattedPosts = posts.map((post) => ({
      id: post.id,
      title: post.title,
      fan_post: post.fan_post,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      author: {
        id: post.Author?.id,
        username: post.Author?.username,
      },
      comments: post.Comments.map((comment) => ({
        id: comment.id,
        comment: comment.comment,
        user: comment.User ? { id: comment.User.id, username: comment.User.username } : null,
      })),
      images: post.Images.map((image) => image.url), // Include all associated images
    }));

    return res.json({ Posts: formattedPosts });
  } catch (err) {
    console.error("Error fetching posts for current user:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});  

//-------------------------------------------
// router.get("/current", async (req, res) => {
//   try {
//     // Get the current user's ID
//     const userId = req.user.id;

//     // Fetch posts owned by the current user
//     const posts = await Post.findAll({
//       where: { authorId: userId }, // Filter by the current user's ID
//       include: [
//         {
//           model: User,
//           as: "Author",
//           attributes: ["id", "username"], // Include author's username
//         },
//         {
//           model: Comment,
//           as: "Comments",
//           attributes: ["id", "comment", "createdAt"], // Include necessary comment attributes
//           required: false,
//           include: [
//             {
//               model: User,
//               as: "User",
//               attributes: ["id", "username"], // Include comment author's username
//             },
//           ],
//         },
//         {
//           model: Image,
//           as: "Images", // Ensure this alias matches your Post-Image association
//           attributes: ["url"], // Include image URLs
//         },
//       ],
//       order: [["createdAt", "DESC"]], // Sort posts by most recent
//     });

//     // Format the response
//     const formattedPosts = posts.map((post) => ({
//       id: post.id,
//       title: post.title,
//       fan_post: post.fan_post,
//       createdAt: post.createdAt,
//       updatedAt: post.updatedAt,
//       author: {
//         id: post.Author?.id,
//         username: post.Author?.username,
//       },
//       comments: post.Comments.map((comment) => ({
//         id: comment.id,
//         comment: comment.comment,
//         user: comment.User ? { id: comment.User.id, username: comment.User.username } : null,
//         createdAt: comment.createdAt,
//       })),
//       images: post.Images.map((image) => image.url), // Include all associated images
//     }));

//     return res.json({ Posts: formattedPosts });
//   } catch (err) {
//     console.error("Error fetching posts for current user:", err);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// });

//-----------------------------------------------------------
// router.get("/current", async (req, res) => {
//   try {
//     // Get the current user's ID
//     const userId = req.user.id;

//     // Fetch posts owned by the current user
//     const posts = await Post.findAll({
//       where: { authorId: userId }, // Filter by the current user's ID
//       include: [
//         {
//           model: Comment,
//           as: "Comments",
//           attributes: ["id", "comment"], // Only need the stars for aggregation
//           required: false,
//           include: [
//             {
//               model: User,
//               as: 'User',
//               attributes: ['id', 'username'],
//             }
//           ],
//           order: [["createdAt", "DESC"]],
//           required: false, // Allow posts without comments
//         },
//         // {
//         //   model: PostImage,
//         //   where: { preview: true }, // Only fetch preview images
//         //   attributes: ["url"], // Only get the URL of the image
//         //   required: false, // Include Posts without preview images
//         // },
//       ],
//           order: [["createdAt", "DESC"]],
//           // group: ["Post.id", "PostImages.id"], // Group by Post and PostImage
//       // attributes: {
//       //   include: [[fn("AVG", col("Reviews.stars")), "avgStarRating"]], // Calculate avgRating
//       // },
//     });

//     // Format the response
//     const formattedPosts = posts.map((post) => {
//       return {
//         id: post.id,
//         authorId: post.authorId,
//         title: post.title,
//         fan_post: post.fan_post,
//         createdAt: post.createdAt,
//         updatedAt: post.updatedAt,
//         comments: post.Comments.map((comment) => ({
//           id: comment.id,
//           comment: comment.comment,
//           user: comment.User ? comment.User.username : null,
//         })),
//         // previewImage: post.PostImages.length ? post.PostImages[0].url : null, // Get preview image URL
//       };
//     });

//     return res.json({ Posts: formattedPosts });
//   } catch (err) {
//     console.error("Error fetching posts for current user:", err);
//     return res.status(401).json({ message: "Unauthorized" });
//   }
// });


// //* GET details of a Post by ID 

router.get("/:postId", async (req, res) => {
  const { postId } = req.params; // Extract postId from URL

  try {
    const post = await Post.findByPk(postId, {
      include: [
        {
          model: User,
          as: "Author",
          attributes: ["id", "username"],
        },
        {
          model: Comment,
          as: "Comments",
          attributes: ["id", "comment", "createdAt"],
          required: false,
          include: [
            {
              model: User,
              as: "User",
              attributes: ["id", "username"],
            },
          ],
        },
        {
          model: Image,
          as: "Images", // Ensure this alias matches your Post-Image association
          attributes: ["url"],
        },
      ],
    });

    // Check if the post exists
    if (!post) {
      return res.status(404).json({
        message: "Post couldn't be found",
      });
    }

    // Count the number of comments for the post
    // const commentsCount = await Comment.count({
    //   where: { postId },
    // });

    // Format the response
    const response = {
      id: post.id,
      authorId: post.Author.id,
      title: post.title,
      fan_post: post.fan_post,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
     
      comments: post.Comments.map((comment) => ({
        id: comment.id,
        comment: comment.comment,
        user: comment.User ? { id: comment.User.id, username: comment.User.username } : null,
        createdAt: comment.createdAt,
      })),
      images: post.Images.map((image) => image.url), // Include images in response
      author: {
        id: post.Author.id,
        username: post.Author.username,
      },
    };

    // Send the formatted response
    return res.status(200).json(response);
  } catch (err) {
    console.error("Error fetching post details:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

//-----------------------------------------------------
// router.get("/:postId", async (req, res) => {
//   const { postId } = req.params; // GET from URL

//   const post = await Post.findByPk(postId, {
//     include: [
//       {
//         model: User,
//         as: "Author",
//         attributes: ["id", "username"],
//       },
//       {
//         model: Comment,
//         as: "Comments",
//         attributes: ["id", "comment", "createdAt"],
//         required: false,
//         include: [
//           {
//             model: User,
//             as: 'User',
//             attributes: ['id', 'username'],
//           }
//         ],
//         required: false, // Allow posts without comments
//       },
//     ],
    
//   });
//   // Check if the post exists
//   if (!post) {
//     return res.status(404).json({
//       message: "Post couldn't be found",
//     });
//   }

//   const commentsCount = await Comment.count({
//     where: { postId },
// });

//   // Prepare response object
//   const response = {
//     id: post.id,
//     authorId: post.Author.id,
//     title: post.title,
//     fan_post: post.fan_post,
//     createdAt: post.createdAt,
//     updatedAt: post.updatedAt,
//     comments: post.Comments.map((comment) => ({
//       id: comment.id,
//       comment: comment.comment,
//       user: comment.User ? comment.User : null,
//       createdAt: comment.createdAt
//     })),
//     commentsCount, 

//     // PostImages: post.PostImages, // Directly include the PostImages
//     User: {
//       id: post.Author.id,
//       username: post.Author.username      
//     },
//   };

//   return res.status(200).json(response);
// });

//* Edit a Post

router.put("/:postId", requireAuth, validatePost, async (req, res) => {
  const userId = req.user.id; // Get authenticated user ID
  const { postId } = req.params; // Get post ID from URL
  const { title, fan_post, images } = req.body; // Get updated data from request body

  console.log("@@@@@@\nPOST  ID:\n", postId);

  // Validate postId
  if (!postId || isNaN(postId)) {
    return res.status(400).json({
      message: "Invalid post ID",
    });
  }

  try {
    // Find the post by its ID
    const post = await Post.findByPk(postId);

    // Check if the post exists
    if (!post) {
      return res.status(404).json({
        message: "Post couldn't be found",
      });
    }

    // Check if the authenticated user is the author of the post
    if (post.authorId !== userId) {
      return res.status(403).json({
        message: "Forbidden",
        errors: {
          authorization: "Only the author can edit this post",
        },
      });
    }

    // Update the post with new values
    post.title = title;
    post.fan_post = fan_post;
    await post.save(); // Save changes to the database
    console.log("Post updated successfully.");

    // Handle image updates
    if (images && Array.isArray(images)) {
      // Delete existing images for this post
      await Image.destroy({
        where: {
          postId: postId,
        },
      });

      // Create new images from the provided array
      const imagePromises = images.map((url) => {
        return Image.create({
          postId: postId,
          url: url,
        });
      });

      await Promise.all(imagePromises);
      console.log("Images updated successfully.");
    }

    // Fetch the updated post with associations
    const updatedPost = await Post.findByPk(postId, {
      include: [
        {
          model: User,
          as: "Author",
          attributes: ["id", "username"],
        },
        {
          model: Comment,
          as: "Comments",
          attributes: ["id", "comment", "createdAt"],
          required: false,
          include: [
            {
              model: User,
              as: "User",
              attributes: ["id", "username"],
            },
          ],
        },
        {
          model: Image,
          as: "Images",
          attributes: ["url"],
        },
      ],
    });

    if (!updatedPost) {
      throw new Error("Failed to fetch updated post.");
    }

    console.log("Updated Post Object:", updatedPost);

    // Respond with the updated post data
    const response = {
      id: updatedPost.id,
      authorId: updatedPost.Author.id,
      title: updatedPost.title,
      fan_post: updatedPost.fan_post,
      createdAt: updatedPost.createdAt,
      updatedAt: updatedPost.updatedAt,
      comments: updatedPost.Comments.map((comment) => ({
        id: comment.id,
        comment: comment.comment,
        user: comment.User ? { id: comment.User.id, username: comment.User.username } : null,
        createdAt: comment.createdAt,
      })),
      images: updatedPost.Images.map((image) => image.url), // Include images in response
      author: {
        id: updatedPost.Author.id,
        username: updatedPost.Author.username,
      },
    };
    return res.status(200).json(response);
    
  } catch (err) {
    console.error("Error updating post:", err.stack);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

//----------------------------------------2
// router.put("/:postId", requireAuth, validatePost, async (req, res) => {
//   const userId = req.user.id; // Get authenticated user ID
//   const { postId } = req.params; // Get post ID from URL
//   const { title, fan_post, images } = req.body; // Get updated data from request body

//   console.log("@@@@@@\nREQ.BODY\n", req.body);

//   try {
//     // Find the post by its ID
//     const post = await Post.findByPk(postId);

//     // Check if the post exists
//     if (!post) {
//       return res.status(404).json({
//         message: "Post couldn't be found",
//       });
//     }

//     // Check if the authenticated user is the author of the post
//     if (post.authorId !== userId) {
//       return res.status(403).json({
//         message: "Forbidden",
//         errors: {
//           authorization: "Only the author can edit this post",
//         },
//       });
//     }

//     // Update the post with new values
//     post.title = title;
//     post.fan_post = fan_post;
//     await post.save(); // Save changes to the database

//     // Fetch the updated post with associations
//     const updatedPost = await Post.findByPk(postId, {
//       include: [
//         {
//           model: User,
//           as: "Author",
//           attributes: ["id", "username"],
//         },
//         {
//           model: Comment,
//           as: "Comments",
//           attributes: ["id", "comment", "createdAt"],
//           required: false,
//           include: [
//             {
//               model: User,
//               as: "User",
//               attributes: ["id", "username"],
//             },
//           ],
//         },
//         {
//           model: Image,
//           as: "Images", // Ensure this alias matches your Post-Image association
//           attributes: ["url"],
//         },
//       ],
//     });

//     // Respond with the updated post data, formatted like the GET /:postId endpoint
//     return res.status(200).json({
//       id: updatedPost.id,
//       authorId: updatedPost.Author.id,
//       title: updatedPost.title,
//       fan_post: updatedPost.fan_post,
//       createdAt: updatedPost.createdAt,
//       updatedAt: updatedPost.updatedAt,
//       comments: updatedPost.Comments.map((comment) => ({
//         id: comment.id,
//         comment: comment.comment,
//         user: comment.User ? { id: comment.User.id, username: comment.User.username } : null,
//         createdAt: comment.createdAt,
//       })),
//       images: updatedPost.Images.map((image) => image.url), // Include images in response
//       author: {
//         id: updatedPost.Author.id,
//         username: updatedPost.Author.username,
//       },
//     });
//   } catch (err) {
//     console.error("Error updating post:", err);
//     return res.status(500).json({
//       message: "Internal Server Error",
//     });
//   }
// });

//----------------------------------------
// router.put("/:postId", requireAuth, validatePost, async (req, res) => {
//   const userId = req.user.id; // Get authenticated user ID
//   const { postId } = req.params; // Get post ID from URL
//   const { title, fan_post } = req.body; // Get updated data from request body

//   try {
//     // Find the post by its ID
//     const post = await Post.findByPk(postId);

//     // Check if the post exists
//     if (!post) {
//       return res.status(404).json({
//         message: "Post couldn't be found",
//       });
//     }

//     // Check if the authenticated user is the author of the post
//     if (post.authorId !== userId) {
//       return res.status(403).json({
//         message: "Forbidden",
//         errors: {
//           authorization: "Only the author can edit this post",
//         },
//       });
//     }

//     // Update the post with new values
//     post.title = title;
//     post.fan_post = fan_post;
//     await post.save(); // Save changes to the database

//     // Fetch the updated post with associations
//     const updatedPost = await Post.findByPk(postId, {
//       include: [
//         {
//           model: User,
//           as: "Author",
//           attributes: ["id", "username"],
//         },
//         {
//           model: Comment,
//           as: "Comments",
//           attributes: ["id", "comment", "createdAt"],
//           required: false,
//           include: [
//             {
//               model: User,
//               as: "User",
//               attributes: ["id", "username"],
//             },
//           ],
//         },
//       ],
//     });

//     // Respond with the updated post data, formatted like the GET /:postId endpoint
//     return res.status(200).json({
//       id: updatedPost.id,
//       authorId: updatedPost.Author.id,
//       title: updatedPost.title,
//       fan_post: updatedPost.fan_post,
//       createdAt: updatedPost.createdAt,
//       updatedAt: updatedPost.updatedAt,
//       comments: updatedPost.Comments.map((comment) => ({
//         id: comment.id,
//         comment: comment.comment,
//         user: comment.User ? comment.User : null,
//         createdAt: comment.createdAt,
//       })),
//       User: {
//         id: updatedPost.Author.id,
//         username: updatedPost.Author.username,
//       },
//     });
//   } catch (err) {
//     console.error("Error updating post:", err);
//     return res.status(500).json({
//       message: "Internal Server Error",
//     });
//   }
// });

//* Create a Post 
router.post(
  "/",
  validatePost, // Use validatePost middleware to handle validation
  async (req, res) => {
    try {
      // Get the current user's ID (Assuming authentication middleware sets req.user)
      const userId = req.user.id;

      // Destructure the post data from the request body
      const {
        title,
        fan_post,
      } = req.body;    

      // Create the new post in the database
      const newPost = await Post.create({
        authorId: userId, // Set the author ID to the current user        
        title,
        fan_post,
      });

      // Return the newly created post
      return res.status(201).json({
        id: newPost.id,
        authorId: newPost.authorId,
        title: newPost.title,
        fan_post: newPost.fan_post,
        createdAt: newPost.createdAt,
        updatedAt: newPost.updatedAt,
      });
    } catch (err) {
      console.error("Error creating a new post:", err);
      return res.status(401).json({ message: "Unauthorized" });
    }
  }
);

router.get("/", async (req, res) => {
  try {

    // Fetch all posts with their authors
    const posts = await Post.findAll({
      include: [
        {
          model: User,
          as: "Author", // Ensure the alias matches your association
          attributes: ["id", "username"], // Include only necessary author fields
        },
        {
          model: Comment,
          as: "Comments",
          attributes: ["id", "comment"], // Only need the stars for aggregation
          required: false,
          include: [
            {
              model: User,
              as: 'User',
              attributes: ['id', 'username'],
            }
          ],
          required: false, // Allow posts without comments
        },
        {
          model: Image, 
          as: "Images",
          attributes: ['url'], 
        },
      ],
      order: [["createdAt", "DESC"]], // Sort posts by most recent
    });
    
    // Format the response
    const formattedPosts = posts.map((post) => ({
      id: post.id,
      title: post.title,
      fan_post: post.fan_post,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      author: {
        id: post.Author.id,
        username: post.Author.username,
      },
      comments: post.Comments.map((comment) => ({
        id: comment.id,
        comment: comment.comment,
        user: comment.User ? comment.User.username : null,
      })),
      images: post.Images.map((image) => image.url),
    }));

    // Send all posts as a JSON response
    return res.json({ Posts: formattedPosts });
  } catch (err) {
    console.error("Error fetching posts:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});


//* DELETE a Post by ID (CHECKED)
router.delete("/:postId", requireAuth, async (req, res) => {
  const { postId } = req.params;
  const userId = req.user.id; // Get the current user's ID from authentication

  // Find the post by ID
  const post = await Post.findByPk(postId);

  // If the post doesn't exist, return a 404 error
  if (!post) {
    return res.status(404).json({
      title: "Resource Not Found",
      message: "Post couldn't be found",
    });
  }

  // Check if the authenticated user is the author of the post
  if (post.authorId !== userId) {
    return res.status(403).json({
      title: "Forbidden",
      message: "You are not authorized to delete this post.",
    });
  }

  // If the user is the author, proceed to delete the post
  await post.destroy();

  // Return success message after deletion
  return res.status(200).json({
    message: "Successfully deleted",
  });
});

//* Create a Comment for a Post based on the Post's id (CHECKED)
router.post("/:postId/comments", requireAuth, async (req, res) => {
  try {
    const { comment, stars } = req.body;
    const postId = req.params.postId;  // Correct postId from URL parameter
    const userId = req.user.id; // Assuming `req.user.id` is the logged-in user ID

    // Validate comment input
    const errors = {};
    if (!comment || typeof comment !== "string" || comment.trim() === "") {
      errors.comment = "Comment text is required";
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

    // Check if the post exists
    const post = await Post.findByPk(postId);
    if (!post) {
      return res.status(404).json({
        message: "Post couldn't be found",
      });
    }

    // Check if the user has already commented on this post
    const existingComment = await Comment.findOne({
      where: { postId, userId },
    });

    if (existingComment) {
      return res
        .status(500)
        .json({ message: "User already has a comment for this post" });
    }

    const newComment = await Comment.create({
      userId,      
      postId,      
      comment,    
      stars,      
    });

    // Return the newly created comment
    return res.status(201).json({
      id: newComment.id,
      userId: newComment.userId,
      postId: newComment.postId,
      comment: newComment.comment,
      stars: newComment.stars,
      createdAt: newComment.createdAt,
      updatedAt: newComment.updatedAt,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
});


module.exports = router;
