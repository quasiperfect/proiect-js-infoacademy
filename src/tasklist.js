'use strict';

/**
 * The model for the application
 */
class TaskList {
	localStorageKey = 'task-list';
	items = [];

	/**
	 * Start the loading process
	 */
	constructor() {
		this.load();
	}

	/**
	 * Load the data from the local storage
	 *
	 * @returns {TaskList}
	 */
	load() {
		const data = localStorage.getItem(this.localStorageKey);
		try {
			this.items = JSON.parse(data) || [];
			if (!Array.isArray(this.items)) {
				throw new Error('Invalid data: the task list is not an array');
			}
		}
		catch (e) {
			console.error(e);
			this.items = [];
		}
		return this;
	}

	/**
	 * Save the data to the local storage
	 * @returns {TaskList}
	 */
	save() {
		localStorage.setItem(this.localStorageKey, JSON.stringify(this.items));
		return this;
	}

	/**
	 * Add a new item to the list
	 *
	 * @param name
	 * @returns {TaskList}
	 */
	add(name) {
		const index = this.getUniqueIndex();

		const newIndex = {
			index, name, completed: false,
		};

		this.items = [...this.items, newIndex];

		this.save();
		return this;
	}

	/**
	 * Remove an item from the list
	 *
	 * @param index
	 * @returns {TaskList}
	 */
	remove(index) {
		this.items = this.items.filter(item => item.index != index);
		this.save();
		return this;
	}

	/**
	 * Mark an item as completed / not completed depending on the current state
	 *
	 * @param index
	 * @returns {TaskList}
	 */
	toggle(index) {
		this.items = this.items.map(item => {
			if (item.index != index) {
				return item;
			}

			return {
				...item, completed: !item.completed,
			};
		});

		this.save();

		return this;
	}

	/**
	 * Get a unique index for the new item
	 *
	 * @returns {number}
	 */
	getUniqueIndex() {
		const maxIndex = this.items.reduce((max, item) => Math.max(max, item.index), 0);
		return maxIndex + 1;
	}
}
