import React, { Component } from 'react';


import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';

import './app.css'

export default class App extends Component {

	maxId = 100;

	state = {
		todoData: [
			{ label: 'Drink Coffee', important: false, id: 1, type: 's'},
			{ label: 'Make Awesome App', important: true, id: 2, type: 's'},
			{ label: 'Have a Lunch', important: false, id: 3, type: 's'}
		]
	};

	deleteItem = (id) => {
		this.setState(({ todoData }) => {
			const idx = todoData.findIndex((el) => el.id === id);

			const before = todoData.slice(0, idx);
			const after = todoData.slice(idx + 1);

			const newArray = [...before,...after];

			return {
				todoData: newArray
			}
		});
	};

	addItem = (text) => {
		const newItem = {
			label: text,
			important: false,
			id: this.maxId++
		};

		this.setState(({ todoData }) => {
			const newArr = [
				...todoData,
				newItem
			];

			return {
				todoData: newArr
			}
		});
	};

	onToggleImportant = (id) => {
		console.log('Toggle Important', id);
	};

	onToggleDone = (id) => {
		console.log('Toggle Done', id);
	};

	render() {
		return (
			<div className='todo-app'>
				<AppHeader toDo={1} done={3}/>
				<div className='top-panel d-flex'>
					<SearchPanel />
					<ItemStatusFilter />
				</div>
				<TodoList
					todos={this.state.todoData}
					onDeleted={ this.deleteItem }
					onToggleImportant={this.onToggleImportant}
					onToggleDone={this.onToggleDone}
				/>
				<ItemAddForm onItemAdded={this.addItem} />
			</div>
		);
	};
};