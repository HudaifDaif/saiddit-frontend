import { useEffect, useState } from "react";
import { getArticleById } from "../../../utils/api.articles";
import { useParams } from "react-router-dom";
import "./ArticlePage.css";
import ArticleBody from "../ArticleBody/ArticleBody";
import CommentsList from "../CommentsList/CommentsList";
import { getCommentsByArticleId } from "../../../utils/api.comments";

const ArticlePage = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [articleContents, setArticleContents] = useState({});
	const [commentsData, setCommentsData] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);

	const { article_id } = useParams();

	useEffect(() => {
		setIsLoading(true);
		getArticleById(article_id)
			.then((data) => {
				const { article } = data;
				setArticleContents(article);
				return getCommentsByArticleId(article_id, currentPage);
			})
			.then(({ comments, pages }) => {
				setCommentsData({ comments, pages });
			})
			.finally(() => setIsLoading(false));
	}, [currentPage]);

	return isLoading ? (
		<h2>Loading...</h2>
	) : (
		<>
			<ArticleBody articleContents={articleContents} />
			<CommentsList
				comments={commentsData.comments}
				pages={commentsData.pages}
				currentPage={currentPage}
				setCurrentPage={setCurrentPage}
			/>
		</>
	);
};

export default ArticlePage;
