import React, { Component } from 'react';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import DishDetail from './DishDetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Contact from './ContactComponent';
import { DISHES } from '../shared/dishes';
import { PROMOTIONS } from '../shared/promotions';
import { LEADERS } from '../shared/leaders';
import { COMMENTS } from '../shared/comments';

import { Switch, Route, Redirect } from 'react-router-dom';

class Main extends Component {

  constructor(props) {
    super(props);

    this.state = {
      dishes : DISHES,
      comments: COMMENTS,
      leaders: LEADERS,
      promotions: PROMOTIONS,
      // selectedDish: null
    };
  }

  // onDishSelect(dishId) {
  //   this.setState({selectedDish : dishId});
  // }

  render() {

    const HomePage = () => {
      return(
        <Home 
          dish={this.state.dishes.filter((dish) => dish.featured)[0]}
          promotion={this.state.promotions.filter((promo) => promo.featured)[0]}
          leader={this.state.leaders.filter((leader) => leader.featured)[0]}
        />
      );
    };

    return (
      <div>
          <Header />
          <Switch>
            <Route path="/home" component={HomePage} />
            <Route exact path="/menu" component={() => <Menu dishes={this.state.dishes} /> } />
            <Route path="/contactus" component={Contact} />
            <Redirect to="/home" />
          </Switch>
          <Footer />
      </div>
    );
  }
}

export default Main;

 /* 
  Menu
            // dishes={this.state.dishes}
            // onClick= { (dishId)=> this.onDishSelect(dishId)}
          // />
          // <DishDetail 
            // dish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]}
          // /> */
