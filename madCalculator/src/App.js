import React, { Component } from 'react';
//import logo from './logo.svg';
import calc from './calculator.svg';
import './App.css';

class Cell extends Component{
  render(){
    return(
      // <div className="column">{this.props.valor}</div>
      <input className="calcBox" value = {this.props.valor} disabled/>
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

class ButtonPallet extends Component {
  constructor(props){
    super(props);
    this.state={
      buttonValues: [0,1,2,3,4,5,6,7,8,9],
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
      this.props.timing
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  render(){
    return(
      <div>
        <div className="row">
          <Botao className="calcButtonUltraWide" desc="A/C" onClick={() => this.props.handleClickReset()}/>
          <Botao className="calcButtonOp" desc="/" onClick={(e) => this.props.handleClickOperation('/',e)}/>
        </div>
        <div className="row">
          <Botao className="calcButton" desc={this.state.buttonValues[0]} onClick={(e) => this.props.handleClickNumber(this.state.buttonValues[0],e)}/>
          <Botao className="calcButton" desc={this.state.buttonValues[1]} onClick={(e) => this.props.handleClickNumber(this.state.buttonValues[1],e)}/>
          <Botao className="calcButton" desc={this.state.buttonValues[2]} onClick={(e) => this.props.handleClickNumber(this.state.buttonValues[2],e)}/>
          <Botao className="calcButtonOp" desc="*" onClick={(e) => this.props.handleClickOperation('*',e)}/>
        </div>
        <div className="row">
          <Botao className="calcButton" desc={this.state.buttonValues[3]} onClick={(e) => this.props.handleClickNumber(this.state.buttonValues[3],e)}/>
          <Botao className="calcButton" desc={this.state.buttonValues[4]} onClick={(e) => this.props.handleClickNumber(this.state.buttonValues[4],e)}/>
          <Botao className="calcButton" desc={this.state.buttonValues[5]} onClick={(e) => this.props.handleClickNumber(this.state.buttonValues[5],e)}/>
          <Botao className="calcButtonOp" desc="-" onClick={(e) => this.props.handleClickOperation('-',e)}/>
        </div>
        <div className="row">
          <Botao className="calcButton" desc={this.state.buttonValues[6]} onClick={(e) => this.props.handleClickNumber(this.state.buttonValues[6],e)}/>
          <Botao className="calcButton" desc={this.state.buttonValues[7]} onClick={(e) => this.props.handleClickNumber(this.state.buttonValues[7],e)}/>
          <Botao className="calcButton" desc={this.state.buttonValues[8]} onClick={(e) => this.props.handleClickNumber(this.state.buttonValues[8],e)}/>
          <Botao className="calcButtonOp" desc="+" onClick={(e) => this.props.handleClickOperation('+',e)}/>
        </div>
        <div className="row">
          <Botao className="calcButtonUltraWide" desc={this.state.buttonValues[9]} onClick={(e) => this.props.handleClickNumber(this.state.buttonValues[9],e)}/>
          <Botao className="calcButton" desc="=" onClick={() => this.props.handleClickResultado()}/>
        </div>
      </div>
    );
    
  }

}

class Calculadora extends Component {

  constructor(props){
    super(props);
    this.state={
      valorBox: 0,
      valor1: 0,
      valor2: 0,
      operation: '',
      firstAfterOperation: false,
      shuffleTiming:500,
      //ADICIONAR SLIDER
    }
    this.handleClickNumber = this.handleClickNumber.bind(this);
    this.handleClickOperation = this.handleClickOperation.bind(this);
    this.handleClickReset = this.handleClickReset.bind(this);
    this.handleClickResultado = this.handleClickResultado.bind(this);
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

  render(){
    return (
      <div>
        <div className="row">
          {/* <a>{this.state.operation}</a> */}
          <Cell key={0} valor={this.state.valorBox} />
          {/* <Cell key={1} valor={this.state.valor2} onChange={evt => this.updateInputValue2(evt)}/> */}
        </div>
        <ButtonPallet 
          handleClickNumber={this.handleClickNumber} 
          handleClickOperation={this.handleClickOperation} 
          handleClickResultado={this.handleClickResultado}
          handleClickReset = {this.handleClickReset}
          timing = {this.state.shuffleTiming}
        />
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
