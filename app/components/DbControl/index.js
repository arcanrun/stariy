/* eslint-disable react/button-has-type */
/* eslint-disable import/prefer-default-export */
// @flow
import React from 'react';
import { CSSTransition } from 'react-transition-group';
import fs from 'fs';

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
  image: ?string,
  fakeMap: ?string,
  planes: Array<Object>,
  abArrivalArray: Array<Object>,
  x: ?number,
  y: ?number,
  l: ?number,
  errorInput: boolean,
  errorInputPlane: boolean,
  errorInputAbArival: boolean
};

export class DbControl extends React.Component<PROPS, STATE> {
  state = {
    abTakeoff: undefined,
    abMiddle: undefined,
    abArrival: undefined,
    plane: undefined,
    image: undefined,
    fakeMap: undefined,
    planes: [],
    abArrivalArray: [],
    x: undefined,
    y: undefined,
    l: undefined,
    errorInput: false,
    errorInputPlane: false,
    errorInputAbArival: false
  };

  handleChange = (e: any) => {
    const { target } = e;
    console.log(target);
    const { type } = e.target.dataset;
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

      case 'x':
        this.setState({ x: val });
        break;

      case 'y':
        this.setState({ y: val });
        break;
      case 'plane':
        this.setState({ plane: val });
        break;
      case 'l':
        this.setState({ l: val });
        break;
      case 'image':
        const { path } = target.files[0];
        console.log('>>>>>>>', path);
        // const data = fs.readFileSync(val);
        // console.log('Synchronous read: ' + data.toString());
        this.setState({ image: path });
        break;
      case 'fake-map':
        const pathFakeMap = target.files[0].path;
        console.log('>>>>>>>', pathFakeMap);
        // const data = fs.readFileSync(val);
        // console.log('Synchronous read: ' + data.toString());
        this.setState({ fakeMap: pathFakeMap });
        break;
      default:
        console.log('[DbContol]: undefined input type');
        break;
    }
  };

  handleAbArival = () => {
    const { fakeMap, abArrival, abMiddle, x, y } = this.state;
    if (fakeMap && abArrival && x && y && abMiddle) {
      const planeObject = [
        {
          abArrival,
          fakeMap,
          abMiddle,
          x,
          y
        }
      ];

      this.setState(
        {
          abArrivalArray: [...this.state.abArrivalArray, ...planeObject],
          errorInputAbArival: false
        },
        () => console.log(this.state.abArrivalArray)
      );
    } else {
      this.setState({ errorInputAbArival: true });
    }
  };

  handlePlanes = () => {
    const { plane, l, image } = this.state;
    if (plane && l && image) {
      const planeObject = [
        {
          plane,
          l,
          image
        }
      ];

      this.setState(
        {
          planes: [...this.state.planes, ...planeObject],
          errorInputPlane: false
        },
        () => console.log(this.state.planes)
      );
    } else {
      this.setState({ errorInputPlane: true });
    }
  };

  send = () => {
    const { abTakeoff, abArrivalArray, planes } = this.state;
    if (abTakeoff && abArrivalArray.length !== 0 && planes.length !== 0) {
      this.setState({ errorInput: false });
      this.props.addNew(abTakeoff, abArrivalArray, planes);
      this.props.closeModal();
    } else {
      this.setState({ errorInput: true });
    }
  };

  render() {
    const { closeModal, isVisible } = this.props;
    const {
      errorInput,
      planes,
      abArrivalArray,
      errorInputPlane,
      errorInputAbArival,
      plane,
      image,
      l
    } = this.state;
    const nameOfPlanes = planes.map(el => el.plane);
    const nameOfAbArivals = abArrivalArray.map(el => el.abArrival);
    const footer = (
      <div className={style.footer}>
        <button className={style.btn} onClick={closeModal}>
          chanel
        </button>
        <button
          className={[style.btn, style.btnAlert].join(' ')}
          onClick={this.send}
        >
          ok
        </button>
      </div>
    );
    const planeBtnControl = (
      <div className={style.planeBtnControl}>
        <button onClick={this.handlePlanes}>Добавить</button>
      </div>
    );
    const abArivalBtnControl = (
      <div className={style.planeBtnControl}>
        <button onClick={this.handleAbArival}>Добавить</button>
      </div>
    );

    const aviaBaseControlArival = (
      <div className={style.aviaBaseControl}>
        <div className={style.dbControlItem}>
          <span>АБ прибытия</span>
          <input
            onChange={this.handleChange}
            data-type="abArrival"
            className={[
              errorInputAbArival ? style.dbControlInputError : '',
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
              errorInputAbArival ? style.dbControlInputError : '',
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
              errorInputAbArival ? style.dbControlInputError : '',
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
              errorInputAbArival ? style.dbControlInputError : '',
              style.dbControlInput
            ].join(' ')}
            type="text"
          />
        </div>
        <div className={style.dbControlItem}>
          <span>...</span>
          <input
            onChange={this.handleChange}
            data-type="fake-map"
            className={[
              errorInputAbArival ? style.dbControlInputError : '',
              style.dbControlInput
            ].join(' ')}
            type="file"
          />
        </div>
        {abArivalBtnControl}
      </div>
    );
    const aviaBaseControlTakeoff = (
      <div className={style.aviaBaseControl}>
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
          <span>Модели самоелтов</span>
          <input
            onChange={this.handleChange}
            value={nameOfPlanes}
            data-type="allPlanes"
            className={[
              errorInput ? style.dbControlInputError : '',
              style.dbControlInput
            ].join(' ')}
            type="text"
          />
        </div>
        <div className={style.dbControlItem}>
          <span>Авиабазы прибытия</span>
          <input
            onChange={this.handleChange}
            value={nameOfAbArivals}
            data-type="abArrivalArray"
            className={[
              errorInput ? style.dbControlInputError : '',
              style.dbControlInput
            ].join(' ')}
            type="text"
          />
        </div>
      </div>
    );

    const planeControl = (
      <div className={style.planeControl}>
        <div className={style.dbControlItem}>
          <span>Модель самолета</span>
          <input
            onChange={this.handleChange}
            data-type="plane"
            className={[
              errorInputPlane ? style.dbControlInputError : '',
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
              errorInputPlane ? style.dbControlInputError : '',
              style.dbControlInput
            ].join(' ')}
            type="text"
          />
          <div className={style.dbControlItem}>
            <span>Изображение</span>
            <input
              onChange={this.handleChange}
              data-type="image"
              className={[
                errorInputPlane ? style.dbControlInputError : '',
                style.dbControlInput
              ].join(' ')}
              type="file"
            />
          </div>
        </div>
        {planeBtnControl}
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
          <div className={style.avaiaAndPlane}>
            {aviaBaseControlTakeoff}
            {planeControl}
            {aviaBaseControlArival}
          </div>
          {footer}
        </div>
      </CSSTransition>
    );
  }
}
