//@flow
import React from 'react';
import { ipcRenderer } from 'electron';
import Select from 'react-select';
import Map from 'react-offline-map';

import style from './Home.css';

type PROPS = {
  dbGetAll: Function,
  allData: Array<any>
};

type STATE = {
  allData: Array<any>,
  planes: Array<any>,
  abArrivals: Array<any>,
  abTakeoffs: []
};

class Home extends React.Component<PROPS, STATE> {
  state = {
    allData: [],
    planes: [],
    abArrivals: [],
    abTakeoffs: []
  };
  componentDidMount() {
    this.props.dbGetAll();
    const { allData } = this.props;
    this.setState({ allData: allData }, () => this.divider(this.state.allData));
  }
  componentDidUpdate(prevProps: Object, prevState: Object) {
    if (prevProps.allData !== this.props.allData) {
      const { allData } = this.props;
      this.setState({ allData: allData }, () =>
        this.divider(this.state.allData)
      );
    }

    if (prevState.planes !== this.state.planes) {
      this.divider(this.props.allData);
    }
  }
  divider = (data: Array<any>) => {
    const { planes, abArrivals, abTakeoffs } = this.state;
    data.forEach(el => {
      console.log('====>', el.plane);
      if (!planes.includes(el.plane))
        this.setState({ planes: [...planes, el.plane] });
      if (!abArrivals.includes(el.abArrival))
        this.setState({ abArrivals: [...abArrivals, el.abArrival] });
      if (!abTakeoffs.includes(el.abTakeoff))
        this.setState({ abTakeoffs: [...abTakeoffs, el.abTakeoff] });
    });
  };
  handleInputChange = (e: Object) => {
    console.log(e.value);
  };

  render() {
    const { allData, planes, abArrivals, abTakeoffs } = this.state;
    console.log(allData, '------>', this.state);
    const optionsPlanes = planes.map(el => ({ value: el, label: el }));
    const optionsAbArrivals = abArrivals.map(el => ({ value: el, label: el }));
    const optionsAbTakeoffs = abTakeoffs.map(el => ({ value: el, label: el }));
    const circles = [
      { lat: 32.1322, lng: -116.3452, r: 0.1, fill: 'red' },
      { lat: 32.1022, lng: -115.7452, r: 0.1, fill: 'red' },
      { lat: 32.2722, lng: -115.8252, r: 0.05, fill: 'red' }
    ];
    return (
      <div className={style.home}>
        <span>Самолет</span>
        <Select options={optionsPlanes} onChange={this.handleInputChange} />
        <span>АБ прибытия</span>
        <Select options={optionsAbArrivals} />
        <span>АБ Взлета</span>
        <Select options={optionsAbTakeoffs} />
        <div>
          <Map width={800} height={600} circles={circles} />
        </div>
      </div>
    );
  }
}

export { Home };
