//@flow
import React from 'react';
import { CSSTransition } from 'react-transition-group';

import style from './DbControl.css';

type PROPS = {
  addNew: Function,
  closeModal: Function,
  isVisible: boolean
};
type STATE = {
  abTakeoff: ?string,
  abMiddle: ?string,
  abArrival: ?string,
  plane: ?string,
  x: ?number,
  y: ?number,
  l: ?number,
  errorInput: boolean
};

export class DbControl extends React.Component<PROPS, STATE> {
  state = {
    abTakeoff: undefined,
    abMiddle: undefined,
    abArrival: undefined,
    plane: undefined,
    x: undefined,
    y: undefined,
    l: undefined,
    errorInput: false
  };
  handleChange = (e: any) => {
    const type = e.target.dataset.type;
    const val = e.target.value;
    switch (type) {
      case 'abTakeoff':
        this.setState({ abTakeoff: val });
        break;
      case 'abMiddle':
        this.setState({ abMiddle: val });
        break;
      case 'abArrival':
        this.setState({ abArrival: val });
        break;
      case 'plane':
        this.setState({ plane: val });
        break;
      case 'x':
        this.setState({ x: val });
        break;

      case 'y':
        this.setState({ y: val });
        break;
      case 'l':
        this.setState({ l: val });
        break;
      default:
        console.log('---?---DbContol undefined input type');
        break;
    }
  };
  send = () => {
    const { abTakeoff, abMiddle, abArrival, plane, x, y, l } = this.state;
    if (abTakeoff && abMiddle && abArrival && plane && x && y && l) {
      this.setState({ errorInput: false });
      this.props.addNew(abTakeoff, abMiddle, abArrival, plane, x, y, l);
      this.props.closeModal();
    } else {
      this.setState({ errorInput: true });
    }
  };
  render() {
    const { closeModal, isVisible } = this.props;
    const { errorInput } = this.state;
    const footer = (
      <div className={style.footer}>
        <button className={style.btn} onClick={closeModal}>
          chanel
        </button>
        <button
          className={[style.btn, style.btnGreen].join(' ')}
          onClick={this.send}
        >
          ok
        </button>
      </div>
    );

    return (
      <CSSTransition
        in={isVisible}
        timeout={300}
        classNames="alert"
        mountOnEnter
        unmountOnExit
      >
        <div className={style.dbControl}>
          <div className={style.dbControlItem}>
            <span>Модель самолета</span>
            <input
              onChange={this.handleChange}
              data-type="plane"
              className={[
                errorInput ? style.dbControlInputError : '',
                style.dbControlInput
              ].join(' ')}
              type="text"
            />
          </div>
          <div className={style.dbControlItem}>
            <span>АБ взлета</span>
            <input
              onChange={this.handleChange}
              data-type="abTakeoff"
              className={[
                errorInput ? style.dbControlInputError : '',
                style.dbControlInput
              ].join(' ')}
              type="text"
            />
          </div>
          <div className={style.dbControlItem}>
            <span>АБ промежуточной посадки</span>
            <input
              onChange={this.handleChange}
              data-type="abMiddle"
              className={[
                errorInput ? style.dbControlInputError : '',
                style.dbControlInput
              ].join(' ')}
              type="text"
            />
          </div>
          <div className={style.dbControlItem}>
            <span>АБ прибытия</span>
            <input
              onChange={this.handleChange}
              data-type="abArrival"
              className={[
                errorInput ? style.dbControlInputError : '',
                style.dbControlInput
              ].join(' ')}
              type="text"
            />
          </div>

          <div className={style.dbControlItem}>
            <span>X</span>
            <input
              onChange={this.handleChange}
              data-type="x"
              className={[
                errorInput ? style.dbControlInputError : '',
                style.dbControlInput
              ].join(' ')}
              type="text"
            />
          </div>
          <div className={style.dbControlItem}>
            <span>Y</span>
            <input
              onChange={this.handleChange}
              data-type="y"
              className={[
                errorInput ? style.dbControlInputError : '',
                style.dbControlInput
              ].join(' ')}
              type="text"
            />
          </div>
          <div className={style.dbControlItem}>
            <span>L</span>
            <input
              onChange={this.handleChange}
              data-type="l"
              className={[
                errorInput ? style.dbControlInputError : '',
                style.dbControlInput
              ].join(' ')}
              type="text"
            />
          </div>

          {footer}
        </div>
      </CSSTransition>
    );
  }
}
