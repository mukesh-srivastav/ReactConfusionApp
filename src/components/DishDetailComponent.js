import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

class DishDetail extends Component {

	constructor(props) {
		super(props);
		
		this.state = {
			selectedDish : null
		};

		console.log('Dish Details Component constructor invoked');
	}

	onDishSelect(dish) {
		this.setState({selectedDish : dish});
	}

	renderDish(dish) {
		return (
			<Card>
				<CardImg width="100%" src={dish.image} alt={dish.name} />
				<CardBody>
					<CardTitle> { dish.name } </CardTitle>
					<CardText>{dish.description}</CardText>
				</CardBody>
			</Card>
			);
								
	}

	renderComments(comments) {

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
	}

	render() {

		const dish = this.props.dish;
		if (dish!=null) {
			return (
					<div className="container">
						<div className="row">
							<div className="col-12 col-md-5 m-1">
								{this.renderDish(dish)}
							</div>
							<div className="col-12 col-md-5 m-1">
								{this.renderComments(dish.comments)}
							</div>
						</div>
					</div>
			);
		} else {
			return (
				<div></div>
			);
		}
	}


}

export default DishDetail;