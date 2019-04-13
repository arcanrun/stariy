// @flow
import React from 'react';
import { ipcRenderer } from 'electron';
import Select from 'react-select';
import Map from 'react-offline-map';

import style from './Home.css';

type STATE = {
  allData: Array<any>,
  optionsPlanes: Array<any>,
  optionsAbArrivals: ?Object
};

class Home extends React.Component<{}, STATE> {
  state = {
    allData: [],
    optionsPlanes: [],
    optionsAbArrivals: undefined
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
    allData.forEach(el => {
      if (el.abTakeoff === value) {
        if (activePlanes.length === 0) {
          activePlanes = el.plane;
          activeAbArivals = el.abArrival;
        } else {
          activePlanes.push(el.plane);
          activeAbArivals.push(el.abArrival);
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
        label: activeAbArivals
      }
    ];
    console.log('[optionsPlanes]:', optionsPlanes);
    console.log('[optionsAbArrivals]:', optionsAbArrivals);

    this.setState({
      optionsPlanes,
      optionsAbArrivals
    });
  };

  handleInputChangePlane = (e: Object) => {
    console.log(e.value);
  };

  handleInputChangeAbArrival = (e: Object) => {
    console.log(e.value);
  };

  render() {
    const { allData, optionsPlanes, optionsAbArrivals } = this.state;
    console.log(allData, '------>', this.state);

    const optionsAbTakeoffs = allData.map(el => ({
      value: el.abTakeoff,
      label: el.abTakeoff
    }));
    console.log('=========+>', optionsAbTakeoffs);

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
