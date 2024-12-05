'use strict';
import React, {useState, useEffect, useReducer} from "react";


function CountMe(){

	const [count, setCount] = useState(0);

	return (
		<>
			<div>
				<button type="button" className="btn btn-primary" onClick={()=> setCount(count + 1)}>Add Up</button>
			</div>
			<h3>{count}</h3>
		</>
	);
}

export default CountMe;