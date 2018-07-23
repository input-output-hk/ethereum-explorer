import React, { Component } from 'react';
import promisify from 'es6-promisify';

import TransactionInfoTable from '../ethereum/TransactionInfoTable';
import EthereumEntity from '../layout/EthereumEntity';

class TransactionDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  async loadData(web3, id) {
    Promise.all([
      promisify(web3.eth.getTransaction)(id),
      promisify(web3.eth.getTransactionReceipt)(id)
    ])
      .then(
        result => {
          const [tx, receipt ] = result;
          this.setState({
            tx: tx,
            receipt: receipt
          });
        }
      )
      .catch(
        error => this.setState({ error: error })
      );
  }

  componentWillReceiveProps({web3, match}) {
    this.setState({
      tx: undefined,
      receipt: undefined,
      error: undefined
    })
    this.loadData(web3, match.params.id);
  }

  componentWillMount() {
    this.componentWillReceiveProps(this.props)
  }

  renderContents() {
    return (
      <div>
        <h2>Transaction Details</h2>
        <TransactionInfoTable tx={this.state.tx} receipt={this.state.receipt} />
      </div>
    )
  }

  render() {
    return (
      <div>
        <EthereumEntity
          entity={this.state.tx}
          error={this.state.error}
          errorMessage={`Transaction ${this.props.match.params.id} was not found`}
          render={this.renderContents.bind(this)}/>
      </div>
    );
  }
}

export default TransactionDetails;
