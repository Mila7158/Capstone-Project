# Capstone-Project

to run this application: 

1. Run `npm start` in the `backend` folder to start your server on the port defined
in the `.env` file, which should be `8000`.


# -------------------------------------------
# MVP Feature List:

## Posts (Full CRUD):

Users can create, read, update, and delete posts. Posts include fields for title, content, user_id, and timestamps.

## Reviews (Full CRUD):

Users can add, view, edit, and delete reviews on posts. Reviews include fields for post_id, user_id, comment, and timestamps.

# Bonus Features:

## Likes (3/4 CRUD):

Users can like/unlike posts. Likes will be stored in a separate table with post_id and user_id to track who liked each post.

## Images for Posts (Future Bonus):

Users can upload images to their posts. Posts will include an image_url field to store the link to the uploaded image.

 Add a custom footer

# -------------------------------------------
# Database Schema

![db_diagram]
[db-schema]: ./images/db_diagram.png

# -------------------------------------------
# User Stories for Core Features

## Feature 1: Posts (Full CRUD) As a logged-in user, I want to create a new post so I can share my thoughts with the community.

Action: Navigate to "Create Post" page, enter title and content, and click "Submit." Result: A new post is created and saved in the database. As a user, I want to view all posts so I can read what others have shared.

Action: Navigate to the homepage. Result: All posts are displayed in a list with their title, author, and a preview of content. As a user, I want to view a single post so I can read its full content and related reviews.

Action: Click on a post's "Read More" button. Result: The post details, including title, full content, and reviews, are displayed. As a logged-in user, I want to update my own post so I can fix mistakes or add more information.

Action: Navigate to the "Edit Post" page, update the title or content, and click "Save Changes." Result: The post is updated in the database. As a logged-in user, I want to delete my own post so I can remove content I no longer want to share.

Action: Click on the "Delete" button under my post. Result: The post is removed from the database.

## Feature 2: Reviews (Full CRUD) As a logged-in user, I want to add a review to a post so I can share my opinion or feedback.

Action: Navigate to the post details page, click "New Review" button, on the create review form type a comment, and click "Submit". Result: A new review is saved and displayed under the post. As a user, I want to see all reviews on a post so I can read others’ opinions.

Action: View the post details page. Result: All reviews related to the post are displayed below it. As a logged-in user, I want to edit my review so I can correct mistakes or add more details.

Action: Click the "Edit" button below my review, modify the comment, and save changes. Result: The review is updated in the database. As a logged-in user, I want to delete my review so I can remove feedback I no longer want to share.

Action: Click the "Delete" button next to my review. Result: The review is removed from the database.

## Future User Stories (For Bonus Features)

## Feature 3: Likes

As a logged-in user, I want to like a post so I can show my support. As a logged-in user, I want to unlike a post if I change my mind. As a user, I want to see how many likes a post has to gauge its popularity.

## Feature 4: Images

As a logged-in user, I want to add an image to my post so I can make it more engaging. As a user, I want to view images attached to posts so I can enjoy a richer experience.

# -------------------------------------------
# Wireframes

https://github.com/user-attachments/files/17809105/FanConnect_Wireframe.drawio.2.pdf



# DATABASE COMMANDS

## GENERATE MIGRATION: 

```bash
npx sequelize model:generate --name User --attributes username:string,email:string,hashedPassword:string
```

## Correct the migration file and do the migration (creates table in database)
```bash
npx dotenv sequelize db:migrate
```

## Command to undo the migration:

```bash
npx dotenv sequelize db:migrate:undo
```
## Generate a user seeder file

```bash
npx sequelize seed:generate --name demo-user
```
## After modifying it and adding other seeds run:

```bash
npx dotenv sequelize db:seed:all
```
## Command to undo the migration for the most recent seed file:
```bash
npx dotenv sequelize db:seed:undo
```
## Command to undo the migrations for all the seed files:
```bash
npx dotenv sequelize db:seed:undo:all
```

# The best way to update migrations and seeds in database after making some changes in files is to DELETE db file and run from backend directory: 

```bash
npx dotenv sequelize db:migrate

npx dotenv sequelize db:seed:all


# To create new table: 

npx sequelize model:generate --name Post --attributes authorId:integer,title:string,fan_post:string 
```


# To set the `token` cookie back, just go to the `GET /api/set-token-cookie` route
again: [http://localhost:8000/api/set-token-cookie].



# GITHUB COMMANDS: 

## merge the branch into the `dev` branch:
```bash
git checkout dev
```

```bash
git pull origin dev
```

```bash
git merge ""auth-setup""
```

```bash
git push origin dev
```

## Delete branch:
`git branch -d branch-name`

## Create and switch to a new branch: 
`git checkout -b branch-name`


- Login: `POST /api/session`
- Logout: `DELETE /api/session`
- Signup: `POST /api/users`
- Get session user: `GET /api/session`

# DEPLOYMENT NOTES

For Docker use external database, for without Docker - internal database URL