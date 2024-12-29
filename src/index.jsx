'use strict'

import $ from "jquery";
import React, {useState} from "react";
import {createRoot} from "react-dom/client";
import {Link, Routes, Route, BrowserRouter} from "react-router";

import Clock from "./Clock.jsx";
import Timer from "./Timer.jsx";
import TodoOne from "./TodoOne.jsx";
import CountMe from "./CountMe.jsx";
import ClickUp from "./ClickUp.jsx";
import DefaultScreen from "./DefaultScreen.jsx";
import MovieSearch from "./MovieSearch.jsx";


export default function App(){
	return (
		<BrowserRouter>		
			
				<div>
					<nav className="navbar navbar-default navbar-static-top">
							<div className="container-fluid">
								<div className="navbar-header">

									<button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
								        <span className="sr-only">Toggle navigation</span>
								        <span className="icon-bar"></span>
								        <span className="icon-bar"></span>
								        <span className="icon-bar"></span>
		      						</button>

									<a className="navbar-brand" href="javaScript:void(0)">Functional React</a>						
								</div>

								<div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
									<ul className="nav navbar-nav">
										<li className="dropdown">
								        	<a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span className="caret"></span></a>
								        	<ul className="dropdown-menu">						           
									           <li><Link to="/clock">Clock</Link></li>
									           <li><Link to="/timer">Timer</Link></li>
									           <li><Link to="/todo1">Todo One</Link></li>						           
									           <li><Link to="/clickup">Click Up</Link></li>
									           <li><Link to="/movie">Movie Search</Link></li>
								         	</ul>
								        </li>
									</ul>
								</div>
							</div>
					</nav>

					<div className="container">
						<div className="row">
							<div className="col-md-10">
								<Routes>
									<Route  path="/" element={<DefaultScreen />} />
									<Route  index element={<DefaultScreen />} />
									<Route  path="/clock" element={<Clock/>} />
									<Route  path="/timer" element={<Timer/>} />
									<Route  path="/todo1" element={<TodoOne/>} />
									<Route  path="/countme" element={<CountMe/>} />
									<Route  path="/clickup" element={<ClickUp/>} />
									<Route  path="/movie" element={<MovieSearch/>} />
								</Routes>
							</div>
						</div>				
					</div>
				</div>						
		</BrowserRouter>		
	);
}

$(document).ready(()=>{
	console.log("Document loaded..");
	const container = $("#root")[0];
	const root = createRoot(container);
	root.render(<App/>);
});
