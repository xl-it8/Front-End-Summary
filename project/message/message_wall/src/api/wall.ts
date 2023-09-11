import request from "@/utils/request";

//新建评论
export const addWall = (data: WallData): Ipromise<WallData> =>
  request.post("/insertWall", data);
//新建反馈、
export const addFeedback = (data: FeedbackData): Ipromise<string> =>
  request.post("/insertFeedBack", data);
//新建评论
export const addComment = (data: CommentData): Ipromise<string> =>
  request.post("/insertComment", data);
export const getUserIp = (): Ipromise<string> => request.post("/getUserIp");
//查询分页
export const findWallPage = (data: WallPageData): Ipromise<WallList> =>
  request.post("/findWallPage", data);
//查询评论分页
export const findCommentPage = (data: CommentPageData): Ipromise<CommentData> =>
  request.post("/findCommentPage", data);

//文件上传
export const fileUpload = (data: FormData): Ipromise<string> =>
  request.post("/fileUpload", data);
