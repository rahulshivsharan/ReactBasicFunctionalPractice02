'use strict';
import React, {Fragment, useEffect, useState} from "react";


function ClickToIncrease(){

	console.log("ClickUp Screen loaded");

	const [count, setCount] = useState(0);
	const [timeToIncrease, setTimeToIncrease] = useState(undefined);

	useEffect(()=>{
		if(timeToIncrease === undefined) {
			setCount(0)
		}else {
			setCount(count + 1);
		} 
	},[timeToIncrease]);
	
	return (
		<Fragment>
			<div>
				<button type="button" 
						className="btn btn-primary" 
						onClick={()=> {
							setTimeToIncrease(new Date);						
						}}>Click Up</button>
						&nbsp;
				<button type="button" 
						className="btn btn-primary" 
						onClick={()=> {
							setTimeToIncrease(undefined);		
						}}>Reset</button>
			</div>
			<h3>{count}</h3>
		</Fragment>
	);
}

export default ClickToIncrease;