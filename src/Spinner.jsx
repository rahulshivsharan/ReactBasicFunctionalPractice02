'use strict';
import React, {useState} from "react";

export default function Spinner(){
	
	const [imageUrl, setImageUrl] = useState("asset/Fountain.gif");
	
	return (
		<div>
			<img src={imageUrl} alt="spinner" />
		</div>
	);
} 