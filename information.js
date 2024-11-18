const like = async(req,res)=>{
     try {
     const postId = req.params.postId;
     const userId = req.params.postId;
      console.log("req.params :",req.params)
      console.log("postid :",postId)
      console.log("userid :",userId)  

      const postExist = await Post.findById(postId)
      const userExist = await User.findById(userId)

      if(!postExist){
        res.status(404).json({message : "Post not found"})
      }

      if(!userExist){
        res.status(404).json({message: "User not found"})
      }

      if(postExist.likedBy.includes(userId)){
        res.status(207).json({message : "Post Already Liked"})
      }

      if(postExist.dislikedBy.includes(userId)){
        postExist.dislikedBy.pull(userId);
        postExist.dislike -= 1;
      }

      postExist.likedBy.push(userId)
      postExist.like += 1;

      const savedLikes = await postExist.save()
      res.status(200).json(savedLikes);
      console.log("savedLikes: ", savedLikes)
      
     } 
     catch (error) {
      console.log("Internal server Error", error);
      res.status(500).json({message : "Internal Server error"})
       
     }
}