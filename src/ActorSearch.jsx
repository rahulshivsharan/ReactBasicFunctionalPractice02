'use strict';
import React, {useState, useEffect, Fragment} from "react";
import MovieAPI from "./movieAPI";
import Spinner from "./Spinner.jsx";


export default function ActorSearch(){

	const [movieQuery, setMovieQuery] = useState("");
	const [searchQuery, setSearchQuery] = useState("");
	const [movieInfoList, setMovieInfoList] = useState([]);
	const [loading, setLoading] = useState(false);


	const handleSearch = () => {		
		MovieAPI.getMovieList(movieQuery)
				.then((data) => {
					//console.log(data);
					let list = [];

					if ("results" in data["titleResults"]){
						let movieList = data["titleResults"]["results"];
						list.push(movieList);						
					}

					if ("results" in data["nameResults"]){
						let nameList = data["nameResults"]["results"];
						list.push(nameList);						
					}

					setLoading(false);
					setMovieInfoList(list);
					createMovieListComponent();
					
				}).catch((error) => {
					console.log(error);
				});
	};

	const resetValues = () => {
		setMovieInfoList(undefined);
		setLoading(false);
		setMovieQuery("");
		setSeachQuery("");
	}

	useEffect(()=>{
		if(searchQuery !== undefined && searchQuery !== ""){
			handleSearch();
		}
	},[searchQuery]);


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
			

	const createMovieListComponent = () => {
		if(loading == true){
			return <Spinner />;
		}else{
			let movieList = (loading === false && movieInfoList !== undefined && movieInfoList !== null && movieInfoList.length >= 1) ? movieInfoList[0] : [];
			let nameList = (loading === false && movieInfoList !== undefined && movieInfoList !== null && movieInfoList.length == 2) ? movieInfoList[1] : [];

			if(loading === false && movieInfoList !== undefined && movieInfoList !== null && movieInfoList.length > 0) {
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
	
	return(
		<Fragment>
			<h3>Using hook useEffect</h3>
			<form className="form-horizontal">
				<div className="form-group">
					<label for="inputmovie" className="col-sm-2 control-label">Search</label>
					<div className="col-sm-10">
						<input 	type="text" 
								className="form-control" 
								id="inputmovie" 
								placeholder="search" 
								value={movieQuery} 
								onChange={event => setMovieQuery(event.target.value)} />
					</div>
				</div>

				<div className="form-group">
					<div className="col-sm-offset-2 col-sm-10">
	      				<button type="button" 
	      						className="btn btn-primary" 
	      						onClick={() =>{      					
	      							setLoading(true);
	      							setSearchQuery(movieQuery);
	      							handleSearch(); 
	      						}}>Enter</button>
	      						&nbsp;
	      				<button type="button" 
	      					className="btn btn-default" 
	      					onClick={() => {
	      						resetValues();
	      					}}>Reset</button>
	    			</div>
				</div>
			</form>
			<hr/>
			{createMovieListComponent()}
		</Fragment>
	);
}