'use strict';
import React, {useReducer, Fragment} from "react";
import MovieAPI from "./movieAPI";
import Spinner from "./Spinner.jsx";


export default function MovieSearch(){

	const initialObjectVal = {
		"movieQuery" : "",
		"movieList" : [],
		"isLoading" : false,
		"movieListComponent" : null		
	};

	const handleSearch = () => {
		MovieAPI.getMovieList(state.movieQuery)
				.then((data) => {
					console.log(data);
					let list = [];

					if ("results" in data["titleResults"]){
						let movieList = data["titleResults"]["results"];
						list.push(movieList);						
					}

					if ("results" in data["nameResults"]){
						let nameList = data["nameResults"]["results"];
						list.push(nameList);						
					}

					dispatchFn({
						"type" : "LOAD_MOVIE_LIST",
						"payload" : list
					});
					
				}).catch((error) => {
					console.log(error);
				});
	};

	const createMovieComponent = (list) => { 
			return(
				<table className="table table-stripped table-bordered">
					<thead>
						<tr>
							<th>Title</th>
							<th>Release Year</th>
							<th>Type</th>
							<th>Credits</th>
							<th>Poster</th>
						</tr>
					</thead>
					<tbody>{list.map((movieData) => {
							
							return	(<tr key={movieData.id}>
										<td>{movieData.titleNameText}</td>
										<td>{movieData.titleReleaseText}</td>
										<td>{movieData.titleTypeText}</td>
										<td>
											<ul>{movieData.topCredits.map(credit => (<li>{credit}</li>))}</ul>
											</td>			            
										<td>{ (movieData["titlePosterImageModel"] !== undefined) ? <img src={movieData.titlePosterImageModel.url} 
											            																height="290px" 
											            																width="300px" 
											            																alt={movieData.titlePosterImageModel.caption} /> 
											            														:  <img src="" 
											            																height="290px" 
											            																width="300px" 
											            																alt={movieData.titleNameText} /> }</td>
								</tr>);
							})
						}
					</tbody>
				</table>
			);				
	};		

	const createNameComponent = (list) => {
			return	(<table className="table table-stripped table-bordered">
							<thead>
								<tr>
									<th>Name</th>
									<th>Category</th>
									<th>Known For</th>
									<th>Year</th>
									<th>Poster</th>
								</tr>
							</thead>
							<tbody>{list.map((nameData) =>{
										return (<tr key={nameData.id}>
													<td>{nameData.displayNameText}</td>
													<td>{nameData.knownForJobCategory}</td>
													<td>{nameData.knownForTitleText}</td>
													<td>{nameData.knownForTitleYear}</td>		            
													<td>{ (nameData["avatarImageModel"] !== undefined) ? <img 	src={nameData.avatarImageModel.url} 
													            															height="290px" 
													            															width="300px" 
													            															alt={nameData.avatarImageModel.caption} /> 
													            													: <img 	src="" 
													            															height="290px" 
													            															width="300px" 
													            															alt={nameData.displayNameText} /> 
													}</td>
												</tr>); 
									})								
								}
							</tbody>
						</table>)
	};		
			

	const createMovieListComponent = (list, isLoading) => {
		if(isLoading == true){
			return <Spinner />;
		}else{
			let movieList = (isLoading === false && list !== undefined && list !== null && list.length >= 1) ? list[0] : [];
			let nameList = (isLoading === false && list !== undefined && list !== null && list.length == 2) ? list[1] : [];

			if(isLoading === false && list !== undefined && list !== null && list.length > 0) {
				return (
					<div>
						{createMovieComponent(movieList)}
						<hr/>
						{createNameComponent(nameList)}
					</div>	
				)
			} 
		}			
	};	

	const reducerFn = (state, action) => {

		if(action.type === "SET_MOVIE"){			
			return {
				...state, 
				"movieQuery" : action.searchQuery
			};
		}

		if(action.type === "SEARCH_MOVIE"){
			return {
				...state,
				"movieList" : [],
				"isLoading" : true,
				"movieListComponent" : createMovieListComponent(undefined, true)
			};
		}

		if(action.type === "LOAD_MOVIE_LIST"){			
			return {
				...state,
				"movieList" : action.payload,
				"movieListComponent" : createMovieListComponent(action.payload, false)								
			}
		}

		if(action.type === "MOVIE_RESET"){						
			return initialObjectVal;
		}
	}


	const [state, dispatchFn] = useReducer(reducerFn, initialObjectVal);
	
	return(
		<Fragment>
			<form className="form-horizontal">
				<div className="form-group">
					<label for="inputmovie" className="col-sm-2 control-label">Search</label>
					<div className="col-sm-10">
						<input 	type="text" 
								className="form-control" 
								id="inputmovie" 
								placeholder="search" 
								value={state.movieQuery} 
								onChange={event => dispatchFn({ "type" : "SET_MOVIE", "searchQuery" : event.target.value })} />
					</div>
				</div>

				<div className="form-group">
					<div className="col-sm-offset-2 col-sm-10">
	      				<button type="button" 
	      						className="btn btn-primary" 
	      						onClick={() =>{      					
	      							dispatchFn({ "type" : "SEARCH_MOVIE" });
	      							handleSearch(); 
	      						}}>Enter</button>
	      						&nbsp;
	      				<button type="button" 
	      					className="btn btn-default" 
	      					onClick={() => {
	      						dispatchFn({ "type" : "MOVIE_RESET" });
	      					}}>Reset</button>
	    			</div>
				</div>
			</form>
			<hr/>
			{state.movieListComponent}
		</Fragment>
	);
}