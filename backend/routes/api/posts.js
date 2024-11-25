// backend/routes/api/posts.js
const express = require("express");
const { Post, User } = require("../../db/models");
// const { PostImage } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { requireAuth } = require("../../utils/auth");
const { Op, fn, col } = require("sequelize");
const { validationResult, query } = require("express-validator");
const Sequelize = require("sequelize");

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

// // Validation Middleware for Get Posts
// const validateQueryParams = [

//   query("size")
//     .optional()
//     .isInt({ min: 1, max: 20 })
//     .withMessage("Size must be between 1 and 20"),
//   query("minLat")
//     .optional()
//     .isFloat({ min: -90, max: 90 })
//     .withMessage("Minimum latitude is invalid"),
//   query("maxLat")
//     .optional()
//     .isFloat({ min: -90, max: 90 })
//     .withMessage("Maximum latitude is invalid"),
//   query("minLng")
//     .optional()
//     .isFloat({ min: -180, max: 180 })
//     .withMessage("Minimum longitude is invalid"),
//   query("maxLng")
//     .optional()
//     .isFloat({ min: -180, max: 180 })
//     .withMessage("Maximum longitude is invalid"),
//   query("minPrice")
//     .optional()
//     .isFloat({ min: 0 })
//     .withMessage("Minimum price must be greater than or equal to 0"),
//   query("maxPrice")
//     .optional()
//     .isFloat({ min: 0 })
//     .withMessage("Maximum price must be greater than or equal to 0"),
//   handleValidationErrors,
// ];

//* GET all Posts created by the Current User (CHECKED)

router.get("/current", async (req, res) => {
  try {
    // Get the current user's ID
    const userId = req.user.id;

    // Fetch posts owned by the current user
    const posts = await Post.findAll({
      where: { authorId: userId }, // Filter by the current user's ID
      // include: [
        // {
        //   model: Review,
        //   attributes: [], // Only need the stars for aggregation
        //   required: false,
        // },
        // {
        //   model: PostImage,
        //   where: { preview: true }, // Only fetch preview images
        //   attributes: ["url"], // Only get the URL of the image
        //   required: false, // Include Posts without preview images
        // },
      // ],
      // group: ["Post.id", "PostImages.id"], // Group by Post and PostImage
      // attributes: {
      //   include: [[fn("AVG", col("Reviews.stars")), "avgStarRating"]], // Calculate avgRating
      // },
    });

    // Format the response
    const formattedPosts = posts.map((post) => {
      return {
        id: post.id,
        authorId: post.authorId,        
        title: post.title,
        fan_post: post.fan_post,        
        createdAt: post.createdAt,
        updatedAt: posot.updatedAt,
        // previewImage: post.PostImages.length ? post.PostImages[0].url : null, // Get preview image URL
      };
    });

    return res.json({ Posts: formattedPosts });
  } catch (err) {
    console.error("Error fetching posts for current user:", err);
    return res.status(401).json({ message: "Unauthorized" });
  }
});


//* GET details of a Post by ID (CHECKED)
router.get("/:postId", async (req, res) => {
  const { postId } = req.params; // GET from URL

  const post = await Post.findByPk(postId, {
    include: [
      {
        model: User,
        as: "Author",
        attributes: ["id", "username"],
      },
    ],
    // Group by required attributes
    group: ["Post.id", "Author.id"], 
    // attributes: {
    //   include: [
    //     [fn("COUNT", col("Reviews.id")), "reviewCount"],
    //   ],
    // },
  });

  // Check if the post exists
  if (!post) {
    return res.status(404).json({
      message: "Post couldn't be found",
    });
  }

  // Prepare response object
  const response = {
    id: post.id,
    authorId: post.Author.id,    
    title: post.title,
    fan_post: post.fan_post,    
    createdAt: post.createdAt,
    updatedAt: post.updatedAt,
    // numReviews: post.dataValues.reviewCount || 0, 
    
    // PostImages: post.PostImages, // Directly include the PostImages
    // Author: {
    //   id: post.Author.id,
    //   username: post.Author.username      
    // },
  };

  return res.status(200).json(response);
});

//* Edit a Post 
router.put("/:postId", requireAuth, validatePost, async (req, res) => {
  const userId = req.user.id; // GET authenticated userId
  const { postId } = req.params; // GET from URL
  const { title, fan_post } =
    req.body;

  const post = await Post.findByPk(postId); // Find post by ID;

  // Check if the post exists
  if (!post) {
    return res.status(404).json({
      message: "Post couldn't be found",
    });
  }

  // Check if the authenticated user is the post's author
  if (post.authorId !== userId) {
    return res.status(403).json({
      message: "Forbidden",
      errors: {
        authorization: "Only the author can edit this post",
      },
    });
  }

  // After the post exists and user is authorized, we run validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Bad Request",
      errors: errors.array().reduce((acc, error) => {
        acc[error.param] = error.msg;
        return acc;
      }, {}),
    });
  }

  //Update the post with new details
  post.title = post.title,
  post.fan_post = post.fan_post,  
  await post.save(); // save the updated post

  // response with updated post
  return res.status(200).json(post);
});

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
      console.log(req.body)

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

//* Create a Review for a Post based on the Post's id (CHECKED)

// router.post("/:postId/reviews", requireAuth, async (req, res) => {
//   try {
//     const { review, stars } = req.body;
//     const { postId } = req.params;
//     const userId = req.user.id;

//     // Check if the user has already submitted a review for this post
//     const errors = {};
//     const existingReview = await Review.findOne({
//       where: { postId, userId },
//     });

//     if (existingReview) {
//       return res
//         .status(500)
//         .json({ message: "User already has a review for this post" });
//     }
//     // Validate the input
//     if (!review || typeof review !== "string" || review.trim() === "") {
//       errors.review = "Review text is required";
//     }    
//     if (Object.keys(errors).length > 0) {
//       return res.status(400).json({
//         message: "Bad Request",
//         errors,
//       });
//     }

//     // Check if the post exists
//     const post = await Post.findByPk(postId);
//     if (!post) {
//       return res.status(404).json({
//         message: "Post couldn't be found",
//       });
//     }

//     // Create a new review
//     const newReview = await Review.create({
//       userId,
//       postId,
//       review,      
//     });

//     // Return the newly created review
//     return res.status(201).json({
//       id: newReview.id,
//       userId: newReview.userId,
//       postId: newReview.postId,
//       review: newReview.review,      
//       createdAt: newReview.createdAt,
//       updatedAt: newReview.updatedAt,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       message: "Server Error",
//       error: error.message, // For debugging, but avoid sending this in production
//     });
//   }
// });

// //* GET all reviews for a post (CHECKED)
// router.get("/:postId/reviews", async (req, res) => {
//   const { postId } = req.params;

//   // Check if the post exists
//   const post = await Post.findByPk(postId);
//   if (!post) {
//     return res.status(404).json({
//       message: "Post couldn't be found",
//     });
//   }

//   // Fetch reviews for the post, include associated User
//   const reviews = await Review.findAll({
//     where: { postId },
//     include: [
//       {
//         model: User,
//         as: "User", // Use the alias defined in the association
//         attributes: ["id", "username"],
//       },     
//     ],
//   });

//   return res.status(200).json({ Reviews: reviews });
// });

router.get("/", async (req, res) => {
  try {

    console.log("\n!!! Incoming GET request to /api/posts"); // Log when the route is hit

    // Fetch all posts with their authors
    const posts = await Post.findAll({
      include: [
        {
          model: User,
          as: "Author", // Ensure the alias matches your association
          attributes: ["id", "username"], // Include only necessary author fields
        },
      ],
      order: [["createdAt", "DESC"]], // Sort posts by most recent
    });

    console.log("\n!!! Posts fetched from database:\n", posts); // Log posts fetched from DB

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
    }));

    console.log("\n!!! Formatted Posts Response:\n", formattedPosts); // Log formatted posts

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




module.exports = router;
