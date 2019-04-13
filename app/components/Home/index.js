// @flow
import React from 'react';
import { ipcRenderer } from 'electron';
import Select from 'react-select';
import { CSSTransition } from 'react-transition-group';

import style from './Home.css';

type STATE = {
  allData: Array<any>,
  optionsPlanes: Array<any>,
  optionsAbArrivals: Array<any>,
  optionsAbMiddles: Array<any>,
  orderTimeVal: ?string,
  flyTimeVal: ?string,
  abTakeoffVal: ?string,
  jetVal: ?string,
  countJetVal: ?string,
  abArrivalVal: ?string,
  isMinimalDataComplete: boolean,
  isCalced: boolean
};

class Home extends React.Component<{}, STATE> {
  state = {
    allData: [],
    optionsPlanes: [],
    optionsAbArrivals: [],
    optionsAbMiddles: [],

    orderTimeVal: undefined,
    flyTimeVal: undefined,
    abTakeoffVal: undefined,
    jetVal: undefined,
    countJetVal: undefined,
    abArrivalVal: undefined,
    isMinimalDataComplete: false,
    isCalced: false
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
    console.log('active-ab:', value);
    // this.setState({ abTakeoffActive: value });
    let activePlanes = [];
    let activeAbArivals = [];
    let activeAbArivalsY = [];
    let activeAbMiddles = [];
    let activeAbMiddlesX = [];
    allData.forEach(el => {
      if (el.abTakeoff === value) {
        if (activePlanes.length === 0) {
          activePlanes = el.plane;
          activeAbArivals = el.abArrival;
          activeAbArivalsY = el.y;
          activeAbMiddles = el.abMiddle;
          activeAbMiddlesX = el.x;
        } else {
          activePlanes.push(el.plane);
          activeAbArivals.push(el.abArrival);
          activeAbArivalsY.push(el.y);
          activeAbMiddlesX.push(el.x);
        }
      }
    });
    const optionsPlanes = activePlanes.map(el => ({
      value: el.plane,
      label: el.plane,
      image: el.image
    }));

    const optionsAbArrivals = [
      {
        value: activeAbArivals,
        label: activeAbArivals,
        y: activeAbArivalsY
      }
    ];
    const optionsAbMiddles = [
      {
        value: activeAbMiddles,
        label: activeAbMiddles,
        x: activeAbMiddlesX
      }
    ];

    this.setState(
      {
        optionsPlanes,
        optionsAbArrivals,
        optionsAbMiddles,
        abTakeoffVal: e.value
      },
      () => this.checkOnComplete()
    );
  };

  handleOrderTime = (e: Object) => {
    const val = e.target.value;
    console.log(val);
    this.setState({ orderTimeVal: val }, () => this.checkOnComplete());
  };
  handleflyTime = (e: Object) => {
    const val = e.target.value;
    console.log(val);
    this.setState({ flyTimeVal: val }, () => this.checkOnComplete());
  };
  hadleCountPlanes = (e: Object) => {
    const val = e.target.value;
    console.log(val);
    this.setState({ countJetVal: val }, () => this.checkOnComplete());
  };
  handleInputChangePlane = (e: Object) => {
    console.log(e);
    this.setState({ jetVal: e }, () => this.checkOnComplete());
  };

  handleInputChangeAbArrival = (e: Object) => {
    console.log('=======<', e);
    this.setState({ abArrivalVal: e.value }, () => this.checkOnComplete());
  };
  handleCalc = () => {
    console.log(this.state);
  };

  checkOnComplete = () => {
    const {
      orderTimeVal,
      flyTimeVal,
      abTakeoffVal,
      jetVal,
      countJetVal,
      abArrivalVal
    } = this.state;
    if (
      (orderTimeVal || flyTimeVal) &&
      (abTakeoffVal && jetVal && countJetVal)
    ) {
      this.setState({ isMinimalDataComplete: true });
    } else {
      this.setState({ isMinimalDataComplete: false });
    }
  };

  render() {
    const {
      allData,
      optionsPlanes,
      optionsAbArrivals,
      optionsAbMiddles,
      isMinimalDataComplete,
      isCalced
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
          рассчет
        </button>
      </div>
    );
    return (
      <div className={style.HomeContainer}>
        <div className={style.home}>
          <div className={style.twoColumns}>
            <div className={style.inputContainer}>
              <div className={style.inputTitle}>
                <i class="far fa-clock" />
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
                <i class="far fa-clock" />
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
                <i class="fas fa-plane-departure" />
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
                  <i class="fas fa-fighter-jet" />
                  <span>Самолет</span>
                </div>
                <Select
                  onChange={this.handleInputChangePlane}
                  options={optionsPlanes}
                />
              </div>
              <div className={style.inputContainer}>
                <div className={style.inputTitle}>
                  <i class="fas fa-sort-numeric-down" />
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
                <i class="fas fa-plane-arrival" />
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
            classNames={'alert'}
            timeout={300}
          >
            {calcBlck}
          </CSSTransition>
        </div>
        <CSSTransition
          in={true}
          unmountOnExit
          mountOnEnter
          classNames={'alert'}
          timeout={300}
        >
          <div className={style.home}>calc</div>
        </CSSTransition>
      </div>
    );
  }
}

export { Home };
