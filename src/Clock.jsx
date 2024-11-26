'use strict';
import React, {useEffect, useReducer} from "react";
import * as dateFormat from "date-format";

function Clock(){

	var reducerLogic = function(){
		return dateFormat.asString("hh:mm:ss", new Date());
	}

	const [dateStr , dispatch] = useReducer(reducerLogic, "00:00:00");

	useEffect(()=>{
		const tick = setInterval(dispatch,1000);
		console.log(" tick ");
	},[]);

	return (
		<h2>The time is : {dateStr}</h2>
	);
}

export default Clock;