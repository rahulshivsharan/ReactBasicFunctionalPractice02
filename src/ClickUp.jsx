'use strict';
import React, {useState, useEffect, useReducer} from "react";


function ClickUp(){

	console.log("ClickUp Screen loaded");

	const [count, dispatch] = useReducer((count, action)=>{  // useReducer(reducerFunctionLogic, IntialState)
		if(action.type === "ADD_UP"){
			count += 1;			
		}
		if(action.type === "RESET"){
			count = 0;
		}	
		return count;
	}, 0);

	const handleClick = (count)=>{
		dispatch({"type" : "ADD_UP"}); // dispatch even object
	}

	const resetCount = (count)=>{
		dispatch({"type" : "RESET"}); // dispatch even object
	}

	return (
		<>
			<div>
				<button type="button" className="btn btn-primary" onClick={()=> handleClick(count)}>Click Up</button>&nbsp;
				<button type="button" className="btn btn-primary" onClick={()=> resetCount(count)}>Reset</button>
			</div>
			<h3>{count}</h3>
		</>
	);
}

export default ClickUp;