'use strict';
import React, {useState, useEffect} from "react";

export default function DefaultScreen(){
	const [title, setTitle] = useState("Trying React Functional, using hooks");
	console.log("Default Screen loaded");
	return(
		<div className="jumbotron jumbotron-fluid">
			<h1 className="display-4">{title}</h1>
		</div>	
	);
}