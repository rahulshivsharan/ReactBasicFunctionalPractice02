'use strict';
import React, {useState, useEffect, useReducer} from "react";


const initialTodoList = [
	{ "id" : 1, "title" : "Apple", "selected" : false},
	{ "id" : 2, "title" : "Oranges", "selected" : false}
];

// reducer function
const redoTodoItems = (todoItemList, action) => {
	switch(action.type){
		case "SELECTED":
			return todoItemList.map((todoItem)=>{
				if(todoItem.id === action.id){
					todoItem.selected = (todoItem.selected === false) ? true : false;
				}
				return 	todoItem;
			});
		default: 
			return todoItemList;
	}
}

function TodoOne(){
	console.log("TodoOne Componnt");

	const [todoList, dispatch] = useReducer(redoTodoItems, initialTodoList);	


	const handleSelect = (todoObject) => {

		dispatch({
			"type" : "SELECTED",
			id : todoObject.id 
		});
	};

	

	return (
		<>
			{todoList.map((todoItem) => (
				<div key={todoItem.id} className="checkbox">
					<label><input type="checkbox" checked={todoItem.selected} onChange={()=> {
						handleSelect(todoItem);	 	
					}} />{todoItem.title}</label>
				</div>				
			))}
			<div>
				<ul>
					{todoList.map((todoItem) => {

						if(todoItem.selected === true){
							return <li key={todoItem.id}>{todoItem.title}</li>
						}
										
					})}
				</ul>
			</div>
		</>
	);
}

export default TodoOne;