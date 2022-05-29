'use strict';

/**
 * The controller/view for the task manager application.
 */
class TaskManager {
	templateElement;
	containerElement;
	listElement;
	inputText;
	addButton;
	model;

	/**
	 * Check if we have the needed elements and add event listeners.
	 *
	 * @param idContainer
	 * @param idTemplate
	 */
	constructor(idContainer, idTemplate) {
		//check if we have the template present
		this.templateElement = document.getElementById(idTemplate);
		if (!this.templateElement) {
			let message = "I can't find the template with the id : " + idTemplate + ". Please add it to the html structure and retry";
			alert(message);
			throw new Error(message);
		}

		//check if we have the container present
		this.containerElement = document.getElementById(idContainer);
		if (!this.containerElement) {
			let message = "I can't find the container with the id :" + idContainer + ". Please add it to the html structure and retry";
			alert(message);
			throw new Error(message);
		}

		//check if we have the list container present
		this.listElement = this.containerElement.querySelector('.task-list');
		if (!this.listElement) {
			let message = "I can't find the task list with class 'task-list' inside the container with the id :" + idContainer + ". Please add it to the html structure and retry";
			alert(message);
			throw new Error(message);
		}

		//check if we have the input present
		this.inputText = this.containerElement.querySelector('input.text');
		if (!this.inputText) {
			let message = "I can't find the task input with class 'text' inside the container with the id :" + idContainer + ". Please add it to the html structure and retry";
			alert(message);
			throw new Error(message);
		}

		//check if we have the add button present
		this.addButton = this.containerElement.querySelector('button.add');
		if (!this.addButton) {
			let message = "I can't find the task add button with class 'add' inside the container with the id :" + idContainer + ". Please add it to the html structure and retry";
			alert(message);
			throw new Error(message);
		}

		//init the model and display the list
		this.model = new TaskList();
		this.displayList();

		// add event listeners

		// add event listener for the add button
		this.addButton.addEventListener('click', this.addItem.bind(this));

		// add event listener for the input on enter
		this.inputText.addEventListener('keypress', e => {
			if (e.key === "Enter") {
				this.addItem(e);
			}
		});

		// add event listener for the list delete button, and toggle
		document.addEventListener('click', e => {
			if (e.target.matches('.delete')) {
				//prevent page refresh
				e.preventDefault();

				//get the element for the index
				const item = e.target.closest('.task');

				//remove the item
				this.model.remove(item.dataset.index);

				// display the updated list
				this.displayList();
			}

			if (e.target.matches('.title')) {
				//get the element for the index
				const item = e.target.closest('.task');

				//toggle the item
				this.model.toggle(item.dataset.index);

				// display the updated list
				this.displayList();
			}
		});
	}

	/**
	 * Display the list of items.
	 *
	 * @returns {TaskManager}
	 */
	displayList() {

		// clear the list
		this.listElement.textContent = '';

		// display the list
		this.model.items.forEach(item => {
			const itemElement = this.displayItem(item);
			this.listElement.appendChild(itemElement);
		});

		return this;
	}

	/**
	 * Display an item.
	 *
	 * @param item
	 * @returns {Node}
	 */
	displayItem(item) {
		//clone the template
		const content = this.templateElement.content.cloneNode(true);

		//set the text
		const title = content.querySelector('.title');
		if (title) {
			title.textContent = item.name;
		}

		//set the index
		const itemWrapper = content.querySelector('.task');
		itemWrapper.dataset.index = item.index;

		//mark the item as done
		if (item.completed) {
			itemWrapper.classList.add('done');
		}

		return content;
	}

	/**
	 * Add an item to the list.
	 *
	 * @param e
	 */
	addItem(e) {
		// prevent page refresh
		e.preventDefault();

		// make sure we have a value
		const value = this.inputText.value.trim();
		if (!value.length) {
			alert('Please add a descriptive title for you task');
			return;
		}

		// add to the list
		this.model.add(value);

		// display the updated list
		this.displayList();

		// clear the input
		this.inputText.value = '';

		return this;
	}
}
