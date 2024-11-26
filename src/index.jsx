'use strict'

import $ from "jquery";
import React, {useState} from "react";
import {createRoot} from "react-dom/client";
import Clock from "./Clock.jsx";
import Timer from "./Timer.jsx";


const TITLE = "Hello Clock Application";


function App(){
	return (
		<div className="container">			
			<h1>{TITLE}</h1>			
			<hr/>
			<Clock />
			<hr/>
			<Timer />
		</div>
	);
}

$(document).ready(()=>{
	console.log("Document loaded..");
	const container = $("#root")[0];
	const root = createRoot(container);
	root.render(<App/>);
});
