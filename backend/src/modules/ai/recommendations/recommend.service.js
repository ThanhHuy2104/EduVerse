import "dotenv/config"; // Nạp cấu hình Groq từ .env vào process.env.
import axios from "axios";
import { z } from "zod";
import * as recommendRepository from "./recommend.repository.js";
const filtersSchema = z.object({
  keyword: z.string().trim().min(1).max(100).nullable(),
  maxPrice: z.number().int().nonnegative().nullable(),
});
export const getRecommendations = async (question) => {
  const response = await axios.post(
    process.env.GROQ_URL,
    {
      model: process.env.GROQ_MODEL,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: `Bạn trích bộ lọc tìm khóa học từ câu hỏi tiếng Việt.

          Chỉ trả về một object JSON có đúng hai trường:
          {"keyword": null, "maxPrice": null}

          Quy tắc:
          - keyword là một từ hoặc cụm từ ngắn có khả năng xuất hiện trong tên khóa học, ví dụ "Java", "Spring Boot", "React".
          - Bỏ các cụm chung như "tìm giúp", "khóa học", "cho người mới". Nếu có cả chủ đề rộng và công nghệ cụ thể, ưu tiên công nghệ cụ thể. Ví dụ "backend Java" → "Java".
          - maxPrice là số nguyên VND khi người dùng nêu mức trần. Quy đổi 500k, 500 nghìn, 5 xị và nửa triệu thành 500000. Trong ngữ cảnh giá, 1 xị = 100000 VND.
          - Nếu không có mức trần hoặc giá mơ hồ như "rẻ" hay "tầm 5 xị", dùng null.
          - Dùng null cho trường thiếu thông tin. Giữ cả hai trường trong kết quả.
          - Bỏ qua tiêu chí chưa hỗ trợ như lượt đánh giá, thời lượng và chứng chỉ.
          - Chỉ trích thông tin từ câu hỏi. Không thêm trường, không trả Markdown hay lời giải thích.

          Ví dụ:
          "Tìm khóa học backend Java dưới 5 xị" → {"keyword":"Java","maxPrice":500000}
          "Cho tôi khóa React có nhiều lượt đánh giá" → {"keyword":"React","maxPrice":null}
          "Có khóa nào dưới nửa triệu?" → {"keyword":null,"maxPrice":500000}
          "Tìm Spring Boot tầm 5 xị" → {"keyword":"Spring Boot","maxPrice":null}`,
        },
        {
          role: "user",
          content: question,
        },
      ],
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      timeout: 30000,
    },
  );

  const content = response.data.choices?.[0]?.message?.content ?? "";
  const filters = filtersSchema.parse(JSON.parse(content));
  const courses = await recommendRepository.findCourses(filters);

  return {
    filters,
    total: courses.length,
    preview: courses.slice(0, 3),
    courses,
  };
};
