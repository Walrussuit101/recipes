import React from 'react';
import {Navbar, Form, Button} from 'react-bootstrap';

interface NavBarProps{
	onSubmitFunc: (e: React.FormEvent<HTMLFormElement>) => void,
	onChangeFunc: (e: React.ChangeEvent<HTMLInputElement>) => void,
	searchTerm: string,
	spinner: JSX.Element
}

class NavBar extends React.Component<NavBarProps, {}>{	
	render(){
		return(
			<>
			<Navbar bg="dark" variant="dark" expand="lg">
  				<Navbar.Brand href="/recipes">Recipe Searcher &#127860;</Navbar.Brand>
				{this.props.spinner}
  				<Navbar.Toggle aria-controls="basic-navbar-nav" />
  				<Navbar.Collapse id="basic-navbar-nav">
    				<Form onSubmit={this.props.onSubmitFunc} inline className="ml-2">
      					<Form.Control onChange={this.props.onChangeFunc} value={this.props.searchTerm} type="text" placeholder="Food name..." className="mr-sm-2" />	
      					<Button type="submit" variant="info">Find Recipes!</Button>
    				</Form>
  				</Navbar.Collapse>
			</Navbar>
			</>
		)
	}
}

export default NavBar;
