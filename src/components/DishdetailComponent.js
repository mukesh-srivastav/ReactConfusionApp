import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';

class Menu extends Component {

	constructor(props) {
		super(props);
		
		console.log('Menu Component constructor invoked');
	}

	render() {

		const menu = this.props.dish.map( (dish) =>  {
				return (
					<div key={dish.id} className="col-12 col-md-5 m-1">
						<Card onClick= { ()=> this.onDishSelect(dish)}>
							<CardImg width="100%" object src={dish.image} alt={dish.name} />
							<CardImgOverlay>
								<CardTitle>{dish.name}</CardTitle>
							</CardImgOverlay>
						</Card>
					</div>
				);
			});
		console.log('Menu Component render is invoked');

		return (
				<div className='container'>
					<Card>
						<CardImg width="100%" object src={dish.image} alt={dish.name} />
						<CardBody>
							<CardTitle> { dish.name } </CardTitle>
							<CardText>{dish.description}</CardText>
						</CardBody>
					</Card>
				</div>
			);
		return (
			<div className="container">
				<div className="row">
						{ menu }
				</div>
				<div className="row">
					{this.renderDish(this.state.selectedDish)}
				</div>
			</div>
		);
	}


}