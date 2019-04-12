'use strict';

const Store = require('electron-store');

class DataStore extends Store {
  constructor(settings) {
    super(settings);

    // initialize with todos or empty array
    this.airbases = this.get('airbases') || [];
  }

  saveAsJson() {
    // save todos to JSON file
    this.set('airbases', this.airbases);

    // returning 'this' allows method chaining
    return this;
  }

  getAll() {
    // set object's todos to todos in JSON file
    this.airbases = this.get('airbases') || [];

    return this;
  }

  add(airbase) {
    // merge the existing todos with the new todo
    this.airbases = [...this.airbases, airbase];

    return this.saveAsJson();
  }

  deleteTodo(todo) {
    // filter out the target todo
    this.airbases = this.airbases.filter(t => t !== todo);

    return this.saveAsJson();
  }
}

module.exports = DataStore;
