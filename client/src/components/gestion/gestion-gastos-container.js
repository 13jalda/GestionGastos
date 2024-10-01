import React, { Component } from 'react';
import { TablaGastos } from './tabla-gastos';

export default class GestionGastosContainer extends Component {
  constructor(props){
      super(props);

  }

  render() {
    return (
      <div className='gestion-gastos-wrapper'>
        <h2>La gestion de gastos va a venir aqui</h2>
        
        <div className='two-colunm'>
          <TablaGastos />
        </div>

      </div>
    );
  }
}