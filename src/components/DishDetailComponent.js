import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';


	const RenderDish = ({dish}) => {
		return (
			<Card>
				<CardImg width="100%" src={dish.image} alt={dish.name} />
				<CardBody>
					<CardTitle> { dish.name } </CardTitle>
					<CardText>{dish.description}</CardText>
				</CardBody>
			</Card>
			);
	};

	const RenderComments = ({comments}) => {

		console.log('DishDetail Component render invoked');

		if (comments!=null) {
			const commentItems = comments.map((comment) => {
				const commentDate = new Date(comment.date).toLocaleString('en-US', {year: 'numeric', month: 'short', day: 'numeric'});
				return (
					<li 
						key={comment.id}
					>
					{comment.comment}
					<br/>
					 -- {comment.author}, {new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(commentDate)))}
					<br/>&nbsp;
					</li>
					);
			});

			return (
				<div>
					<h4>Comments</h4>
					<ul className="list-unstyled">
						{commentItems}
					</ul>
				</div>
			);
		} else {
			return <div><h4>Comments</h4></div>;
		}
	};

	const DishDetail = (props) => {

		const dish = props.dish;
		if (dish!=null) {
			return (
					<div className="container">
						<div className="row">
							<div className="col-12 col-md-5 m-1">
								<RenderDish dish={dish} />
							</div>
							<div className="col-12 col-md-5 m-1">
								<RenderComments comments={dish.comments} />
							</div>
						</div>
					</div>
			);
		} else {
			return (
				<div></div>
			);
		}
	};


export default DishDetail;