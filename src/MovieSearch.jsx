'use strict';
import React, {useReducer, Fragment} from "react";
import MovieAPI from "./movieAPI";
import Spinner from "./Spinner.jsx";


export default function MovieSearch(){

	const initialObjectVal = {
		"movieQuery" : "",
		"movieList" : []		
	};

	const createMovieListComponent = (movielist, isLoading) => {
		if(isLoading == true){
			return <Spinner />;
		}
		return (isLoading === false && movielist !== undefined && movielist !== null && movielist.length > 0) ? movielist.map(movieData => (
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
				<tbody>
					<tr key={movieData.id}>
						<td>{movieData.titleNameText}</td>
			            <td>{movieData.titleReleaseText}</td>
			            <td>{movieData.titleTypeText}</td>
			            <td>
			            	<ul>{movieData.topCredits.map(credit => (
			            		<li>{credit}</li>
			            	))}</ul>
			            </td>			            
			            <td>{ (movieData["titlePosterImageModel"] !== undefined) ? <img src={movieData.titlePosterImageModel.url} height="290px" width="300px" alt={movieData.titlePosterImageModel.caption} /> :  <img src="" height="290px" width="300px" alt={movieData.titleNameText} /> }</td>
	        		</tr>
				</tbody>
			</table>	        
    	)) : null;	
	};	

	const reducerFn = (state, action) => {

		if(action.type === "SET_MOVIE"){			
			return {
				...state, 
				"movieQuery" : action.searchQuery
			};
		}

		if(action.type === "SEARCH_MOVIE"){
			let payload = [];			
			
			MovieAPI.getMovieList(action.searchQuery)
					.then((data) => {
						console.log(data);
						
						if ("results" in data["titleResults"]){
							payload = data["titleResults"]["results"];
							dispatchFn({
								"type" : "LOAD_MOVIE_LIST",
								"payload" : payload
							});
						}
					
					}).catch((error) => {
						console.log(error);
					});

			return {
				...state,
				"movieList" : [],
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
			return {
				...state, 
				"movieQuery" : "",
				"movieList" : [],
				"movieListComponent" : createMovieListComponent(undefined, false)
			}
		}
	}


	const [state, dispatchFn] = useReducer(reducerFn, initialObjectVal);
	
	return(
		<Fragment>
			<form className="form-horizontal">
				<div className="form-group">
					<label for="inputmovie" className="col-sm-2 control-label">Search</label>
					<div className="col-sm-10">
						<input type="text" className="form-control" id="inputmovie" placeholder="search" value={state.movieQuery} onChange={event => {
							dispatchFn({ 
	      						"type" : "SET_MOVIE", 
	      						"searchQuery" : event.target.value
	      					}); 								
						}} />
					</div>
				</div>

				<div className="form-group">
					<div className="col-sm-offset-2 col-sm-10">
	      				<button type="button" className="btn btn-primary" onClick={() =>{      					
	      					dispatchFn({ 
	      						"type" : "SEARCH_MOVIE", 
	      						"searchQuery" : state.movieQuery
	      					}); 
	      				}}>Enter</button>&nbsp;
	      				<button type="button" className="btn btn-default" onClick={() => {
	      					dispatchFn({ 
								"type" : "MOVIE_RESET", 
								"searchQuery" : ""
							});
	      				}}>Reset</button>
	    			</div>
				</div>
			</form>
			<hr/>
			{state.movieListComponent}
		</Fragment>
	);
}