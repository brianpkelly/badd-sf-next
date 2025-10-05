"use client";

import { useState, useEffect } from 'react';
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import Image from "next/image";
    
const ArticlesUrl = '/badd-data/articles-v0001.json?date=9-20-2025';

interface IArticle {
	id? : string;
	image? : string;
	alt? : string;
	link? : string;
	description? : string;
	descriptionl? : string;
	source? : string;
	date? : string;
};

interface IData {
	date : string;
	items : IArticle[];
}

const emptyArticle = {
	id : "string",
	image : "/",
	alt : "string",
	link : "string",
	description : "string",
	descriptionl : "string",
	source : "string",
	date : "string"
};

const pageSize = 6;

const GET_ARTICLES = gql`
  query GetArticles($first: Int!, $after: String) {
    articles(first: $first, after: $after) {
      edges {
        node {
          id
          title
          date
          link
					linkexternal
          source
          description
          featuredImage {
            node {
              sourceUrl
              altText
            }
          }
        }
        cursor
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

const Articles = () => {

	const [articles, setArticles] = useState<IArticle[]>([]);
	const [pageInfo, setPageInfo] = useState(null);

	const { loading, error, data, fetchMore } = useQuery(GET_ARTICLES, {
		variables: { first: pageSize, after: null }
	});

	useEffect(() => {
	  if (data?.articles?.edges) {
	    setArticles(data.articles.edges.map((edge: any) => edge.node));
	    setPageInfo(data.articles.pageInfo);
	  }
	}, [data]);

	const loadMore = async () => {
		const currentPageInfo = pageInfo;

		if (!currentPageInfo.hasNextPage) return;

		console.log("pageInfo:", currentPageInfo);

		const { data: moreData } = await fetchMore({
			variables: {
				first: pageSize,
				after: currentPageInfo.endCursor,
			},
		});

		if (moreData?.articles?.edges) {
		setArticles((prev) => [
			...prev,
			...moreData.articles.edges.map((edge: any) => edge.node),
		]);
		}
		setPageInfo(moreData.articles.pageInfo);
	};

	if (loading && articles.length === 0) return <p>Loading…</p>;
	if (error) return <p>Error: {error.message}</p>;

	return (
	<div className="badd-articles">
		<ul id="news-articles" className="row article-row" aria-label="news articles">

			{ articles && articles.map((article: IArticle) => {
				// const article = edge.node;
				const featuredImage = article.featuredImage?.node;
				return (
				<li key={article.id} className="col-md-4" aria-label="article">
					<div className="card mb-4 box-shadow">
						<div className="card-image-frame">
							{ featuredImage && (<Image
								src={featuredImage.sourceUrl}
								width={1000}
								height={800}
								alt={featuredImage.altText}
								aria-hidden={true}
								className="card-img-top article-image" 
							/>) }
						</div>
						<div className="card-body">
							<div className="card-text-frame card-text">
								<p>
									{article.description}
									<span className="d-sm-none d-md-inline">...</span>
									<span> </span>
									<span className="d-md-none">{article.descriptionl}</span>
								</p>
							</div>
							<div className="d-flex justify-content-between align-items-center">
								<div className="btn-group">
									<a type="button" 
									href={article.linkexternal} 
									target="_blank" 
									className="btn btn-sm btn-outline-secondary"
									aria-label="Read article"
									>More</a>
								</div>
								<small className="card-date text-muted">
									<span aria-label={`article source: ${article.source}`}>{article.source}</span>
									<br/>
									<span aria-label={`article date: ${article.source}`}>{article.date}</span>
								</small>
							</div>
						</div>
					</div>
				</li>
				)
		})}
		</ul>
		{pageInfo?.hasNextPage ? (
			<p className="general-content">
        		<button type="button" className="btn btn-md btn-outline-secondary" onClick={loadMore} aria-label="Show more news articles above">More News Articles</button>
			</p>
      ) : (<p></p>)}
	</div>
    );

};

export default Articles;