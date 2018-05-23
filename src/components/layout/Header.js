import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/testnet-logo.svg';

class Header extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchStr: ""
    }
  }

  updateSearchStr(evt) {
    this.setState({
      searchStr: evt.target.value
    });
  }

  onSubmit(evt) {
    evt.preventDefault();
    this.props.onSearch(this.state.searchStr);
  }

  render() {
    return (
      <div className="header">

        <div className="home-menu pure-g pure-menu-fixed pure-menu-horizontal" id="menu">
          <div className="pure-u-1 pure-u-md-1-2">
              <div className="pure-menu">
              <ul className="pure-menu-list">
                      <li className="pure-menu-item">
                <a href={`${process.env.PUBLIC_URL}/`} className="pure-menu-link">
                  <img src={logo} className="testnet-logo" alt="Testnet Hub Blockchain Explorer"/>
                </a>
                </li>
                <li className="pure-menu-item">
                  <a href={`${process.env.PUBLIC_URL}/`} className="pure-menu-link">TESTNET HUB - <small>Blockchain Explorer</small></a>
                  </li>
                  </ul>
              </div>
          </div>
          <div className="pure-u-1 pure-u-md-1-2">
              <div className="pure-menu align-right mob-align-center">
                  <ul className="pure-menu-list nav-search">
                      <li className="pure-menu-item"><Link className="pure-menu-link" to={`${process.env.PUBLIC_URL}/`}>Home</Link></li>
                      <li className="pure-menu-item"><Link className="pure-menu-link" to={`${process.env.PUBLIC_URL}/status`}>Status</Link></li>
                      <li className="pure-menu-item">
                        <form onSubmit={this.onSubmit.bind(this)}>
                          <input id="search-box" name="q" size="40" type="text" placeholder="Tx Hash, Address, or Block #" onChange={evt => this.updateSearchStr(evt)}/>
                          <input id="search-btn" value="Search" type="submit"/>
                        </form>
                      </li>
                  </ul>
              </div>
          </div>
      </div>
      </div>
    )
  }
}

export default Header;