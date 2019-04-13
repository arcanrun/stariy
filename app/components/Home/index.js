// @flow
import React from 'react';
import { ipcRenderer } from 'electron';
import Select from 'react-select';
import Map from 'react-offline-map';

import style from './Home.css';

type STATE = {
  allData: Array<any>,
  optionsPlanes: Array<any>,
  optionsAbArrivals: Array<any>,
  optionsAbMiddles: Array<any>
};

class Home extends React.Component<{}, STATE> {
  state = {
    allData: [],
    optionsPlanes: [],
    optionsAbArrivals: [],
    optionsAbMiddles: []
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

    this.setState({
      optionsPlanes,
      optionsAbArrivals,
      optionsAbMiddles
    });
  };

  handleInputChangePlane = (e: Object) => {
    console.log(e.value);
  };

  handleInputChangeAbArrival = (e: Object) => {
    console.log(e.value);
  };

  render() {
    const {
      allData,
      optionsPlanes,
      optionsAbArrivals,
      optionsAbMiddles
    } = this.state;
    console.log('[-optionsAbMiddles]:', optionsAbMiddles);
    const optionsAbTakeoffs = allData.map(el => ({
      value: el.abTakeoff,
      label: el.abTakeoff
    }));

    return (
      <div className={style.home}>
        <div>
          <span>АБ Взлета</span>
          <Select
            options={optionsAbTakeoffs}
            onChange={this.handleInputChangeAbTakeoff}
          />
          <span>Самолет</span>
          <Select
            onChange={this.handleInputChangePlane}
            options={optionsPlanes}
          />
          <span>АБ прибытия</span>
          <Select
            onChange={this.handleInputChangeAbArrival}
            options={optionsAbArrivals}
          />
        </div>
      </div>
    );
  }
}

export { Home };
