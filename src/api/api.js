import http from './http'

// -------------------------首页------------------------------------------
export const getWebsiteInfo = () => {
  return http.get("/api/option/getWebsiteInfo");
};

export const getManagerInfo = () => {
  return http.get("/api/user/getManagerInfo");
};


// -------------------------设置------------------------------------------
// 获取设置信息(GET)
export const getWebsiteSetting = () => {
  return http.get("/api/getWebsiteSetting");
};
// 修改设置信息(POST)
export const modifyWebsiteSetting = (info) => {
  return http.post("/api/modifyWebsiteSetting", info);
};
// 重置管理员密码(GET)
export const resetPassword = () => {
  return http.get("/api/resetPassword");
};

// -------------------------文章------------------------------------------
// 获取文章列表(GET)
export const listArticles = () => {
  return http.get("/api/article/list");
};
// 获取文章(GET)
export const searchArticle = (id) => {
  return http.get(`/api/article/searchById?article_id=${id}`);
};
// 删除文章(GET)
export const deleteArticle = (id) => {
  return http.get(`/api/article/delete?article_id=${id}`);
};
// 更新文章信息(POST)
export const modifyArticle = (article) => {
  return http.post("/api/article/update", article);
};
// 新增文章(POST)
export const createArticle = (article) => {
  return http.post("/api/article/save", article);
};

// -------------------------分类------------------------------------------
// 获取文章分类列表(GET)
export const listCategories = () => {
  return http.get("/api/category/list");
};
// 删除分类(GET)
export const deleteCategory = (id) => {
  return http.get(`/api/category/delete?category_id=${id}`);
};
// 更新分类信息(POST)
export const modifyCategory = (category) => {
  return http.post("/api/category/update", category);
};
// 新增分类(POST)
export const createCategory = (category) => {
  return http.post("/api/category/save", category);
};

// -------------------------标签------------------------------------------
// 获取标签列表(GET)
export const listTags = () => {
  return http.get("/api/tag/list");
};
// 删除标签(GET)
export const deleteTag = (id) => {
  return http.get(`/api/tag/delete?tag_id=${id}`);
};
// 更新标签信息(POST)
export const modifyTag = (tag) => {
  return http.post("/api/tag/update", tag);
};
// 新增标签(POST)
export const createTag = (tag) => {
  return http.post("/api/tag/save", tag);
};
// -------------------------评论------------------------------------------
// 获取评论列表(GET)
export const listComments = () => {
  return http.get("/api/comment/list");
};
// 删除评论(GET)
export const deleteComment = (id) => {
  return http.get(`/api/comment/delete?comment_id=${id}`);
};

// -------------------------登陆------------------------------------------
export const login = (data) => {
  return http.post(`/api/login`, data);
};
