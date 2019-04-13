'use strict';

const Store = require('electron-store');

class DataStore extends Store {
  constructor(settings) {
    super(settings);

    // initialize with todos or empty array
    this.aviabases = this.get('aviabases') || [];
  }

  saveAsJson() {
    // save todos to JSON file
    this.set('aviabases', this.aviabases);

    // returning 'this' allows method chaining
    return this;
  }

  getAll() {
    // set object's todos to todos in JSON file
    this.aviabases = this.get('aviabases') || [];

    return this;
  }

  add(aviabase) {
    const forMerge = [aviabase];
    this.aviabases = [...this.aviabases, ...forMerge];

    return this.saveAsJson();
  }

  deleteItem(aviabase) {
    // filter out the target todo
    this.aviabases = this.aviabases.filter(t => t !== aviabase);

    return this.saveAsJson();
  }

  deleteAll() {
    this.delete('aviabases');
    return this;
  }
}

module.exports = DataStore;
