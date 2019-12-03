import React, { Fragment } from 'react';
import { BrowserRouter } from 'react-router-dom';

import Header from './components/body/Header';
import Section from './components/body/Section';
import Footer from './components/body/Footer';
import Login from './components/modules/sys/Login';
import Routes from './config/routes';

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      'headerH': '40',
      'footerH': '20',
      'innerHeight': window.innerHeight,
      session: sessionStorage.getItem('session')
    }

    window.addEventListener('resize', () => (
      this.setState({
        innerHeight: window.innerHeight
      })
    ))
  }

  updateSession(data) {
    if (data != undefined) {
      let user = data["DATA_USUA"];
      sessionStorage.setItem('session', user);
      this.setState({
        session: user
      })
    }
  }


  render() {
    return (
      <Fragment>
        <BrowserRouter>
          {!this.state.session && (<Login sendSession={(data) => { this.updateSession(data) }} />)}

          {this.state.session && (
            <div className="d-flex flex-column">
              <Header height={this.state.headerH}>
                <span className="h5 text-white">Grupo EBIM</span>
              </Header>

              <Section headerH={this.state.headerH} footerH={this.state.footerH} innerHeight={this.state.innerHeight}>
                <div className="p-3 shadow bg-white" style={{ width: "97%", height: "95%", margin: "1.25% 1.5% 1.25% 1.5%" }}>
                  <Routes />
                </div>
              </Section>

              <Footer height={this.state.footerH}>
                <small className="text-sm font-weight-light text-white">joelverastegui®copyright2019</small>
              </Footer>
            </div>
          )}
        </BrowserRouter>
      </Fragment>
    )
  }
}

export default App;
