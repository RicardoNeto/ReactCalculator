import React, { Component } from 'react';
//import logo from './logo.svg';
import calc from './calculator.svg';
import './App.css';

class Cell extends Component{
  render(){
    return(
      // <div className="column">{this.props.valor}</div>
      <input className="calcBox" value = {this.props.valor} onChange={this.props.onChange}/>
    );
  }
}

class Botao extends Component{
  render(){
    return(
      <button className={this.props.className} onClick={this.props.onClick}>
        {this.props.desc}
      </button>
    );
  }
}

class Calculadora extends Component {

  constructor(props){
    super(props);
    this.state={
      buttonValues: [0,1,2,3,4,5,6,7,8,9],
      valorBox: 0,
      valor1: 0,
      valor2: 0,
      operation: '',
      firstAfterOperation: false,
    }
  }

  handleClickOperation(op,e){
    this.setState({
      operation: op,
      valor1: this.state.valorBox,
      firstAfterOperation: true,
      renderReset: true,
    });
  }

  handleClickResultado(){
    let resultado = 0;
    switch(this.state.operation){
      case '+':
        resultado = Number(this.state.valor1 + this.state.valorBox);
        break;
      case '-':
        resultado = Number(this.state.valor1 - this.state.valorBox);
        break;
      case '*':
        resultado = Number(this.state.valor1 * this.state.valorBox);
        break;
      case '/':
        resultado = Number(this.state.valor1 / this.state.valorBox);
        break;
      default:
        break;
    }

    this.setState({
      operation: '',
      valor1: 0,
      valor2: 0,
      valorBox: resultado,
      firstAfterOperation: true,
      renderReset: true,
      
    });
  }

  handleClickReset(){
    this.setState({
      valor1: 0,
      valor2: 0,
      valorBox: 0,
      result: '',
      operation: '',
      renderReset: false,
    });
    
    console.log("valor1: " + this.state.valor1 + " valor2: " + this.state.valor2 + " valorBox: " + this.state.valorBox);
  }

  handleClickNumber(desc,e){
    if(this.state.firstAfterOperation===true){
      console.log("isTrue");
      this.setState({
        valorBox: desc,
        firstAfterOperation: false,        
      });
    }else if(this.state.valorBox<1000000){
      this.setState({
        valorBox: (this.state.valorBox * 10 + desc),        
      });
    }
  }

  shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  tick() {
    this.setState({
      buttonValues: this.shuffle(this.state.buttonValues),
    });
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      2000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  render(){
    return (
      <div>
        <div className="row">
          {/* <a>{this.state.operation}</a> */}
          <Cell key={0} valor={this.state.valorBox} onChange={evt => this.updateInputValue1(evt)}/>
          {/* <Cell key={1} valor={this.state.valor2} onChange={evt => this.updateInputValue2(evt)}/> */}
        </div>
        <div className="row">
          <Botao className="calcButtonUltraWide" desc="A/C" onClick={() => this.handleClickReset()}/>
          <Botao className="calcButtonOp" desc="/" onClick={(e) => this.handleClickOperation('/',e)}/>
        </div>
        <div className="row">
          <Botao className="calcButton" desc={this.state.buttonValues[0]} onClick={(e) => this.handleClickNumber(this.state.buttonValues[0],e)}/>
          <Botao className="calcButton" desc={this.state.buttonValues[1]} onClick={(e) => this.handleClickNumber(this.state.buttonValues[1],e)}/>
          <Botao className="calcButton" desc={this.state.buttonValues[2]} onClick={(e) => this.handleClickNumber(this.state.buttonValues[2],e)}/>
          <Botao className="calcButtonOp" desc="*" onClick={(e) => this.handleClickOperation('*',e)}/>
        </div>
        <div className="row">
          <Botao className="calcButton" desc={this.state.buttonValues[3]} onClick={(e) => this.handleClickNumber(this.state.buttonValues[3],e)}/>
          <Botao className="calcButton" desc={this.state.buttonValues[4]} onClick={(e) => this.handleClickNumber(this.state.buttonValues[4],e)}/>
          <Botao className="calcButton" desc={this.state.buttonValues[5]} onClick={(e) => this.handleClickNumber(this.state.buttonValues[5],e)}/>
          <Botao className="calcButtonOp" desc="-" onClick={(e) => this.handleClickOperation('-',e)}/>
        </div>
        <div className="row">
          <Botao className="calcButton" desc={this.state.buttonValues[6]} onClick={(e) => this.handleClickNumber(this.state.buttonValues[6],e)}/>
          <Botao className="calcButton" desc={this.state.buttonValues[7]} onClick={(e) => this.handleClickNumber(this.state.buttonValues[7],e)}/>
          <Botao className="calcButton" desc={this.state.buttonValues[8]} onClick={(e) => this.handleClickNumber(this.state.buttonValues[8],e)}/>
          <Botao className="calcButtonOp" desc="+" onClick={(e) => this.handleClickOperation('+',e)}/>
        </div>
        <div className="row">
          <Botao className="calcButtonUltraWide" desc={this.state.buttonValues[9]} onClick={(e) => this.handleClickNumber(this.state.buttonValues[9],e)}/>
          <Botao className="calcButton" desc="=" onClick={() => this.handleClickResultado()}/>
        </div>
        <div className="row">
          <a className="calcResult">{this.state.result}</a>
        </div>
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={calc} className="App-logo" alt="logo" />
          {/* <h1 className="App-title">Calculadora teste</h1> */}
        </header>
        <Calculadora />
        
      </div>
    );
  }
}

export default App;
