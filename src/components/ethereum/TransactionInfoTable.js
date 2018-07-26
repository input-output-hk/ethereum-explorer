import React from 'react';
import { Link } from 'react-router-dom';
import { bigNumber } from '../../utils/format-utils';

const translateReceiptStatusCode = statusCode => {
  switch(parseInt(statusCode, 16)) {
  case 0: return "Success.";
  case 1: return "Function does not exist.";
  case 2: return "Function has wrong signature.";
  case 3: return "Function does not exist on empty account.";
  case 4: return "Execution of instructions led to failure.";
  case 5: return "Out of gas.";
  case 6: return "Deploying to an account that already exists.";
  case 7: return "Insufficient balance to transfer.";
  case 8: return "Negative balance or gas limit or call depth exceeded.";
  case 9: return "Contract being uploaded to blockchain is not well formed.";
  default: return "";
  }
};

const TransactionInfoTable = ({tx, receipt}) => {
  return (
    <table className="pure-table pure-table-horizontal">
      <thead>
          <tr>
            <th colSpan="2">Transaction Hash: {tx.hash}</th>
          </tr>
      </thead>
      <tbody>
        <tr>
          <td>Block #</td>
          <td><Link to={`${process.env.PUBLIC_URL}/block/${tx.blockNumber}`}>{tx.blockNumber}</Link></td>
        </tr>
        <tr>
          <td>From</td>
          <td>{ tx.from }</td>
        </tr>
        <tr>
          <td>To</td>
          <td>{ tx.to }</td>
        </tr>
        <tr>
          <td>Status Code</td>
          <td>
            { receipt.statusCode }
            <br/>
            { translateReceiptStatusCode(receipt.statusCode || "") }
          </td>
        </tr>
        <tr>
          <td>Value</td>
          <td>{ bigNumber(tx.value) }</td>
        </tr>
        <tr>
          <td>Gas Price</td>
          <td>{ bigNumber(tx.gasPrice) }</td>
        </tr>
        <tr>
          <td>Gas Provided</td>
          <td>{ tx.gas }</td>
        </tr>
        <tr>
          <td>Gas Used</td>
          <td>{ receipt.gasUsed }</td>
        </tr>
        <tr>
          <td>Nonce</td>
          <td>{ tx.nonce }</td>
        </tr>
        <tr>
          <td>Input Data</td>
          <td><textarea disabled="disabled" defaultValue={ tx.input }></textarea></td>
        </tr>
        <tr>
          <td>Contract Address</td>
          <td>{ receipt.contractAddress }</td>
        </tr>
      </tbody>
    </table>
  )

}

export default TransactionInfoTable;
