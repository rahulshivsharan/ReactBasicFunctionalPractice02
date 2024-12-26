'use strict';
import React, {useState, useEffect} from "react";
import * as dateFormat from "date-format";

function Timer(){

	console.log("Timer Screen loaded");

	const [time, setTime] = useState("00:00:00");

	useEffect(()=>{
		setTimeout(function(){
			let dateStr = dateFormat.asString("hh:mm:ss", new Date());
			setTime(dateStr);
		},1000);
	});

	return (
		<h2>The timer is : {time}</h2>
	);
}

export default Timer;