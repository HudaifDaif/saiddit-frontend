import axios from "axios";

axios.defaults.baseURL = "https://saiddit.onrender.com/api";

export const getArticles = (page, searchParams) => {
	const params = { p: page };

	const topic = searchParams.get("topic");
	const sort_by = searchParams.get("sort_by");
	const order = searchParams.get("order");

	if (topic) params.topic = topic;
	if (sort_by) params.sort_by = sort_by;
	if (order) params.order = order;

	return axios.get("/articles", { params }).then(({ data }) => data);
};

export const getArticleById = (id) => {
	return axios.get(`/articles/${id}`).then(({ data }) => data);
};

export const patchArticleById = (id, opinion, username) => {
	return axios
		.patch(`/articles/${id}`, {
			inc_votes: opinion, username
		})
		.then(({ data }) => data);
};
