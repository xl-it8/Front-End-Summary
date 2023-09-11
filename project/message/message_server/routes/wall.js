const express = require("express");
const router = express.Router();
const expressJoi = require("@escook/express-joi");
const {
  handel_userIp,
  handel_Wall,
  handel_FeedBack,
  handel_Comment,
  delete_Wall,
  delete_feedback,
  delete_Comment,
  handle_findWallPage,
  handle_findCommentPage,
  handle_feedbackCount,
  handle_commentCount,
} = require("../handleRoutes/wall");
//获取用户id地址
router.post("/getUserIp", handel_userIp);
//新建wall
router.post("/insertWall", handel_Wall);
//新建反馈
router.post("/insertFeedBack", handel_FeedBack);
//新建评论
router.post("/insertComment", handel_Comment);
//删除墙 delete_feedback
router.post("/deleteWall", delete_Wall);
//删除反馈
router.post("/deleteFeedback", delete_feedback);
//删除评论
router.post("/deleteComment", delete_Comment);
//查询墙的分页
router.post("/findWallPage", handle_findWallPage);
//查询墙的评论 handle_findCommentPage
router.post("/findCommentPage", handle_findCommentPage);
//查询反馈总数据
router.post("/findfeedbackCount", handle_feedbackCount);
//查询评论总数handle_commentCount
router.post("/findcommentCount", handle_commentCount);
module.exports = router;
