import * as recommendService from './recommend.service.js'
export const getRecommendations = async (req, res, next) => {
  const question = req.body?.content;

  if (typeof question !== "string" || !question.trim()) {
    return res.status(400).json({ message: "Vui lòng nhập câu hỏi." });
  }

  try {
    const result = await recommendService.getRecommendations(question.trim());
    if(result.total === 0) {
      return res.json("Không có khóa học nào theo yêu cầu của bạn")
    }
    return res.json(result);
  } catch (error) {
    return next(error);
  }
};
