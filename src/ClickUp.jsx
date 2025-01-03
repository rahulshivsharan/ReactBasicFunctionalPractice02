'use strict';
import React, {Fragment, useReducer} from "react";


function ClickUp(){

	console.log("ClickUp Screen loaded");

	const initialObjectVal = {
		"count" : 0
	};

	const reducerFn = (count, action)=>{  
		if(action.type === "ADD_UP"){
			return {
				...state,
				"count" : action.current_count + 1
			}			
		}
		if(action.type === "RESET"){
			return {
				...state,
				"count" : 0
			}
		}	
		return count;
	}

	const [state, dispatch] = useReducer(reducerFn, initialObjectVal);

	return (
		<Fragment>
			<div>
				<button type="button" 
						className="btn btn-primary" 
						onClick={()=> {
							dispatch({
								"type" : "ADD_UP",
								"current_count" : state.count								
							}); 						
						}}>Click Up</button>
						&nbsp;
				<button type="button" 
						className="btn btn-primary" 
						onClick={()=> {
							dispatch({
								"type" : "RESET"
							}); 						
						}}>Reset</button>
			</div>
			<h3>{state.count}</h3>
		</Fragment>
	);
}

export default ClickUp;