//@flow
import React from 'react';
import { connect } from 'react-redux';

import { Header } from '../components';
import { toggleMenu } from '../actions';

const mapStateToProps = (state: Object) => ({
  page: state.router.location.pathname
});

const HeaderContainer = connect(
  mapStateToProps,
  {
    toggleMenu
  }
)(Header);

export { HeaderContainer };
