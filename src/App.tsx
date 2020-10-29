import React from 'react';
import {recipeData} from './interfaces/recipeData';
import RecipeCard from './components/RecipeCard';
import NavBar from './components/NavBar';
import {Spinner, Button} from 'react-bootstrap';
import './App.css';

interface state{
	makeFetch: boolean,
    searchTerm: string,
	page: number,
    fetchURL: string,
    rawResults: Object[],
    results: recipeData[]
}

const corsAnywhereURL = "https://cors-anywhere.herokuapp.com/";

class App extends React.Component<{}, state> {
    constructor(props: {}){
        super(props);
        this.state= {
			makeFetch: true,
            searchTerm: "bread",
			page: 1,
            fetchURL: corsAnywhereURL+"http://www.recipepuppy.com/api/?q=bread&p=1",
            rawResults: [],
            results: []
        }
    }

    handleSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        this.setState({searchTerm: e.target.value})
    }

	handleNextPage = ():void => {			
		let newPage = this.state.page + 1;	
		this.setState({
			page: newPage,	
			fetchURL: "https:cors-anywhere.herokuapp.com/" + "http://www.recipepuppy.com/api/?q="+this.state.searchTerm+"&p="+newPage.toString()
		})
	}

	handlePrevPage = (): void => {
		let newPage = this.state.page - 1;
		this.setState({
			page: newPage,
			fetchURL: "https:cors-anywhere.herokuapp.com/" + "http://www.recipepuppy.com/api/?q="+this.state.searchTerm+"&p="+newPage.toString()
		})
	}

    handleSearchTermSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
		let newPage = 1;
        this.setState({
			page: newPage,
			fetchURL: "https://cors-anywhere.herokuapp.com/" + "http://www.recipepuppy.com/api/?q="+this.state.searchTerm+"&p="+newPage.toString()
        })
    }

    getResults = (): void => {
		if(this.state.makeFetch === true){
			fetch(this.state.fetchURL)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    rawResults: data['results']
                })
                this.state.rawResults.forEach(result =>
                    this.setState({
                        results: this.state.results.concat(result as recipeData)
                    })
                )
            })
		}
	}

    componentDidUpdate(prevProps: Readonly<{}>, prevState: Readonly<state>, snapshot?: any) {
        if(prevState.fetchURL !== this.state.fetchURL){	
			this.setState({	
				results: []
			});
			 
			this.getResults();
        }
    }

    componentDidMount() {
        this.getResults();
    }

    render(){

		//if there are results in state, render them
        if(this.state.results.length !== 0){

            let elements: JSX.Element[] = [];
            this.state.results.forEach(result =>
                elements = elements.concat(	
					<RecipeCard recipe={result}></RecipeCard>
                )
            )

			//if greater than page 1, display next/prev
			//if page 1, only display next
			let buttons: JSX.Element[] = [];
			if(this.state.page > 1){
				buttons = buttons.concat(
				<div id="buttonDiv">
					<Button type="button" variant="info" className="float-left" onClick={this.handlePrevPage}>Prev Page</Button>
					<h5 className="float-left mx-4" >Page: {this.state.page}</h5>
					<Button type="button" variant="info" onClick={this.handleNextPage}>Next Page</Button>
				</div>
				)
			}else{
				buttons = buttons.concat(
				<div id="buttonDiv">
					<h5 className="float-left mr-4">Page: {this.state.page}</h5>
					<Button type="button" variant="info" className="float-left" onClick={this.handleNextPage}>Next Page</Button>
				</div>
				)
			}

            return(
                <div>
					<NavBar
						onSubmitFunc={this.handleSearchTermSubmit} 
						onChangeFunc={this.handleSearchTermChange} 
						searchTerm={this.state.searchTerm}
						spinner = {
							<></>
						}
					/>
					<div id="recipeElementWrapper">
						{elements}
						{buttons}
					</div>
				</div>
            )

		//if there are not results, that means we're getting them, render navbar with loading spinner
        }else{
            return(
				<div className="mb-5">
					<NavBar
						onSubmitFunc={this.handleSearchTermSubmit} 
						onChangeFunc={this.handleSearchTermChange} 
						searchTerm={this.state.searchTerm}
						spinner = {
							<Spinner variant="light" className="ml-3" animation="border" role="status">
  								<span className="sr-only">Loading...</span>
							</Spinner>
						}
					/>
				</div>
            )
        }
    }
}

export default App;
