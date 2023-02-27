const express = require("express")

const commentRouter = express.Router();

const{newComment, allcomment,removeComment} = require("../controller/commentController");


commentRouter.post("/:id/comments",newComment)
//commentRouter.route("/:id/comments").post(newComment).get(allcomment)

//commentRouter.route("/:id/comments/:comId").delete(removeComment)

module.exports = commentRouter;