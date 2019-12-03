import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/body/Header';
import Section from './components/body/Section';
import Footer from './components/body/Footer';
import Content from './components/body/Content';

class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      'headerH': '40',
      'footerH': '20',
      'innerHeight': window.innerHeight
    }

    window.addEventListener('resize',() => (
      this.setState({
        innerHeight: window.innerHeight
      })
    ))
  }


  

  render() {
    return (
      <div className="d-flex flex-column">
        <Header height={this.state.headerH}>
          <span className="h5 text-white">Grupo EBIM</span>
        </Header>

        <Section headerH={this.state.headerH} footerH={this.state.footerH} innerHeight={this.state.innerHeight}>
          <Content />
        </Section>

        <Footer height={this.state.footerH}>
          <small className="text-sm font-weight-light text-white">joelverastegui®copyright2019</small>
        </Footer>
      </div>
    )
  }
}

export default App;
