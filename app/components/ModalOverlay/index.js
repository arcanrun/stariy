//@flow
import React from 'react';
import { CSSTransition } from 'react-transition-group';

import style from './ModalOverlay.css';

type PROPS = {
  children: any,
  isVisible: boolean
};

export class ModalOverlay extends React.Component<PROPS, {}> {
  render() {
    const { children, isVisible } = this.props;
    return (
      <CSSTransition
        in={isVisible}
        timeout={300}
        classNames="modal"
        unmountOnExit
        mountOnEnter
      >
        <div className={style.overlay}>{children}</div>
      </CSSTransition>
    );
  }
}
