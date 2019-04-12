//@flow
import React from 'react';
import { connect } from 'react-redux';

import { Header } from '../components';
import { toggleMenu } from '../actions';

const HeaderContainer = connect(
  null,
  {
    toggleMenu
  }
)(Header);

export { HeaderContainer };
