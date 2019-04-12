//@flow
import React from 'react';
import { connect } from 'react-redux';

import { Menu } from '../components';
import { toggleMenu } from '../actions';

const mapStateToProps = (state: Object) => ({
  isVisible: state.menu.isVisible
});

export const MenuContainer = connect(
  mapStateToProps,
  { toggleMenu }
)(Menu);
