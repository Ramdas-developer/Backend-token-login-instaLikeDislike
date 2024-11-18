const { Router } = require("express");
const {SignUp,getUser,deleteUser,updateData, getPost} = require("../controllers/userController");
const { loginUser,upload, like, dislike, commentOnPost } = require("../controllers/loginSignController");
const verifyToken = require("../middleware/verifyToken");
const postControl = require("../controllers/postController");


const userRoute = Router();
userRoute.post("/post", upload.single("image"), postControl);
userRoute.post('/like/:postId/:userId', like)
userRoute.post('/dislike/:postId/:userId', dislike)
userRoute.post('/comment/:postId/:userId', commentOnPost)

userRoute.post("/register", SignUp);
userRoute.post("/login", loginUser);

userRoute.get("/get", verifyToken, getUser);
userRoute.delete("/:id", verifyToken, deleteUser);
userRoute.put("/:id", verifyToken, updateData);
userRoute.get("/getposts", getPost)

userRoute.route("/" )
.post(SignUp)
.get(getUser)

userRoute.route("/:id")
.delete(deleteUser)
.put(updateData)

module.exports = userRoute;
