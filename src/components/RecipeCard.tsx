import React from 'react';
import {recipeData} from '../interfaces/recipeData';
import {Toast, Button} from 'react-bootstrap';

import './RecipeCard.css';

interface recipeCardProps{
	recipe: recipeData 
}

class RecipeCard extends React.Component<recipeCardProps, {}>{	
	render(){	
		return(
			<Toast>
  				<Toast.Header>
   	 				<img src={this.props.recipe.thumbnail} className="rounded mr-2" alt="" />
    				<strong className="mr-auto"><b>{this.props.recipe.title}</b></strong>
    				<Button variant="info" className="ml-2" href={this.props.recipe.href} target="_blank">Recipe</Button>
  				</Toast.Header>
  				<Toast.Body><b><u>Ingredients:</u></b> {this.props.recipe.ingredients}</Toast.Body>
			</Toast>	
		)
	}
}

export default RecipeCard;
