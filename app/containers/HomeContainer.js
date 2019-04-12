// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Home } from '../components';
import { dbGetAll } from '../actions';

const mapStateToProps = (state: Object) => ({
  allData: state.airplanes.allData,
  isFetching: state.airplanes.isFetching,
  error: state.airplanes.error
});

export const HomeContainer = connect(
  mapStateToProps,
  { dbGetAll }
)(Home);
