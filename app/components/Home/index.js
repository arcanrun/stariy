//@flow
import React from 'react';
import { ipcRenderer } from 'electron';

import style from './Home.css';

type PROPS = {
  dbGetAll: Function,
  allData: Array<any>
};

type STATE = {
  allData: Array<any>
};

class Home extends React.Component<PROPS, STATE> {
  state = {
    allData: []
  };
  componentDidMount() {
    this.props.dbGetAll();
    const { allData } = this.props;
    this.setState({ allData: allData });
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.allData !== this.props.allData) {
      const { allData } = this.props;
      this.setState({ allData: allData });
    }
  }
  render() {
    const { allData } = this.state;
    console.log(allData);
    return (
      <div className={style.home}>
        <h1>
          {allData.map((el, i) => (
            <div key={i}>{el.plane}</div>
          ))}
        </h1>
      </div>
    );
  }
}

export { Home };
