'use strict';

const Store = require('electron-store');

class DataStore extends Store {
  constructor(settings) {
    super(settings);

    // initialize with todos or empty array
    this.airplanes = this.get('airplanes') || [];
  }

  saveAsJson() {
    // save todos to JSON file
    this.set('airplanes', this.airplanes);

    // returning 'this' allows method chaining
    return this;
  }

  getAll() {
    // set object's todos to todos in JSON file
    this.airplanes = this.get('airplanes') || [];

    return this;
  }

  add(airplane) {
    // merge the existing todos with the new todo
    this.airplanes = [...this.airplanes, airplane];

    return this.saveAsJson();
  }

  deleteItem(airplane) {
    // filter out the target todo
    this.airplanes = this.airplanes.filter(t => t !== airplane);

    return this.saveAsJson();
  }

  deleteAll() {
    this.delete('airplanes');
    return this;
  }
}

module.exports = DataStore;
