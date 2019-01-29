import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem,
	Button, Modal, ModalHeader, ModalBody, Label, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';

	const maxLength = (len) => (val) => !(val) || (val.length <= len);
	const minLength = (len) => (val) => val && (val.length >= len);

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

	const RenderComments = ({comments, addComment, dishId}) => {
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
					<CommentForm dishId={dishId} addComment={addComment} />
				</div>
			);
		} else {
			return <div><h4>Comments</h4></div>;
		}
	};

class CommentForm extends Component {

	constructor(props) {
		super(props);
		this.state= {
			isModalOpen: false
		};

		this.toggleModal = this.toggleModal.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	toggleModal() {
		this.setState({
			isModalOpen: !this.state.isModalOpen
		});
	};

	handleSubmit(values) {
        this.toggleModal();
        this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);

    }

	render() {
		return (
            <div>
                <Button outline onClick={this.toggleModal}>
                    <span className="fa fa-pencil fa-lg"></span> Submit Comment
                </Button>

                    <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                        <ModalHeader toggle={this.toggleModal}> Submit Comment</ModalHeader>
                        <ModalBody>
                                <LocalForm onSubmit={(values) => this.handleSubmit(values)} >
                                    <Row className="form-group">
                                    	<Label htmlFor="rating"  md={12}>Rating</Label>
                                        <Col  md={12}>
                                            <Control.select
                                            	model=".rating"
                                            	name="rating"
                                            	className="form-control"
                                             >
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                                <option>5</option>
                                            </Control.select>
                                        </Col>
                                    </Row>

                                    <Row className="form-group">
                                    	<Label htmlFor="author"  md={12}>Your Name</Label>
                                        <Col  md={12}>
                                            <Control.text 
                                            	model=".author"
                                            	id="author"
                                            	name="author"
                                            	placeholder="Your Name"
                                            	className="form-control"
                                            	validators={{ minLength:  minLength(3), maxLength: maxLength(15)}}
                                             />
                                            <Errors 
                                            	className="text-danger"
                                            	model=".author"
                                            	show="touched"
                                            	messages={{
                                            		minLength: 'Must be greater than 2 characters',
                                            		maxLength: 'Must be 15 charaters or less'
                                            	}}
                                             />
                                        </Col>
                                    </Row>

                                    <Row className="form-group">
                                    	<Label htmlFor="feedback" md={12}>Comment</Label>
                                        <Col md={12}>
                                            <Control.textarea 
                                            	model=".comment"
                                            	id="comment" 
                                            	name="comment"
                                            	rows="6"
                                            	className="form-control"
                                             />
                                            <Errors 
                                            	className="text-danger" 
                                            	model=".comment"
                                            	show="touched"
                                            />
                                        </Col>
                                    </Row>

                                    <Button type="submit" value="submit" color="primary">Submit</Button>
                                </LocalForm>
                        </ModalBody>
                    </Modal>
                
            </div>
		);
	}
}

const DishDetail = (props) => {

		if (props.isLoading) {
			return (
				<div className="container">
					<div className="row">
						<Loading />
					</div>
				</div>
			);
		} 
		else if (props.errMess) {
			return (
				<div className="container">
					<div className="row">
						<h4>{props.errMess}</h4>
					</div>
				</div>
			);	
		}
		else if (props.dish!=null) {
			return (
					<div className="container">
						<div className="row">
							<Breadcrumb>
								<BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
								<BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
							</Breadcrumb>
							<div className="col-12">
								<h3>{props.dish.name}</h3>
								<hr />
							</div>
						</div>
						<div className="row">
							<div className="col-12 col-md-5 m-1">
								<RenderDish dish={props.dish} />
							</div>
							<div className="col-12 col-md-5 m-1">
								<RenderComments 
									comments={props.comments}
									addComment={props.addComment}
        							dishId={props.dish.id}
        						 />
							</div>
						</div>
					</div>
			);
		}
		else {
			return (
				<div>	</div>
			);
		}
	};

export default DishDetail;