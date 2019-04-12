//@flow
import React from 'react';
import { CSSTransition } from 'react-transition-group';
import { ipcRenderer } from 'electron';

import style from './DataBase.css';
import { DbControl, ModalOverlay } from '../index';
import { string } from 'postcss-selector-parser';

type STATE = {
  isModalVisible: boolean,
  allData: Array<any>
};

export class DataBase extends React.Component<{}, STATE> {
  state = {
    isModalVisible: false,
    allData: []
  };
  componentDidMount() {
    ipcRenderer.send('get-all');
    ipcRenderer.on('all-data', (event, message) => {
      this.setState({ allData: message });
    });
  }

  showModal = () => {
    const { isModalVisible } = this.state;
    this.setState({ isModalVisible: !isModalVisible });
  };
  addNew = (
    abTakeoff: string,
    abMiddle: string,
    abArrival: string,
    plane: string,
    x: number,
    y: number,
    l: number
  ) => {
    const data = {
      abTakeoff,
      abMiddle,
      abArrival,
      plane,
      x,
      y,
      l
    };
    ipcRenderer.send('add-to-bd', data);
  };
  closeModal = () => {
    const { isModalVisible } = this.state;
    this.setState({ isModalVisible: !isModalVisible });
  };
  render() {
    const { isModalVisible, allData } = this.state;
    const modalAddNewValue = (
      <ModalOverlay isVisible={isModalVisible}>
        <DbControl
          closeModal={this.closeModal}
          isVisible={isModalVisible}
          addNew={this.addNew}
        />
      </ModalOverlay>
    );
    const modalControlBlock = (
      <div className={style.modalControlBlock}>
        <button onClick={this.showModal}>Новая запись</button>
        <button>Добавить к записи</button>
        <button>Удалить базу данных</button>
      </div>
    );
    return (
      <div className={style.dataBasePage}>
        {modalAddNewValue}
        {modalControlBlock}
        {allData.map((el, i) => (
          <div key={i}>
            <span>{el.abArrival}-</span>
            <span>{el.abMiddle}-</span>
            <span>{el.abTakeoff}-</span>
            <span>{el.plane}-</span>
            <span>{el.x}-</span>
            <span>{el.y}-</span>
            <span>{el.l}-</span>
          </div>
        ))}
      </div>
    );
  }
}
