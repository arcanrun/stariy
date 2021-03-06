/* eslint-disable import/prefer-default-export */
// @flow
import React from 'react';
import { ipcRenderer } from 'electron';
import Select from 'react-select';
import { CSSTransition } from 'react-transition-group';

import style from './Home.css';
import { ResBlock } from '../index';
import {
  plusHoursToDate,
  minusHoursFromDate,
  convertDateTimeToString,
  fromatTojSDateTime
} from '../../timeHelper';

type STATE = {
  allData: Array<any>,
  optionsPlanes: Array<any>,
  optionsAbArrivals: Array<any>,
  optionsAbMiddles: Array<any>,
  orderTimeVal: ?string,
  flyTimeVal: ?string,
  abTakeoffVal: ?string,
  jetVal: ?Object,
  countJetVal: ?string,
  abArrivalVal: ?string,
  isMinimalDataComplete: boolean,
  isCalced: boolean,
  calculations: ?Object,
  optionFakeMap: ?ыtring
};

class Home extends React.Component<{}, STATE> {
  state = {
    allData: [],
    optionsPlanes: [],
    optionsAbArrivals: [],
    optionsAbMiddles: [],
    optionFakeMap: undefined,

    orderTimeVal: undefined,
    flyTimeVal: undefined,
    abTakeoffVal: undefined,
    jetVal: undefined,
    countJetVal: undefined,
    abArrivalVal: undefined,
    isMinimalDataComplete: false,
    isCalced: false,

    calculations: {}
  };

  componentDidMount() {
    const { allData } = this.state;
    ipcRenderer.send('get-all');
    ipcRenderer.on('all-data', (event, message) => {
      console.log('message-->', message);
      this.setState({ allData: message }, () =>
        console.log('from state-->', allData)
      );
    });
  }

  handleInputChangeAbTakeoff = (e: Object) => {
    const { value } = e;
    const { allData } = this.state;
    console.log('active-ab:', e);

    let activePlanes = [];
    let activeAbArivals = [];

    allData.forEach(el => {
      if (el.abTakeoff === value) {
        if (activePlanes.length === 0) {
          activePlanes = el.planes;
          activeAbArivals = el.abArrivalArray;
        } else {
          activePlanes.push(el.plane);
          activeAbArivals.push(el.abArrival);
        }
      }
    });
    const optionsPlanes = activePlanes.map(el => ({
      value: el.plane,
      label: el.plane,
      image: el.image,
      l: el.l
    }));
    const optionsAbArrivals = activeAbArivals.map(el => ({
      value: el.abArrival,
      label: el.abArrival,
      image: el.fakeMap,
      x: el.x,
      y: el.y,
      abMiddle: el.abMiddle
    }));

    this.setState(
      {
        abTakeoffVal: value,
        optionsPlanes,
        optionsAbArrivals
      },
      () => this.checkOnComplete()
    );
  };

  handleOrderTime = (e: Object) => {
    const val = e.target.value;
    this.setState({ orderTimeVal: val }, () => this.checkOnComplete());
  };

  handleflyTime = (e: Object) => {
    const val = e.target.value;
    this.setState({ flyTimeVal: val }, () => this.checkOnComplete());
  };

  hadleCountPlanes = (e: Object) => {
    const val = e.target.value;

    // this.setState({ countJetVal: val }, () => this.checkOnComplete());
    this.setState({ countJetVal: val }, () => this.checkOnComplete());
  };

  handleInputChangePlane = (e: Object) => {
    this.setState({ jetVal: e }, () => this.checkOnComplete());
  };

  handleInputChangeAbArrival = (e: Object) => {
    this.setState({ abArrivalVal: e }, () => this.checkOnComplete());
  };

  handleCalc = () => {
    // console.log(
    //   '--->HANDLE CLCIK',
    //   this.state.orderTimeVal,
    //   this.state.flyTimeVal
    // );
    const {
      jetVal,
      orderTimeVal,
      flyTimeVal,
      countJetVal,
      abTakeoffVal,
      abArrivalVal
    } = this.state;
    console.log(
      '%c CALCK: ',
      'background: pink; color: white',
      abArrivalVal,
      jetVal
    );
    const optionFakeMap = abArrivalVal.image;
    const Y = +abArrivalVal.y;
    const L = +jetVal.l;
    const X = +abArrivalVal.x;

    const abArrival = abArrivalVal.value;

    const flytTimePlusTwoHours = convertDateTimeToString(
      plusHoursToDate(orderTimeVal, 2)
    );
    const orderTimeMinusTwoHours = convertDateTimeToString(
      minusHoursFromDate(flyTimeVal, 2)
    );

    const orderTime = !orderTimeVal
      ? orderTimeMinusTwoHours
      : convertDateTimeToString(fromatTojSDateTime(orderTimeVal));

    const flyTime = !flyTimeVal
      ? flytTimePlusTwoHours
      : convertDateTimeToString(fromatTojSDateTime(flyTimeVal));

    const flyTimeForCalc = !flyTimeVal
      ? plusHoursToDate(orderTimeVal, 2)
      : flyTime;

    let landings = '';
    let middleTime = '';
    let timeArrival = '';
    const abTakeoff = abTakeoffVal;
    if (!flyTimeVal) {
      landings = convertDateTimeToString(plusHoursToDate(flyTimeForCalc, Y));
      middleTime = convertDateTimeToString(plusHoursToDate(flyTimeForCalc, X));

      timeArrival = convertDateTimeToString(plusHoursToDate(flyTimeForCalc, Y));
    } else {
      landings = convertDateTimeToString(plusHoursToDate(flyTimeVal, Y));
      middleTime = convertDateTimeToString(plusHoursToDate(flyTimeVal, X));

      timeArrival = convertDateTimeToString(plusHoursToDate(flyTimeVal, Y));
    }

    // console.log('!!!!!!====>', middleTime, landings);
    const newCalc = {
      plane: { plane: jetVal.value, image: jetVal.image },
      orderTime,
      flyTime,
      abMiddle: {
        name: abArrivalVal.abMiddle,
        x: abArrivalVal.x
      },
      landings,
      abArrival,
      combatPotential: countJetVal * L,
      duration: Y,
      abTakeoff,
      middleTime,
      timeArrival,
      optionFakeMap
    };
    console.log('%c calc---> ', 'background: green; color: white', newCalc);

    this.setState({ isCalced: true, calculations: newCalc });
  };

  checkOnComplete = () => {
    const {
      orderTimeVal,
      flyTimeVal,
      abTakeoffVal,
      jetVal,
      abArrivalVal,
      countJetVal
    } = this.state;
    console.log(
      '%c CHECK ON COMPLETE',
      'background: green; color: white',
      orderTimeVal,
      flyTimeVal,
      abTakeoffVal,
      jetVal,
      countJetVal,
      abArrivalVal
    );
    if (
      (orderTimeVal || flyTimeVal) &&
      (abTakeoffVal && jetVal && countJetVal && abArrivalVal)
    ) {
      this.setState({ isMinimalDataComplete: true });
    } else {
      this.setState({ isMinimalDataComplete: false, isCalced: false });
    }
  };

  render() {
    const {
      allData,
      optionsPlanes,
      optionsAbArrivals,
      isMinimalDataComplete,
      isCalced,
      calculations
    } = this.state;
    console.log('[ALL STATE]:', this.state);
    const optionsAbTakeoffs = allData.map(el => ({
      value: el.abTakeoff,
      label: el.abTakeoff
    }));
    const calcBlck = (
      <div className={style.calcBlck}>
        <button
          onClick={this.handleCalc}
          type="button"
          className={style.btnCalck}
        >
          расчет
        </button>
      </div>
    );
    return (
      <div className={style.HomeContainer}>
        <div className={style.home}>
          <div className={style.twoColumns}>
            <div className={style.inputContainer}>
              <div className={style.inputTitle}>
                <i className="far fa-clock" />
                <div>Время получения приказа</div>
              </div>
              <input
                onChange={this.handleOrderTime}
                className={style.input}
                type="datetime-local"
                placeholder="Type..."
              />
            </div>
            <div className={style.inputContainer}>
              <div className={style.inputTitle}>
                <i className="far fa-clock" />
                Время взлета самолетов
              </div>
              <input
                onChange={this.handleflyTime}
                className={style.input}
                type="datetime-local"
                placeholder="Type..."
              />
            </div>
          </div>

          <div>
            <div className={style.inputContainer}>
              <div className={style.inputTitle}>
                <i className="fas fa-plane-departure" />
                <span>АБ Взлета</span>
              </div>
              <Select
                options={optionsAbTakeoffs}
                onChange={this.handleInputChangeAbTakeoff}
              />
            </div>
            <div className={style.twoColumns}>
              <div className={style.inputContainer}>
                <div className={style.inputTitle}>
                  <i className="fas fa-fighter-jet" />
                  <span>Самолет</span>
                </div>
                <Select
                  onChange={this.handleInputChangePlane}
                  options={optionsPlanes}
                />
              </div>
              <div className={style.inputContainer}>
                <div className={style.inputTitle}>
                  <i className="fas fa-sort-numeric-down" />
                  <div>Количество самолетов</div>
                </div>
                <input
                  onChange={this.hadleCountPlanes}
                  className={style.input}
                  type="text"
                  placeholder="Type..."
                />
              </div>
            </div>
            <div className={style.inputContainer}>
              <div className={style.inputTitle}>
                <i className="fas fa-plane-arrival" />
                <span>АБ прибытия</span>
              </div>
              <Select
                onChange={this.handleInputChangeAbArrival}
                options={optionsAbArrivals}
              />
            </div>
          </div>

          <CSSTransition
            in={isMinimalDataComplete}
            unmountOnExit
            mountOnEnter
            classNames="alert"
            timeout={300}
          >
            {calcBlck}
          </CSSTransition>
        </div>
        <CSSTransition
          in={isCalced}
          unmountOnExit
          mountOnEnter
          classNames="alert"
          timeout={300}
        >
          <div className={style.home}>
            <ResBlock calc={calculations} />
          </div>
        </CSSTransition>
      </div>
    );
  }
}

export { Home };
